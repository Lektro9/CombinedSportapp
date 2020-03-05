/* eslint-disable */
<template>
  <v-card class="ma-3 pa-6" width="300" height="350" elevation="10" raised>
    <!-- TODO: Cool Background image -->
    <v-list-item>
      <v-list-item-content>
        <div class="overline">
          <v-icon>mdi-calendar</v-icon>
          {{ exerciseData.dateOfEntry }}
        </div>
      </v-list-item-content>

      <v-btn icon @click="isEdit = !isEdit">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-list-item>

    <form v-show="isEdit">
      <v-text-field single-line solo v-model="exerciseData.category.name"></v-text-field>
      <v-text-field
        v-for="(eEntry, index) in exerciseData.uebungseintragSet"
        v-bind:key="index"
        label="Regular"
        id="styled-input"
        class="styled-input ma-0 pa-0"
        v-model="eEntry.exercise.name"
      ></v-text-field>
    </form>

    <v-card-title v-show="!isEdit">
      <v-icon large left>mdi-arm-flex</v-icon>
      {{ exerciseData.category.name }}
    </v-card-title>

    <v-card-text
      class="text--primary"
      v-show="!isEdit"
      v-for="(eEntry, index) in exerciseData.uebungseintragSet"
      v-bind:key="index"
    >
      <div
        v-if="eEntry.isWorkout==false"
      >Warmup: {{ eEntry.numberOfSets }} x {{ eEntry.numberOfReps }} {{ eEntry.exercise.name }}</div>
      <div v-if="eEntry.isWorkout==true">
        Workout: {{ eEntry.numberOfSets }} x {{ eEntry.numberOfReps }}
        {{ eEntry.exercise.name }}
      </div>
    </v-card-text>

    <v-divider></v-divider>
    <v-card-text class="text--primary" v-show="!isEdit">
      {{
      exerciseData.commentOfTheDay
      }}
    </v-card-text>
    <v-textarea v-show="isEdit" filled auto-grow label="Two rows" rows="2" row-height="20"></v-textarea>
  </v-card>
</template>

<script>
export default {
  name: "ExerciseCard",
  props: ["exerciseData"],
  data: () => ({
    isEdit: true
  }),
  methods: {
    editMethod(index) {
      // eslint-disable-next-line no-console
      console.log(this.$refs.test[index]);
      return this.$refs.test[index];
    }
  }
};
</script>

<style>
#styled-input {
  height: 20px;
  font-size: 20pt;
}
.styled-input label[for] {
  height: 20px;
  font-size: 8pt;
  margin: 0px 0px 0px;
}
</style>
