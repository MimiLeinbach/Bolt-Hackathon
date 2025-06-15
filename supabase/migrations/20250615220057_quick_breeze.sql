/*
  # Fix infinite recursion in trip_participants RLS policies

  1. Problem
    - Current RLS policies create circular dependencies between trips and trip_participants tables
    - This causes infinite recursion when querying data

  2. Solution
    - Simplify trip_participants SELECT policy to avoid referencing trips table
    - Use direct user_id check and separate policy for trip creators
    - Remove circular dependencies while maintaining security

  3. Changes
    - Drop existing problematic SELECT policies on trip_participants
    - Create new simplified policies that don't create circular references
*/

-- Drop existing SELECT policies that cause recursion
DROP POLICY IF EXISTS "Users can read participation records" ON trip_participants;
DROP POLICY IF EXISTS "Users can read trips they participate in" ON trips;

-- Create simplified SELECT policy for trip_participants
-- Users can read their own participation records
CREATE POLICY "Users can read own participation"
  ON trip_participants
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create policy for trip creators to read all participants in their trips
CREATE POLICY "Trip creators can read all participants"
  ON trip_participants
  FOR SELECT
  TO authenticated
  USING (
    trip_id IN (
      SELECT id FROM trips WHERE created_by = auth.uid()
    )
  );

-- Recreate the trips SELECT policy without circular reference
CREATE POLICY "Users can read trips they participate in"
  ON trips
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT DISTINCT trip_id 
      FROM trip_participants 
      WHERE user_id = auth.uid()
    )
  );