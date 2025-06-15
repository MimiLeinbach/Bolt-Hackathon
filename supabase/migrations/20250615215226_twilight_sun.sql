/*
  # Fix infinite recursion in trip_participants RLS policies

  1. Problem
    - The existing RLS policies on trip_participants table are causing infinite recursion
    - The SELECT policies are referencing the same table they're protecting, creating circular dependencies

  2. Solution
    - Drop the problematic recursive policies
    - Create new, simplified policies that avoid self-referencing
    - Use direct user_id checks and trip ownership checks without circular references

  3. New Policies
    - Users can read their own participation records
    - Trip owners can read all participants for their trips
    - Users can manage their own participation (insert/update/delete)
    - Trip owners can manage all participants for their trips
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can read participants for their joined trips" ON trip_participants;
DROP POLICY IF EXISTS "Users can read participants for trips they created" ON trip_participants;
DROP POLICY IF EXISTS "Trip creators can manage participants" ON trip_participants;
DROP POLICY IF EXISTS "Users can leave trips" ON trip_participants;
DROP POLICY IF EXISTS "Users can update own participation" ON trip_participants;

-- Create new, non-recursive policies

-- Users can read their own participation records
CREATE POLICY "Users can read own participation"
  ON trip_participants
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Users can read participants for trips they own (based on trips.created_by)
CREATE POLICY "Trip owners can read all participants"
  ON trip_participants
  FOR SELECT
  TO authenticated
  USING (
    trip_id IN (
      SELECT id FROM trips WHERE created_by = auth.uid()
    )
  );

-- Users can insert themselves as participants (for joining trips)
CREATE POLICY "Users can join trips"
  ON trip_participants
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Trip owners can insert any participants
CREATE POLICY "Trip owners can add participants"
  ON trip_participants
  FOR INSERT
  TO authenticated
  WITH CHECK (
    trip_id IN (
      SELECT id FROM trips WHERE created_by = auth.uid()
    )
  );

-- Users can update their own participation details
CREATE POLICY "Users can update own participation"
  ON trip_participants
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Trip owners can update any participant details
CREATE POLICY "Trip owners can update participants"
  ON trip_participants
  FOR UPDATE
  TO authenticated
  USING (
    trip_id IN (
      SELECT id FROM trips WHERE created_by = auth.uid()
    )
  );

-- Users can leave trips (delete their own participation, but not if they're the owner)
CREATE POLICY "Users can leave trips"
  ON trip_participants
  FOR DELETE
  TO authenticated
  USING (
    user_id = auth.uid() 
    AND role != 'owner'
  );

-- Trip owners can remove any participants
CREATE POLICY "Trip owners can remove participants"
  ON trip_participants
  FOR DELETE
  TO authenticated
  USING (
    trip_id IN (
      SELECT id FROM trips WHERE created_by = auth.uid()
    )
  );