import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Activity {
  id: string
  tripId: string
  dayIndex: number // 0-based index for which day of the trip
  title: string
  description?: string
  location?: string
  time?: string
  cost?: number
  notes?: string
  createdAt: string
  participants: string[] // Array of traveler IDs who joined this activity
}

export interface Traveler {
  id: string
  name: string
  joinedAt: string
  isOwner: boolean
}

export interface Trip {
  id: string
  name: string
  startDate: string
  endDate: string
  participantCount: number
  createdAt: string
  activities: Activity[]
  travelers: Traveler[]
  ownerId: string
}

interface TripStore {
  trips: Trip[]
  currentTrip: Trip | null
  currentTraveler: Traveler | null
  sharedTrips: Record<string, Trip> // Store shared trips separately
  
  // Actions for Mimi (Trip Creation)
  createTrip: (tripData: Omit<Trip, 'id' | 'createdAt' | 'activities' | 'travelers' | 'ownerId'>) => Trip
  updateTrip: (id: string, updates: Partial<Trip>) => void
  getTrip: (id: string) => Trip | undefined
  setCurrentTrip: (trip: Trip | null) => void
  
  // Actions for Avril (Activities)
  addActivity: (tripId: string, activity: Omit<Activity, 'id' | 'tripId' | 'createdAt' | 'participants'>) => void
  updateActivity: (tripId: string, activityId: string, updates: Partial<Activity>) => void
  deleteActivity: (tripId: string, activityId: string) => void
  getActivitiesForDay: (tripId: string, dayIndex: number) => Activity[]
  
  // Actions for Emily (Collaboration)
  joinTrip: (tripId: string, travelerName: string) => Traveler | null
  leaveTrip: (tripId: string, travelerId: string) => void
  joinActivity: (tripId: string, activityId: string, travelerId: string) => void
  leaveActivity: (tripId: string, activityId: string, travelerId: string) => void
  getTravelerCosts: (tripId: string, travelerId: string) => number
  getTripTotalCost: (tripId: string) => number
  setCurrentTraveler: (traveler: Traveler | null) => void
  getCurrentTravelerForTrip: (tripId: string) => Traveler | null
  
  // Sharing actions
  shareTrip: (tripId: string) => void
  loadSharedTrip: (tripId: string, tripData: Trip) => void
  
  // Utility
  generateTripId: () => string
  generateActivityId: () => string
  generateTravelerId: () => string
  migrateTrip: (trip: any) => Trip
}

