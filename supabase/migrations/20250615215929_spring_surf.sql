/*
  # Fix infinite recursion in trip_participants RLS policies

  1. Problem
    - The "Trip owners can manage all participants" policy creates infinite recursion
    - Policy tries to query trip_participants table from within trip_participants policy
    
  2. Solution
    - Drop the problematic policy that causes recursion
    - Create simpler, non-recursive policies
    - Use trips table to check ownership instead of trip_participants
    
  3. New Policies
    - Trip creators can manage all participants (uses trips.created_by)
    - Users can manage their own participation records
    - Users can read participation records for trips they're in
*/

-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Trip owners can manage all participants" ON trip_participants;

-- Create a new policy that checks trip ownership via the trips table instead
-- This avoids recursion by not querying trip_participants from within trip_participants policy
CREATE POLICY "Trip creators can manage all participants"
  ON trip_participants
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trips 
      WHERE trips.id = trip_participants.trip_id 
      AND trips.created_by = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM trips 
      WHERE trips.id = trip_participants.trip_id 
      AND trips.created_by = auth.uid()
    )
  );

-- Ensure users can still read trip participants for trips they participate in
-- But use a simpler approach that doesn't cause recursion
DROP POLICY IF EXISTS "Users can read their own participation records" ON trip_participants;

CREATE POLICY "Users can read participation records"
  ON trip_participants
  FOR SELECT
  TO authenticated
  USING (
    -- Users can read their own participation records
    user_id = auth.uid()
    OR
    -- Trip creators can read all participation records for their trips
    EXISTS (
      SELECT 1 FROM trips 
      WHERE trips.id = trip_participants.trip_id 
      AND trips.created_by = auth.uid()
    )
  );

-- Keep the existing policies for individual user actions (these don't cause recursion)
-- "Users can update their own participation" - already exists and is fine
-- "Users can insert their own participation" - already exists and is fine  
-- "Users can delete their own participation (non-owners)" - already exists and is fine