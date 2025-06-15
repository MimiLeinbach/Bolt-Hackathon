/*
  # Fix RLS Policy Circular Dependency

  1. Problem
    - Circular dependency between trips and trip_participants policies
    - "Users can read participant trips" on trips references trip_participants
    - "Trip owners can read all participants" on trip_participants references trips
    - This creates infinite recursion when querying

  2. Solution
    - Drop ALL existing policies on trip_participants table
    - Create new simplified policies that avoid circular references
    - Maintain security while eliminating recursion

  3. Changes
    - Remove all existing trip_participants policies
    - Create self-contained policies that don't reference other tables circularly
    - Ensure users can only access their own data or data they should have access to
*/

-- Drop ALL existing policies on trip_participants table
DROP POLICY IF EXISTS "Trip owners can add participants" ON trip_participants;
DROP POLICY IF EXISTS "Trip owners can read all participants" ON trip_participants;
DROP POLICY IF EXISTS "Trip owners can remove participants" ON trip_participants;
DROP POLICY IF EXISTS "Trip owners can update participants" ON trip_participants;
DROP POLICY IF EXISTS "Users can join trips" ON trip_participants;
DROP POLICY IF EXISTS "Users can leave trips" ON trip_participants;
DROP POLICY IF EXISTS "Users can read own participation" ON trip_participants;
DROP POLICY IF EXISTS "Users can update own participation" ON trip_participants;
DROP POLICY IF EXISTS "Trip owners can manage participants" ON trip_participants;
DROP POLICY IF EXISTS "Users can read participants for their trips" ON trip_participants;

-- Create new simplified policies that avoid circular references

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