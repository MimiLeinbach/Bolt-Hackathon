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
}

export interface Trip {
  id: string
  name: string
  startDate: string
  endDate: string
  participantCount: number
  createdAt: string
  activities: Activity[]
}

interface TripStore {
  trips: Trip[]
  currentTrip: Trip | null
  
  // Actions for Mimi (Trip Creation)
  createTrip: (tripData: Omit<Trip, 'id' | 'createdAt' | 'activities'>) => Trip
  updateTrip: (id: string, updates: Partial<Trip>) => void
  getTrip: (id: string) => Trip | undefined
  setCurrentTrip: (trip: Trip | null) => void
  
  // Actions for Avril (Activities)
  addActivity: (tripId: string, activity: Omit<Activity, 'id' | 'tripId' | 'createdAt'>) => void
  updateActivity: (tripId: string, activityId: string, updates: Partial<Activity>) => void
  deleteActivity: (tripId: string, activityId: string) => void
  getActivitiesForDay: (tripId: string, dayIndex: number) => Activity[]
  
  // Utility
  generateTripId: () => string
  generateActivityId: () => string
}

export const useTripStore = create<TripStore>()(
  persist(
    (set, get) => ({
      trips: [],
      currentTrip: null,

      createTrip: (tripData) => {
        const newTrip: Trip = {
          ...tripData,
          id: get().generateTripId(),
          createdAt: new Date().toISOString(),
          activities: [],
        }
        
        set((state) => ({
          trips: [...state.trips, newTrip],
          currentTrip: newTrip,
        }))
        
        return newTrip
      },

      updateTrip: (id, updates) => {
        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === id ? { ...trip, ...updates } : trip
          ),
          currentTrip: state.currentTrip?.id === id 
            ? { ...state.currentTrip, ...updates }
            : state.currentTrip,
        }))
      },

      getTrip: (id) => {
        return get().trips.find((trip) => trip.id === id)
      },

      setCurrentTrip: (trip) => {
        set({ currentTrip: trip })
      },

      addActivity: (tripId, activityData) => {
        const newActivity: Activity = {
          ...activityData,
          id: get().generateActivityId(),
          tripId,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === tripId
              ? { ...trip, activities: [...trip.activities, newActivity] }
              : trip
          ),
          currentTrip: state.currentTrip?.id === tripId
            ? { ...state.currentTrip, activities: [...state.currentTrip.activities, newActivity] }
            : state.currentTrip,
        }))
      },

      updateActivity: (tripId, activityId, updates) => {
        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === tripId
              ? {
                  ...trip,
                  activities: trip.activities.map((activity) =>
                    activity.id === activityId ? { ...activity, ...updates } : activity
                  ),
                }
              : trip
          ),
          currentTrip: state.currentTrip?.id === tripId
            ? {
                ...state.currentTrip,
                activities: state.currentTrip.activities.map((activity) =>
                  activity.id === activityId ? { ...activity, ...updates } : activity
                ),
              }
            : state.currentTrip,
        }))
      },

      deleteActivity: (tripId, activityId) => {
        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === tripId
              ? {
                  ...trip,
                  activities: trip.activities.filter((activity) => activity.id !== activityId),
                }
              : trip
          ),
          currentTrip: state.currentTrip?.id === tripId
            ? {
                ...state.currentTrip,
                activities: state.currentTrip.activities.filter((activity) => activity.id !== activityId),
              }
            : state.currentTrip,
        }))
      },

      getActivitiesForDay: (tripId, dayIndex) => {
        const trip = get().getTrip(tripId)
        if (!trip || !trip.activities) return []
        return trip.activities.filter((activity) => activity.dayIndex === dayIndex)
      },

      generateTripId: () => {
        return `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      },

      generateActivityId: () => {
        return `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      },
    }),
    {
      name: 'ai-itinerary-trips',
      partialize: (state) => ({ trips: state.trips }),
    }
  )
)