import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { TripWithParticipants } from '../types/database'

interface TripState {
  trips: TripWithParticipants[]
  loading: boolean
  fetchTrips: () => Promise<void>
  createTrip: (tripData: {
    name: string
    start_date: string
    end_date: string
    image_url?: string
  }) => Promise<string>
}

export const useTripStore = create<TripState>((set, get) => ({
  trips: [],
  loading: false,

  fetchTrips: async () => {
    try {
      set({ loading: true })
      
      const { data, error } = await supabase
        .from('trips')
        .select(`
          *,
          trip_participants (
            *,
            profiles (*)
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      set({ trips: data || [], loading: false })
    } catch (error) {
      console.error('Error fetching trips:', error)
      set({ loading: false })
    }
  },

  createTrip: async (tripData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // Create trip
      const { data: trip, error: tripError } = await supabase
        .from('trips')
        .insert({
          ...tripData,
          created_by: user.id
        })
        .select()
        .single()

      if (tripError) throw tripError

      // Add creator as owner
      const { error: participantError } = await supabase
        .from('trip_participants')
        .insert({
          trip_id: trip.id,
          user_id: user.id,
          role: 'owner'
        })

      if (participantError) throw participantError

      // Refresh trips
      await get().fetchTrips()

      return trip.id
    } catch (error) {
      console.error('Error creating trip:', error)
      throw error
    }
  }
}))