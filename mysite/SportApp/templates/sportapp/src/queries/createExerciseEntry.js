import { gql } from 'apollo-boost';

export const CREATE_EXERCISE_ENTRY = gql`
  mutation newExEn($work: Boolean, $spEn: ID) {
    createExerciseEntry(isWorkout: $work, sportEntryId: $spEn) @client {
      exerciseEntry {
        id
        numberOfSets
        numberOfReps
        exercise {
          id
          name
        }
        isWorkout
        sportEntry {
          id
        }
      }
    }
  }
`;
