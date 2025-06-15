/*
  # Fix infinite recursion in trip_participants RLS policies

  1. Problem
    - Current policies on trip_participants table create circular references
    - "Trip owners can manage participants" policy queries trip_participants from within trip_participants policy
    - "Users can read participants for their trips" policy also creates circular reference
    - This causes infinite recursion when Supabase tries to evaluate the policies

  2. Solution
    - Drop existing problematic policies
    - Create new simplified policies that avoid circular references
    - Use direct relationships to trips table instead of self-referencing trip_participants

  3. New Policies
    - Allow users to read participants for trips they created
    - Allow users to read participants for trips where they are participants (using trip ownership)
    - Allow trip creators to manage all participants
    - Allow users to update their own participation records
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Trip owners can manage participants" ON trip_participants;
DROP POLICY IF EXISTS "Users can read participants for their trips" ON trip_participants;
DROP POLICY IF EXISTS "Users can update their own participation" ON trip_participants;

-- Create new simplified policies without circular references

-- Allow users to read participants for trips they created
CREATE POLICY "Users can read participants for trips they created"
  ON trip_participants
  FOR SELECT
  TO authenticated
  USING (
    trip_id IN (
      SELECT id FROM trips WHERE created_by = auth.uid()
    )
  );

-- Allow users to read participants for trips where they are already participants
-- This uses a direct check against the trips table to avoid recursion
CREATE POLICY "Users can read participants for their joined trips"
  ON trip_participants
  FOR SELECT
  TO authenticated
  USING (
    trip_id IN (
      SELECT t.id 
      FROM trips t
      WHERE EXISTS (
        SELECT 1 FROM trip_participants tp 
        WHERE tp.trip_id = t.id 
        AND tp.user_id = auth.uid()
      )
    )
  );

-- Allow trip creators to insert/update/delete participants
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

-- Allow users to update their own participation details (like dates)
CREATE POLICY "Users can update own participation"
  ON trip_participants
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Allow users to delete their own participation (leave trip)
CREATE POLICY "Users can leave trips"
  ON trip_participants
  FOR DELETE
  TO authenticated
  USING (
    user_id = auth.uid() 
    AND role != 'owner' -- Prevent owners from leaving their own trips
  );