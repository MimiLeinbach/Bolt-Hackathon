/*
  # Fix infinite recursion in RLS policies

  1. Problem
    - Circular dependencies between trips and trip_participants policies
    - trip_participants policies reference trips table which references back to trip_participants
    - This creates infinite recursion when evaluating policies

  2. Solution
    - Simplify trip_participants policies to avoid circular references
    - Remove complex joins that cause recursion
    - Use direct user_id checks where possible
    - Ensure policies are self-contained without circular dependencies

  3. Changes
    - Drop existing problematic policies on trip_participants
    - Create new simplified policies that don't cause recursion
    - Maintain security while avoiding circular references
*/

-- Drop existing problematic policies on trip_participants
DROP POLICY IF EXISTS "Trip creators can manage participants" ON trip_participants;
DROP POLICY IF EXISTS "Users can join trips" ON trip_participants;
DROP POLICY IF EXISTS "Users can leave trips" ON trip_participants;
DROP POLICY IF EXISTS "Users can read own participation records" ON trip_participants;
DROP POLICY IF EXISTS "Users can update own participation" ON trip_participants;

-- Create new simplified policies for trip_participants that avoid recursion
CREATE POLICY "Users can read their own participation records"
  ON trip_participants
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own participation"
  ON trip_participants
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own participation"
  ON trip_participants
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own participation (non-owners)"
  ON trip_participants
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid() AND role != 'owner');

-- Create a separate policy for trip owners to manage all participants
CREATE POLICY "Trip owners can manage all participants"
  ON trip_participants
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trip_participants tp_owner
      WHERE tp_owner.trip_id = trip_participants.trip_id
      AND tp_owner.user_id = auth.uid()
      AND tp_owner.role = 'owner'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM trip_participants tp_owner
      WHERE tp_owner.trip_id = trip_participants.trip_id
      AND tp_owner.user_id = auth.uid()
      AND tp_owner.role = 'owner'
    )
  );

-- Also fix the trips table policies to avoid recursion
DROP POLICY IF EXISTS "Users can read participant trips" ON trips;

-- Create a simpler policy for reading trips as participants
CREATE POLICY "Users can read trips they participate in"
  ON trips
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT trip_id FROM trip_participants
      WHERE user_id = auth.uid()
    )
  );