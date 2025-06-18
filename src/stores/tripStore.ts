import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Trip {
  id: string
  name: string
  startDate: string
  endDate: string
  participantCount: number
  createdAt: string
  // Future: activities will be added by Avril
  // Future: participants will be managed by Emily
}

interface TripStore {
  trips: Trip[]
  currentTrip: Trip | null
  
  // Actions for Mimi (Trip Creation)
  createTrip: (tripData: Omit<Trip, 'id' | 'createdAt'>) => Trip
  updateTrip: (id: string, updates: Partial<Trip>) => void
  getTrip: (id: string) => Trip | undefined
  setCurrentTrip: (trip: Trip | null) => void
  
  // Utility
  generateTripId: () => string
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

      generateTripId: () => {
        return `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      },
    }),
    {
      name: 'ai-itinerary-trips',
      partialize: (state) => ({ trips: state.trips }),
    }
  )
)