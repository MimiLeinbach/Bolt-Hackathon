/*
  # Fix infinite recursion in trip_participants RLS policies

  1. Problem
    - The current RLS policy on trip_participants references trips table
    - The trips table policies reference trip_participants table
    - This creates infinite recursion when querying trips with participants

  2. Solution
    - Replace the recursive policy with a direct user-based policy
    - Allow users to read trip_participants records where they are participants themselves
    - This breaks the circular dependency between trips and trip_participants tables

  3. Changes
    - Drop the problematic "Users can read trip participants for accessible trips" policy
    - Create a new policy that directly checks user participation without referencing trips table
*/

-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Users can read trip participants for accessible trips" ON trip_participants;

-- Create a new policy that allows users to read participants for trips they participate in
-- This avoids the circular reference by checking participation directly
CREATE POLICY "Users can read participants for their trips"
  ON trip_participants
  FOR SELECT
  TO authenticated
  USING (
    trip_id IN (
      SELECT tp.trip_id 
      FROM trip_participants tp 
      WHERE tp.user_id = auth.uid()
    )
  );