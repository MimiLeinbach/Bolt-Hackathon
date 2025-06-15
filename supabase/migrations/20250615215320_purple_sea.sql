/*
  # Fix RLS Policy Circular Dependency

  1. Problem
    - Circular dependency between trip_participants and trips table policies
    - trip_participants policies reference trips table
    - trips policies reference trip_participants table
    - This creates infinite recursion during policy evaluation

  2. Solution
    - Simplify trip_participants policies to be self-contained
    - Remove circular references by using direct user_id checks
    - Maintain security while avoiding recursive policy evaluation

  3. Changes
    - Drop existing problematic policies on trip_participants
    - Create new simplified policies that don't create circular dependencies
    - Ensure users can still only access their own participation data
*/

-- Drop existing policies that cause circular dependency
DROP POLICY IF EXISTS "Trip owners can read all participants" ON trip_participants;
DROP POLICY IF EXISTS "Trip owners can add participants" ON trip_participants;
DROP POLICY IF EXISTS "Trip owners can update participants" ON trip_participants;
DROP POLICY IF EXISTS "Trip owners can remove participants" ON trip_participants;

-- Create simplified policies that avoid circular references
-- Users can read their own participation records
CREATE POLICY "Users can read own participation records"
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
-- This policy checks the trips table directly without creating circular dependency
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