export const useTripStore = create<TripStore>()(
  persist(
    (set, get) => ({
      trips: [],
      currentTrip: null,
      currentTraveler: null,
      sharedTrips: {},

      // Migration function to handle old trip format
      migrateTrip: (trip: any): Trip => {
        // If trip already has the new structure, return as is
        if (trip.travelers && trip.ownerId) {
          // Ensure activities have participants array
          const migratedActivities = trip.activities.map((activity: any) => ({
            ...activity,
            participants: activity.participants || []
          }))
          
          return {
            ...trip,
            activities: migratedActivities
          }
        }

        // Migrate old trip structure to new structure
        const travelerId = get().generateTravelerId()
        const migratedActivities = trip.activities?.map((activity: any) => ({
          ...activity,
          participants: activity.participants || []
        })) || []

        return {
          ...trip,
          activities: migratedActivities,
          travelers: [{
            id: travelerId,
            name: 'Trip Creator',
            joinedAt: trip.createdAt || new Date().toISOString(),
            isOwner: true
          }],
          ownerId: travelerId,
        }
      },

      createTrip: (tripData) => {
        const travelerId = get().generateTravelerId()
        const newTrip: Trip = {
          ...tripData,
          id: get().generateTripId(),
          createdAt: new Date().toISOString(),
          activities: [],
          travelers: [{
            id: travelerId,
            name: 'Trip Creator',
            joinedAt: new Date().toISOString(),
            isOwner: true
          }],
          ownerId: travelerId,
        }
        
        set((state) => ({
          trips: [...state.trips, newTrip],
          currentTrip: newTrip,
          currentTraveler: newTrip.travelers[0],
        }))
        
        // Auto-share the trip for collaboration
        get().shareTrip(newTrip.id)
        
        return newTrip
      },

      updateTrip: (id, updates) => {
        set((state) => {
          const updatedTrips = state.trips.map((trip) =>
            trip.id === id ? { ...trip, ...updates } : trip
          )
          
          const updatedCurrentTrip = state.currentTrip?.id === id 
            ? { ...state.currentTrip, ...updates }
            : state.currentTrip

          // Also update in shared trips
          const updatedSharedTrips = { ...state.sharedTrips }
          if (updatedSharedTrips[id]) {
            updatedSharedTrips[id] = { ...updatedSharedTrips[id], ...updates }
          }

          return {
            trips: updatedTrips,
            currentTrip: updatedCurrentTrip,
            sharedTrips: updatedSharedTrips,
          }
        })
      },

      getTrip: (id) => {
        const state = get()
        
        // First check local trips
        let trip = state.trips.find((trip) => trip.id === id)
        
        // If not found locally, check shared trips
        if (!trip) {
          trip = state.sharedTrips[id]
        }
        
        if (trip) {
          // Always migrate trip when retrieving
          return get().migrateTrip(trip)
        }
        return undefined
      },

      setCurrentTrip: (trip) => {
        if (trip) {
          // Migrate trip before setting as current
          const migratedTrip = get().migrateTrip(trip)
          set({ currentTrip: migratedTrip })
          
          // Also update the trip in the trips array if it was migrated
          if (migratedTrip !== trip) {
            set((state) => ({
              trips: state.trips.map((t) => 
                t.id === trip.id ? migratedTrip : t
              )
            }))
          }
        } else {
          set({ currentTrip: null })
        }
      },

      addActivity: (tripId, activityData) => {
        const newActivity: Activity = {
          ...activityData,
          id: get().generateActivityId(),
          tripId,
          createdAt: new Date().toISOString(),
          participants: [], // Start with no participants
        }

        set((state) => {
          const updatedTrips = state.trips.map((trip) =>
            trip.id === tripId
              ? { ...trip, activities: [...trip.activities, newActivity] }
              : trip
          )

          const updatedCurrentTrip = state.currentTrip?.id === tripId
            ? { ...state.currentTrip, activities: [...state.currentTrip.activities, newActivity] }
            : state.currentTrip

          // Also update shared trips
          const updatedSharedTrips = { ...state.sharedTrips }
          if (updatedSharedTrips[tripId]) {
            updatedSharedTrips[tripId] = {
              ...updatedSharedTrips[tripId],
              activities: [...updatedSharedTrips[tripId].activities, newActivity]
            }
          }

          return {
            trips: updatedTrips,
            currentTrip: updatedCurrentTrip,
            sharedTrips: updatedSharedTrips,
          }
        })
      },

      updateActivity: (tripId, activityId, updates) => {
        set((state) => {
          const updatedTrips = state.trips.map((trip) =>
            trip.id === tripId
              ? {
                  ...trip,
                  activities: trip.activities.map((activity) =>
                    activity.id === activityId ? { ...activity, ...updates } : activity
                  ),
                }
              : trip
          )

          const updatedCurrentTrip = state.currentTrip?.id === tripId
            ? {
                ...state.currentTrip,
                activities: state.currentTrip.activities.map((activity) =>
                  activity.id === activityId ? { ...activity, ...updates } : activity
                ),
              }
            : state.currentTrip

          // Also update shared trips
          const updatedSharedTrips = { ...state.sharedTrips }
          if (updatedSharedTrips[tripId]) {
            updatedSharedTrips[tripId] = {
              ...updatedSharedTrips[tripId],
              activities: updatedSharedTrips[tripId].activities.map((activity) =>
                activity.id === activityId ? { ...activity, ...updates } : activity
              ),
            }
          }

          return {
            trips: updatedTrips,
            currentTrip: updatedCurrentTrip,
            sharedTrips: updatedSharedTrips,
          }
        })
      },

      deleteActivity: (tripId, activityId) => {
        set((state) => {
          const updatedTrips = state.trips.map((trip) =>
            trip.id === tripId
              ? {
                  ...trip,
                  activities: trip.activities.filter((activity) => activity.id !== activityId),
                }
              : trip
          )

          const updatedCurrentTrip = state.currentTrip?.id === tripId
            ? {
                ...state.currentTrip,
                activities: state.currentTrip.activities.filter((activity) => activity.id !== activityId),
              }
            : state.currentTrip

          // Also update shared trips
          const updatedSharedTrips = { ...state.sharedTrips }
          if (updatedSharedTrips[tripId]) {
            updatedSharedTrips[tripId] = {
              ...updatedSharedTrips[tripId],
              activities: updatedSharedTrips[tripId].activities.filter((activity) => activity.id !== activityId),
            }
          }

          return {
            trips: updatedTrips,
            currentTrip: updatedCurrentTrip,
            sharedTrips: updatedSharedTrips,
          }
        })
      },

      getActivitiesForDay: (tripId, dayIndex) => {
        const trip = get().getTrip(tripId)
        if (!trip || !trip.activities) return []
        return trip.activities.filter((activity) => activity.dayIndex === dayIndex)
      },

      // Collaboration Actions
      joinTrip: (tripId, travelerName) => {
        const trip = get().getTrip(tripId)
        if (!trip) return null

        // Check if name already exists
        const existingTraveler = trip.travelers.find(t => t.name.toLowerCase() === travelerName.toLowerCase())
        if (existingTraveler) {
          // Return existing traveler (they're rejoining)
          set({ currentTraveler: existingTraveler })
          return existingTraveler
        }

        const newTraveler: Traveler = {
          id: get().generateTravelerId(),
          name: travelerName,
          joinedAt: new Date().toISOString(),
          isOwner: false
        }

        set((state) => {
          const updatedTrips = state.trips.map((trip) =>
            trip.id === tripId
              ? { ...trip, travelers: [...trip.travelers, newTraveler] }
              : trip
          )

          const updatedCurrentTrip = state.currentTrip?.id === tripId
            ? { ...state.currentTrip, travelers: [...state.currentTrip.travelers, newTraveler] }
            : state.currentTrip

          // Also update shared trips
          const updatedSharedTrips = { ...state.sharedTrips }
          if (updatedSharedTrips[tripId]) {
            updatedSharedTrips[tripId] = {
              ...updatedSharedTrips[tripId],
              travelers: [...updatedSharedTrips[tripId].travelers, newTraveler]
            }
          }

          return {
            trips: updatedTrips,
            currentTrip: updatedCurrentTrip,
            sharedTrips: updatedSharedTrips,
            currentTraveler: newTraveler,
          }
        })

        return newTraveler
      },

      leaveTrip: (tripId, travelerId) => {
        set((state) => {
          const updatedTrips = state.trips.map((trip) =>
            trip.id === tripId
              ? { 
                  ...trip, 
                  travelers: trip.travelers.filter(t => t.id !== travelerId),
                  activities: trip.activities.map(activity => ({
                    ...activity,
                    participants: activity.participants.filter(p => p !== travelerId)
                  }))
                }
              : trip
          )

          const updatedCurrentTrip = state.currentTrip?.id === tripId
            ? { 
                ...state.currentTrip, 
                travelers: state.currentTrip.travelers.filter(t => t.id !== travelerId),
                activities: state.currentTrip.activities.map(activity => ({
                  ...activity,
                  participants: activity.participants.filter(p => p !== travelerId)
                }))
              }
            : state.currentTrip

          // Also update shared trips
          const updatedSharedTrips = { ...state.sharedTrips }
          if (updatedSharedTrips[tripId]) {
            updatedSharedTrips[tripId] = {
              ...updatedSharedTrips[tripId],
              travelers: updatedSharedTrips[tripId].travelers.filter(t => t.id !== travelerId),
              activities: updatedSharedTrips[tripId].activities.map(activity => ({
                ...activity,
                participants: activity.participants.filter(p => p !== travelerId)
              }))
            }
          }

          return {
            trips: updatedTrips,
            currentTrip: updatedCurrentTrip,
            sharedTrips: updatedSharedTrips,
            currentTraveler: state.currentTraveler?.id === travelerId ? null : state.currentTraveler,
          }
        })
      },

      joinActivity: (tripId, activityId, travelerId) => {
        set((state) => {
          const updatedTrips = state.trips.map((trip) =>
            trip.id === tripId
              ? {
                  ...trip,
                  activities: trip.activities.map((activity) =>
                    activity.id === activityId && !activity.participants.includes(travelerId)
                      ? { ...activity, participants: [...activity.participants, travelerId] }
                      : activity
                  ),
                }
              : trip
          )

          const updatedCurrentTrip = state.currentTrip?.id === tripId
            ? {
                ...state.currentTrip,
                activities: state.currentTrip.activities.map((activity) =>
                  activity.id === activityId && !activity.participants.includes(travelerId)
                    ? { ...activity, participants: [...activity.participants, travelerId] }
                    : activity
                ),
              }
            : state.currentTrip

          // Also update shared trips
          const updatedSharedTrips = { ...state.sharedTrips }
          if (updatedSharedTrips[tripId]) {
            updatedSharedTrips[tripId] = {
              ...updatedSharedTrips[tripId],
              activities: updatedSharedTrips[tripId].activities.map((activity) =>
                activity.id === activityId && !activity.participants.includes(travelerId)
                  ? { ...activity, participants: [...activity.participants, travelerId] }
                  : activity
              ),
            }
          }

          return {
            trips: updatedTrips,
            currentTrip: updatedCurrentTrip,
            sharedTrips: updatedSharedTrips,
          }
        })
      },

      leaveActivity: (tripId, activityId, travelerId) => {
        set((state) => {
          const updatedTrips = state.trips.map((trip) =>
            trip.id === tripId
              ? {
                  ...trip,
                  activities: trip.activities.map((activity) =>
                    activity.id === activityId
                      ? { ...activity, participants: activity.participants.filter(p => p !== travelerId) }
                      : activity
                  ),
                }
              : trip
          )

          const updatedCurrentTrip = state.currentTrip?.id === tripId
            ? {
                ...state.currentTrip,
                activities: state.currentTrip.activities.map((activity) =>
                  activity.id === activityId
                    ? { ...activity, participants: activity.participants.filter(p => p !== travelerId) }
                    : activity
                ),
              }
            : state.currentTrip

          // Also update shared trips
          const updatedSharedTrips = { ...state.sharedTrips }
          if (updatedSharedTrips[tripId]) {
            updatedSharedTrips[tripId] = {
              ...updatedSharedTrips[tripId],
              activities: updatedSharedTrips[tripId].activities.map((activity) =>
                activity.id === activityId
                  ? { ...activity, participants: activity.participants.filter(p => p !== travelerId) }
                  : activity
              ),
            }
          }

          return {
            trips: updatedTrips,
            currentTrip: updatedCurrentTrip,
            sharedTrips: updatedSharedTrips,
          }
        })
      },

      getTravelerCosts: (tripId, travelerId) => {
        const trip = get().getTrip(tripId)
        if (!trip) return 0

        return trip.activities
          .filter(activity => activity.participants.includes(travelerId) && activity.cost)
          .reduce((total, activity) => total + (activity.cost || 0), 0)
      },

      getTripTotalCost: (tripId) => {
        const trip = get().getTrip(tripId)
        if (!trip) return 0

        // Calculate total of all activities with costs
        return trip.activities
          .filter(activity => activity.cost)
          .reduce((total, activity) => total + (activity.cost || 0), 0)
      },

      setCurrentTraveler: (traveler) => {
        set({ currentTraveler: traveler })
      },

      getCurrentTravelerForTrip: (tripId) => {
        const state = get()
        const trip = state.getTrip(tripId)
        if (!trip || !state.currentTraveler) return null
        
        // Check if current traveler is part of this trip
        const travelerInTrip = trip.travelers.find(t => t.id === state.currentTraveler?.id)
        return travelerInTrip || null
      },

      // Sharing functions
      shareTrip: (tripId) => {
        const state = get()
        const trip = state.getTrip(tripId)
        if (trip) {
          // Store trip data in a way that can be accessed across browser sessions
          // Using a simple approach with localStorage key that includes trip ID
          const sharedKey = `shared_trip_${tripId}`
          localStorage.setItem(sharedKey, JSON.stringify(trip))
          
          set((state) => ({
            sharedTrips: {
              ...state.sharedTrips,
              [tripId]: trip
            }
          }))
        }
      },

      loadSharedTrip: (tripId, tripData) => {
        set((state) => ({
          sharedTrips: {
            ...state.sharedTrips,
            [tripId]: tripData
          }
        }))
      },

      generateTripId: () => {
        return `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      },

      generateActivityId: () => {
        return `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      },

      generateTravelerId: () => {
        return `traveler_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      },
    }),
    {
      name: 'ai-itinerary-trips',
      partialize: (state) => ({ 
        trips: state.trips,
        currentTraveler: state.currentTraveler,
        sharedTrips: state.sharedTrips
      }),
    }
  )
)