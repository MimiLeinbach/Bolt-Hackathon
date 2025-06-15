/*
  # Fix infinite recursion in trips RLS policies

  1. Problem
    - The current RLS policies on the trips table are causing infinite recursion
    - This happens when creating a new trip because the SELECT policy tries to check trip_participants before the trip is fully created

  2. Solution
    - Drop the problematic policies that cause circular references
    - Create new, simpler policies that avoid recursion
    - Separate the logic for trip creators vs trip participants

  3. Changes
    - Remove existing policies that cause recursion
    - Add new policies with clearer separation of concerns
    - Ensure trip creation works without circular dependencies
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can read their own created trips" ON trips;
DROP POLICY IF EXISTS "Users can read trips where they are participants" ON trips;
DROP POLICY IF EXISTS "Trip creators can update their trips" ON trips;
DROP POLICY IF EXISTS "Trip owners can update trips via participants" ON trips;
DROP POLICY IF EXISTS "Authenticated users can create trips" ON trips;

-- Create new, non-recursive policies
-- Policy for reading trips created by the user
CREATE POLICY "Users can read own created trips"
  ON trips
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

-- Policy for reading trips where user is a participant (simplified to avoid recursion)
CREATE POLICY "Users can read participant trips"
  ON trips
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trip_participants 
      WHERE trip_participants.trip_id = trips.id 
      AND trip_participants.user_id = auth.uid()
    )
  );

-- Policy for creating trips
CREATE POLICY "Authenticated users can create trips"
  ON trips
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Policy for updating own created trips
CREATE POLICY "Users can update own created trips"
  ON trips
  FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Policy for trip owners to update trips (via participants table)
CREATE POLICY "Trip owners can update trips"
  ON trips
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trip_participants 
      WHERE trip_participants.trip_id = trips.id 
      AND trip_participants.user_id = auth.uid() 
      AND trip_participants.role = 'owner'
    )
  );