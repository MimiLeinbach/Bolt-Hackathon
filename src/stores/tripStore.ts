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
  sharedTrips: Record<string, Trip> // Store shared trips in memory
  isHydrated: boolean // Track if store has been hydrated from localStorage
  
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
  shareTrip: (trip: Trip) => void
  loadSharedTrip: (tripId: string, tripData: Trip) => void
  
  // Testing actions
  resetUserForTesting: () => void
  
  // Utility
  generateTripId: () => string
  generateActivityId: () => string
  generateTravelerId: () => string
  migrateTrip: (trip: any) => Trip
  setHydrated: (hydrated: boolean) => void
}

export const useTripStore = create<TripStore>()(
  persist(
    (set, get) => ({
      trips: [],
      currentTrip: null,
      currentTraveler: null,
      sharedTrips: {},
      isHydrated: false,

      setHydrated: (hydrated: boolean) => {
        set({ isHydrated: hydrated })
      },

      // Migration function to handle old trip format
      migrateTrip: (trip: any): Trip => {
        // If trip already has the new structure, return as is
        if (trip.travelers && trip.ownerId) {
          // Ensure activities have participants array
          const migratedActivities = (trip.activities || []).map((activity: any) => ({
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
        const migratedActivities = (trip.activities || []).map((activity: any) => ({
          ...activity,
          participants: activity.participants || []
        }))

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
        get().shareTrip(newTrip)
        
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

        // Update shared version - get the updated trip after state change
        const updatedTrip = get().getTrip(id)
        if (updatedTrip) {
          get().shareTrip(updatedTrip)
        }
      },

      getTrip: (id) => {
        const state = get()
        
        console.log(`🔍 Looking for trip ${id}`)
        console.log(`📊 Store hydrated: ${state.isHydrated}`)
        
        // First check local trips
        let trip = state.trips.find((trip) => trip.id === id)
        console.log(`Checking local trips for ${id}:`, trip ? 'FOUND' : 'NOT FOUND')
        
        // If not found locally, check shared trips in memory
        if (!trip) {
          trip = state.sharedTrips[id]
          console.log(`Checking shared trips in memory for ${id}:`, trip ? 'FOUND' : 'NOT FOUND')
        }
        
        // If still not found, try localStorage with multiple key formats
        if (!trip && typeof localStorage !== 'undefined') {
          const possibleKeys = [
            `ai_itinerary_shared_${id}`,
            `shared_trip_${id}`,
            `trip_${id}`,
            id
          ]
          
          for (const key of possibleKeys) {
            try {
              const sharedTripData = localStorage.getItem(key)
              console.log(`Checking localStorage for ${key}:`, sharedTripData ? 'FOUND' : 'NOT FOUND')
              
              if (sharedTripData) {
                const parsedTrip = JSON.parse(sharedTripData)
                trip = parsedTrip
                
                // Add to shared trips cache for future access
                set((state) => ({
                  sharedTrips: {
                    ...state.sharedTrips,
                    [id]: parsedTrip
                  }
                }))
                console.log(`✅ Loaded trip ${id} from localStorage key ${key} and cached in memory`)
                break
              }
            } catch (error) {
              console.error(`❌ Error loading from localStorage key ${key}:`, error)
            }
          }
        }
        
        if (trip) {
          // Always migrate trip when retrieving
          const migratedTrip = get().migrateTrip(trip)
          console.log(`✅ Trip ${id} found and migrated:`, migratedTrip.name)
          
          // If the trip was migrated, update it in storage (but don't call shareTrip to avoid recursion)
          if (JSON.stringify(migratedTrip) !== JSON.stringify(trip)) {
            console.log(`🔄 Trip ${id} was migrated, updating storage directly`)
            // Update storage directly without calling shareTrip to avoid recursion
            try {
              if (typeof localStorage !== 'undefined') {
                const keys = [
                  `ai_itinerary_shared_${id}`,
                  `shared_trip_${id}`
                ]
                
                const tripData = JSON.stringify(migratedTrip)
                
                keys.forEach(key => {
                  localStorage.setItem(key, tripData)
                })
              }
              
              // Also store in memory for immediate access
              set((state) => ({
                sharedTrips: {
                  ...state.sharedTrips,
                  [id]: migratedTrip
                }
              }))
              
              console.log(`✅ Migrated trip ${id} stored directly`)
            } catch (error) {
              console.error('❌ Error storing migrated trip:', error)
            }
          }
          
          return migratedTrip
        }
        
        console.log(`❌ Trip ${id} not found anywhere`)
        if (typeof localStorage !== 'undefined') {
          console.log('🔍 Available localStorage keys:', Object.keys(localStorage).filter(k => k.includes('trip') || k.includes('itinerary')))
        }
        return undefined
      },

      setCurrentTrip: (trip) => {
        if (trip) {
          // Migrate trip before setting as current
          const migratedTrip = get().migrateTrip(trip)
          console.log(`🎯 Setting current trip: ${migratedTrip.name} (${migratedTrip.id})`)
          set({ currentTrip: migratedTrip })
          
          // Auto-share when setting as current trip to ensure it's available for sharing
          get().shareTrip(migratedTrip)
          
          // Also update the trip in the trips array if it was migrated
          if (migratedTrip !== trip) {
            set((state) => ({
              trips: state.trips.map((t) => 
                t.id === trip.id ? migratedTrip : t
              )
            }))
          }
        } else {
          console.log('🎯 Clearing current trip')
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

        // Update shared version - get the updated trip after state change
        const updatedTrip = get().getTrip(tripId)
        if (updatedTrip) {
          get().shareTrip(updatedTrip)
        }
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

        // Update shared version - get the updated trip after state change
        const updatedTrip = get().getTrip(tripId)
        if (updatedTrip) {
          get().shareTrip(updatedTrip)
        }
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

        // Update shared version - get the updated trip after state change
        const updatedTrip = get().getTrip(tripId)
        if (updatedTrip) {
          get().shareTrip(updatedTrip)
        }
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

        // Update shared version - get the updated trip after state change
        const updatedTrip = get().getTrip(tripId)
        if (updatedTrip) {
          get().shareTrip(updatedTrip)
        }

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

        // Update shared version - get the updated trip after state change
        const updatedTrip = get().getTrip(tripId)
        if (updatedTrip) {
          get().shareTrip(updatedTrip)
        }
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

        // Update shared version - get the updated trip after state change
        const updatedTrip = get().getTrip(tripId)
        if (updatedTrip) {
          get().shareTrip(updatedTrip)
        }
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

        // Update shared version - get the updated trip after state change
        const updatedTrip = get().getTrip(tripId)
        if (updatedTrip) {
          get().shareTrip(updatedTrip)
        }
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

      // Testing function to reset user state
      resetUserForTesting: () => {
        console.log('🧪 Resetting user for testing...')
        set({ currentTraveler: null })
        console.log('✅ User reset complete - you are now a "new user"')
      },

      // Sharing functions
      shareTrip: (trip) => {
        if (trip && typeof localStorage !== 'undefined') {
          try {
            // Store in localStorage with multiple key formats for compatibility
            const keys = [
              `ai_itinerary_shared_${trip.id}`,
              `shared_trip_${trip.id}` // Legacy format
            ]
            
            const tripData = JSON.stringify(trip)
            
            keys.forEach(key => {
              localStorage.setItem(key, tripData)
            })
            
            // Also store in memory for immediate access
            set((state) => ({
              sharedTrips: {
                ...state.sharedTrips,
                [trip.id]: trip
              }
            }))
            
            console.log(`✅ Trip ${trip.id} (${trip.name}) shared successfully`)
            console.log(`📦 Stored in localStorage with keys:`, keys)
          } catch (error) {
            console.error('❌ Error sharing trip:', error)
          }
        } else {
          console.log(`⚠️ Cannot share trip - trip object is null/undefined or localStorage unavailable`)
        }
      },

      loadSharedTrip: (tripId, tripData) => {
        console.log(`📥 Loading shared trip ${tripId}:`, tripData.name)
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
        sharedTrips: state.sharedTrips, // Also persist shared trips
      }),
      onRehydrateStorage: () => (state) => {
        // Mark store as hydrated when rehydration is complete
        if (state) {
          state.setHydrated(true)
          console.log('🔄 Store hydrated successfully')
        }
      },
    }
  )
)