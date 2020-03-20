import {
  gql
} from 'apollo-boost';

export const CREATE_EXERCISE_ENTRY = gql `
  mutation newExEn($work: Boolean, $spEn: ID, $sets: Int, $reps: Int, $exID: Int, $exName: String) {
    createExerciseEntry(isWorkout: $work, sportEntryId: $spEn, sets: $sets, reps: $reps, exID: $exID, exName: $exName) @client {
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
`;