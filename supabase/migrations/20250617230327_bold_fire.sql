/*
  # Fix infinite recursion in trip_participants policies

  1. Problem
    - Multiple overlapping policies on trip_participants table
    - Policies creating circular dependencies when checking user participation
    - Infinite recursion when querying trip_participants table

  2. Solution
    - Drop all existing policies on trip_participants
    - Create simplified, non-recursive policies
    - Ensure policies don't reference trip_participants table in their conditions

  3. New Policies
    - Users can read their own participation records
    - Users can insert their own participation (for joining trips)
    - Users can update their own participation details
    - Users can delete their own participation (leave trips, but not if owner)
    - Trip creators can manage all participants for their trips
*/

-- Drop all existing policies on trip_participants
DROP POLICY IF EXISTS "Trip creators can manage all participants" ON trip_participants;
DROP POLICY IF EXISTS "Trip creators can manage participants" ON trip_participants;
DROP POLICY IF EXISTS "Trip creators can read all participants" ON trip_participants;
DROP POLICY IF EXISTS "Users can delete their own participation (non-owners)" ON trip_participants;
DROP POLICY IF EXISTS "Users can insert their own participation" ON trip_participants;
DROP POLICY IF EXISTS "Users can join trips" ON trip_participants;
DROP POLICY IF EXISTS "Users can leave trips" ON trip_participants;
DROP POLICY IF EXISTS "Users can read own participation" ON trip_participants;
DROP POLICY IF EXISTS "Users can read own participation records" ON trip_participants;
DROP POLICY IF EXISTS "Users can update own participation" ON trip_participants;
DROP POLICY IF EXISTS "Users can update their own participation" ON trip_participants;

-- Create simplified policies that avoid recursion

-- Users can read their own participation records
CREATE POLICY "Users can read own participation"
  ON trip_participants
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Users can insert their own participation (for joining trips)
CREATE POLICY "Users can join trips"
  ON trip_participants
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can update their own participation details
CREATE POLICY "Users can update own participation"
  ON trip_participants
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Users can delete their own participation (leave trips), but not if they're the owner
CREATE POLICY "Users can leave trips"
  ON trip_participants
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid() AND role != 'owner');

-- Trip creators can manage all participants for their trips
-- This policy checks the trips table directly instead of trip_participants
CREATE POLICY "Trip creators can manage participants"
  ON trip_participants
  FOR ALL
  TO authenticated
  USING (
    trip_id IN (
      SELECT id FROM trips WHERE created_by = auth.uid()
    )
  )
  WITH CHECK (
    trip_id IN (
      SELECT id FROM trips WHERE created_by = auth.uid()
    )
  );