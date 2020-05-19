<template>
  <v-card>
    <v-card-title>
      <span class="headline">Convict Conditioning</span>
    </v-card-title>
    <v-select
      :items="
        guide.map((category) => {
          return category.name;
        })
      "
      v-model="CategoryName"
    ></v-select>
    <v-card v-for="(exercise, i) in showExercises()" :key="i" class="ma-3">
      <v-card-title>{{ exercise.name }}</v-card-title>
      <v-img :src="exercise.image"></v-img>
    </v-card>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text @click="$emit('closeModal')"
        >Close</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'guideModal',
  data: () => ({
    CategoryName: '',
    guide: [
      {
        name: 'Push-Ups',
        exercises: [
          {
            name: '01. Wall Push-Ups',
            image: require('../assets/Pushups/01WallPushups.jpg'),
          },
          {
            name: '02. Incline Push-Ups',
            image: require('../assets/Pushups/02Incline.jpg'),
          },
          {
            name: '03. Kneeling Push-Ups',
            image: require('../assets/Pushups/03Kneeling.jpg'),
          },
          {
            name: '04. Half Push-Ups',
            image: require('../assets/Pushups/04Half.jpg'),
          },
          {
            name: '05. Full Push-Ups',
            image: require('../assets/Pushups/05Full.jpg'),
          },
          {
            name: '06. Close Push-Ups',
            image: require('../assets/Pushups/06Close.jpg'),
          },
          {
            name: '07. Uneven Push-Ups',
            image: require('../assets/Pushups/07Uneven.jpg'),
          },
          {
            name: '08. Half One Arm Push-Ups',
            image: require('../assets/Pushups/08HalfOneArm.jpg'),
          },
          {
            name: '09. Lever Push-Ups',
            image: require('../assets/Pushups/09Lever.jpg'),
          },
          {
            name: '10. One-Arm Push-Ups',
            image: require('../assets/Pushups/10OneArm.jpg'),
          },
        ],
      },
      {
        name: 'Pull-Ups',
        exercises: [
          {
            name: '01. Vertical Pulls',
            image: require('../assets/pullups/01Vertical.jpg'),
          },
          {
            name: '02. Horizontal Pulls',
            image: require('../assets/pullups/02Horizontal.jpg'),
          },
          {
            name: '03. Jackknife Pulls',
            image: require('../assets/pullups/03Jackknife.jpg'),
          },
          {
            name: '04. Half Pull-Ups',
            image: require('../assets/pullups/04Half.jpg'),
          },
          {
            name: '05. Full Pull-Ups',
            image: require('../assets/pullups/05Full.jpg'),
          },
          {
            name: '06. Close Pull-Ups',
            image: require('../assets/pullups/06Close.jpg'),
          },
          {
            name: '07. Uneven Pull-Ups',
            image: require('../assets/pullups/07Uneven.jpg'),
          },
          {
            name: '08. Half One Arm Pull-Ups',
            image: require('../assets/pullups/08HalfOneArm.jpg'),
          },
          {
            name: '09. Assisted Pull-Ups',
            image: require('../assets/pullups/09Assisted.jpg'),
          },
          {
            name: '10. One-Arm Pull-Ups',
            image: require('../assets/pullups/10OneArm.jpg'),
          },
        ],
      },
      {
        name: 'Bridges',
        exercises: [
          {
            name: '01. Short Bridges',
            image: require('../assets/bridges/01Short.jpg'),
          },
          {
            name: '02. Straight Bridges',
            image: require('../assets/bridges/02Straight.jpg'),
          },
          {
            name: '03. Angled Bridges',
            image: require('../assets/bridges/03Angled.jpg'),
          },
          {
            name: '04. Head Bridges',
            image: require('../assets/bridges/04Head.jpg'),
          },
          {
            name: '05. Half Bridges',
            image: require('../assets/bridges/05Half.jpg'),
          },
          {
            name: '06. Full Bridges',
            image: require('../assets/bridges/06Full.jpg'),
          },
          {
            name: '07. Wall Walking (Down)',
            image: require('../assets/bridges/07WallWalkingDown.jpg'),
          },
          {
            name: '08. Wall Walking (Up)',
            image: require('../assets/bridges/08WallWalkingUp.jpg'),
          },
          {
            name: '09. Closing Bridges',
            image: require('../assets/bridges/09Closing.jpg'),
          },
          {
            name: '10. Stand-To-Stand Bridges',
            image: require('../assets/bridges/10StandToStand.jpg'),
          },
        ],
      },
      {
        name: 'Handstands',
        exercises: [
          {
            name: '01. Wall Headstands',
            image: require('../assets/handstand/01Wall.jpg'),
          },
          {
            name: '02. Crow Stands',
            image: require('../assets/handstand/02CrowStands.jpg'),
          },
          {
            name: '03. Wall Handstands',
            image: require('../assets/handstand/03WallHand.jpg'),
          },
          {
            name: '04. Half Handstand Push-Ups',
            image: require('../assets/handstand/04HalfHandstand.jpg'),
          },
          {
            name: '05. Handstand Push-Ups',
            image: require('../assets/handstand/05Full.jpg'),
          },
          {
            name: '06. Close Handstand Push-Ups',
            image: require('../assets/handstand/06Close.jpg'),
          },
          {
            name: '07. Uneven Handstand Push-Ups',
            image: require('../assets/handstand/07Uneven.jpg'),
          },
          {
            name: '08. Half One-Arm Handstand Push-Ups',
            image: require('../assets/handstand/08HalfOneArm.jpg'),
          },
          {
            name: '09. Lever Handstand Push-Ups',
            image: require('../assets/handstand/09Lever.jpg'),
          },
          {
            name: '10. One-Arm Handstand Push-Ups',
            image: require('../assets/handstand/10OneArm.jpg'),
          },
        ],
      },
      {
        name: 'Leg Raises',
        exercises: [
          {
            name: '01. Knee Tucks',
            image: require('../assets/legraises/01Knee.jpg'),
          },
          {
            name: '02. Flat Knee Raises',
            image: require('../assets/legraises/02FlatKnee.jpg'),
          },
          {
            name: '03. Flat Bent Leg Raises',
            image: require('../assets/legraises/03FlatBendLeg.jpg'),
          },
          {
            name: '04. Flat Frog Raises',
            image: require('../assets/legraises/04FlatFrogRaises.jpg'),
          },
          {
            name: '05. Flat Straight Leg Raises',
            image: require('../assets/legraises/05FlatStraight.jpg'),
          },
          {
            name: '06. Hanging Knee Raises',
            image: require('../assets/legraises/06HangingKnee.jpg'),
          },
          {
            name: '07. Hanging Bent Leg Raises',
            image: require('../assets/legraises/07HangingBentLeg.jpg'),
          },
          {
            name: '08. Hanging Frog Raises',
            image: require('../assets/legraises/08HangingFrog.jpg'),
          },
          {
            name: '09. Partial Straight Leg Raises',
            image: require('../assets/legraises/09PartialStraight.jpg'),
          },
          {
            name: '10. Hanging Straight Leg Raises',
            image: require('../assets/legraises/10HangingStraight.jpg'),
          },
        ],
      },
      {
        name: 'Squats',
        exercises: [
          {
            name: '01. Shoulderstand Squats',
            image: require('../assets/squats/01Shoulderstand.jpg'),
          },
          {
            name: '02. Jackknife Squats',
            image: require('../assets/squats/02Jackknife.jpg'),
          },
          {
            name: '03. Supported Squats',
            image: require('../assets/squats/03Supported.jpg'),
          },
          {
            name: '04. Half Squats',
            image: require('../assets/squats/04Half.jpg'),
          },
          {
            name: '05. Full Squats',
            image: require('../assets/squats/05Full.jpg'),
          },
          {
            name: '06. Close Squats',
            image: require('../assets/squats/06Close.jpg'),
          },
          {
            name: '07. Uneven Squats',
            image: require('../assets/squats/07Uneven.jpg'),
          },
          {
            name: '08. Half One-Leg Squats',
            image: require('../assets/squats/08HalfOneLeg.jpg'),
          },
          {
            name: '09. Assisted One-Leg Squats',
            image: require('../assets/squats/09AssistedOneLeg.jpg'),
          },
          {
            name: '10. One-Leg Squats',
            image: require('../assets/squats/10OneLeg.jpg'),
          },
        ],
      },
    ],
  }),
  methods: {
    showExercises() {
      let ExArr;
      this.guide.filter((category) => {
        if (category.name === this.CategoryName) {
          ExArr = category.exercises;
        }
      });
      return ExArr;
    },
  },
};
</script>
