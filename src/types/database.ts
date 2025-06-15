export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
      }
      trips: {
        Row: Trip
        Insert: Omit<Trip, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Trip, 'id' | 'created_at' | 'updated_at'>>
      }
      trip_participants: {
        Row: TripParticipant
        Insert: Omit<TripParticipant, 'id' | 'joined_at'>
        Update: Partial<Omit<TripParticipant, 'id' | 'joined_at'>>
      }
      line_items: {
        Row: LineItem
        Insert: Omit<LineItem, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<LineItem, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}

export interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Trip {
  id: string
  name: string
  start_date: string
  end_date: string
  image_url: string | null
  created_by: string
  created_at: string
  updated_at: string
}

export interface TripParticipant {
  id: string
  trip_id: string
  user_id: string
  start_date: string | null
  end_date: string | null
  role: 'owner' | 'participant'
  joined_at: string
}

export interface LineItem {
  id: string
  trip_id: string
  category: 'accommodation' | 'activity' | 'meal'
  title: string
  description: string | null
  date: string | null
  location: string | null
  cost: number | null
  assigned_to: string | null
  created_by: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface TripWithParticipants extends Trip {
  trip_participants: (TripParticipant & {
    profiles: Profile
  })[]
  participant_count?: number
}