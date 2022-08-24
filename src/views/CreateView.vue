<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <!-- Status Message -->
    <div v-if="statusMsg || errorMsg" class="mb-10 p-4 bg-light-grey rounded-md">
      <p class="text-at-light-green">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">
        {{ errorMsg }}
      </p>
    </div>

    <!-- Create -->
    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <!-- Form -->
      <form @submit.prevent="createWorkout" class="flex flex-col gray-y-5 w-full">
        <h1 class="text-2xl text-at-light-green">Record Workout</h1>

        <!-- Workout Name -->
        <div class="flex flex-col">
          <lable for="workout-name" class="mb-1 text-sm text-at-light-green">
            Workout Name
          </lable>
          <input type="text" required id="workout-name" v-model="workoutName"
            class="p-2 text-gray-500 focus:outline-none">
        </div>
        <!-- Workout Type -->
        <div class="flex flex-col">
          <lable for="workout-type" class="mb-1 text-sm text-at-light-green">
            Workout Type
          </lable>
          <select id="workout-type" class="p-2 text-gray-500 focus:outline-none" required v-model="workoutType">
            <option value="select-workout">Select Workout</option>
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>

        <!-- Strength Training Inputs -->
        <div v-if="workoutType === 'strength'" class="mt-8 flex flex-col gap-y-4">
          <div class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row" v-for="(item, index) in exercises"
            :key="index">
            <!-- exercise-name -->
            <div class="flex flex-col md:w-1/3">
              <lable for="exercise-name" class="mb-1 text-sm text-at-light-green">
                Exercise
              </lable>
              <input type="text" id="exercise-name" class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.exercise">
            </div>
            <!-- Sets -->
            <div class="flex flex-col  flex-1">
              <lable for="sets" class="mb-1 text-sm text-at-light-green">
                Sets
              </lable>
              <input type="text" id="sets" class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.sets">
            </div>
            <!-- Reps -->
            <div class="flex flex-col  flex-1">
              <lable for="reps" class="mb-1 text-sm text-at-light-green">
                Reps
              </lable>
              <input type="text" id="reps" class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.reps">
            </div>
            <!-- Weight -->
            <div class="flex flex-col  flex-1">
              <lable for="weight" class="mb-1 text-sm text-at-light-green">
                Weight (LB's)
              </lable>
              <input type="text" id="weight" class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.weight">
            </div>
            <img @click="deleteExercise(item.id)" src="@/assets/images/trash-light-green.png"
              class="h-4 w-auto absolute -left-5 cursor-pointer" alt="">
          </div>
          <button type="button" @click="addExercise"
            class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green  duration-200 border-solid  border-2  border-transparent hover:border-at-light-green hover:border-white hover:bg-white hover:text-at-light-green">
            Add Exercise
          </button>
        </div>

        <!-- Cardio  Inputs -->
        <div v-if="workoutType === 'cardio'" class="mt-8 flex flex-col gap-y-4">
          <div class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row" v-for="(item, index) in exercises"
            :key="index">
            <!-- exercise-name -->
            <div class="flex flex-col md:w-1/3">
              <label for="cardio-type" class="mb-1 text-sm text-at-light-green">Type
              </label>
              <select id="cardio-type" class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.cardioType">
                <option value="#">Select Type</option>
                <option value="run">Runs</option>
                <option value="walk">Walk</option>
              </select>
            </div>
            <!-- Distance -->
            <div class="flex flex-col  flex-1">
              <lable for="distance" class="mb-1 text-sm text-at-light-green">
                Distance
              </lable>
              <input type="text" id="distance" class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.distance">
            </div>
            <!-- Duration -->
            <div class="flex flex-col  flex-1">
              <lable for="duration" class="mb-1 text-sm text-at-light-green">
                Duration
              </lable>
              <input type="text" id="duration" class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.duration">
            </div>
            <!-- Weight -->
            <div class="flex flex-col  flex-1">
              <lable for="weight" class="mb-1 text-sm text-at-light-green">
                Pace
              </lable>
              <input type="text" id="pace" class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.pace">
            </div>
            <img @click="deleteExercise(item.id)" src="@/assets/images/trash-light-green.png"
              class="h-4 w-auto absolute -left-5 cursor-pointer" alt="">
          </div>
          <button type="button" @click="addExercise" class="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-at-light-green duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green">
            Add Exercise
          </button>
        </div>
        <button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-at-light-green duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green">
          Record Workout
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { uid } from 'uid'
import { supabase } from '@/supabase/supabase'
export default {
  data() {
    return {
      workoutName: null,
      workoutType: 'select-workout',
      exercises: [],
      statusMsg: null,
      errorMsg: null
    }
  },
  methods: {
    addExercise() {
      if (this.workoutType === 'strength') {
        this.exercises.push({
          id: uid(),
          exercise: '',
          setes: '',
          reps: '',
          weight: '',
        })
        return;
      }
      this.exercises.push({
        id: uid(),
        cardioType: '',
        distance: '',
        duration: '',
        pace: ''
      })
    },

    deleteExercise(id) {

      if (this.exercises.length > 1) {
        this.exercises = this.exercises.filter((exercise) => exercise.id !== id);
        console.log(id)
        return;
      }
      this.errorMsg = 'Enter: Cannot remove, need to at least have one exercise';
      setTimeout(() => {
        this.errorMsg = false;
      }, 5000)
    },

    workoutChange() {
      this.exercises = [];
      this.addExercise();
    },
    // create workout
    async createWorkout() {
      try {
        const { error } = await supabase.from('workouts')
          .insert([
            {
              workoutName: this.workoutName,
              workoutType: this.workoutType,
              exercises: this.exercises
            }
          ])
        if (error) throw error;
        this.statusMsg = 'Succes: Workout Created!';
        this.workoutName = null;
        this.workoutType = 'select-workout';
        this.exercises = [];
        setTimeout(() => {
          this.statusMsg = false;
        }, 5000)

      } catch (error) {
        this.errorMsg = `Error: ${error.message}`;
        setTimeout(() => {
          this.errorMsg = false;
        }, 5000)
      }
    }

  }
}
</script>
