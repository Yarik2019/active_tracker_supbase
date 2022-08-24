<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        <!-- app Msg -->
        <div v-if="statusMsg || errorMsg" class="mb-10 p-4 rounded-md shadow-md bg-light-grey">
            <p class="text-at-light-green">
                {{ statusMsg }}
            </p>
            <p class="text-red-500">
                {{ errorMsg }}
            </p>
        </div>
        <!-- General Workout info -->
        <div class="flex flex-col items-center p-8 rounded-md shadow-md bg-light-grey relative">
            <div v-if="user" class="flex absolute left-2 top-2 gap-x-2">
                <div class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg"
                    @click="editMode">
                    <img src="@/assets/images/pencil-light.png" alt="" class="h-3.5 w-auto">
                </div>
                <div @click="deleteWorkout"
                    class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg">
                    <img src="@/assets/images/trash-light.png" alt="" class="h-3.5 w-auto">
                </div>

            </div>

            <img v-if="data.workoutType === 'cardio'" src="@/assets/images/running-light-green.png" alt=""
                class="h-24 w-auto">
            <img v-else src="@/assets/images/dumbbell-light-green.png" alt="" class="h-24 w-auto">
            <span class="mt-6 py-1.5 px-5 text-xs text-white bg-at-light-green rounded-lg shadow-md">
                {{ data.workoutType }}
            </span>

            <div class="w-full mt-6">
                <input v-if="edit" type="text" class="p-2 w-full text-gray-500 focus:outline-none"
                    v-model="data.workoutName">
                <h1 v-else class="text-at-light-green text-2xl text-center">{{ data.workoutName }}</h1>
            </div>
        </div>

        <!-- Exercises -->
        <div class="mt-10 p-8 rounded-md flex flex-col items-center bg-light-grey shadow-md">
            <!-- Strength Training -->

            <div v-if="data.workoutType === 'strength'" class="flex flex-col gap-y-4 w-full">
                <div class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row" v-for="item in data.exercises"
                    :key="item.id">
                    <!-- Exercise -->
                    <div class="flex flex-2 flex-col md:w-1/3">
                        <lable for="exercise-name" class="mb-1 text-sm text-at-light-green">
                            Exercise
                        </lable>
                        <input v-if="edit" type="text" id="exercise-name"
                            class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.exercise" />
                        <p v-else>{{ item.exercise }}</p>
                    </div>
                    <!-- Sets -->
                    <div class="flex flex-1 flex-col ">
                        <lable for="exercise-name" class="mb-1 text-sm text-at-light-green">
                            Sets
                        </lable>
                        <input v-if="edit" type="text" id="exercise-name"
                            class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.sets" />
                        <p v-else>{{ item.sets }}</p>
                    </div>
                    <!-- Reps -->
                    <div class="flex flex-1 flex-col ">
                        <lable for="exercise-name" class="mb-1 text-sm text-at-light-green">
                            Reps
                        </lable>
                        <input v-if="edit" type="text" id="exercise-name"
                            class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.reps" />
                        <p v-else>{{ item.reps }}</p>
                    </div>
                    <!-- Weight -->
                    <div class="flex flex-1 flex-col ">
                        <lable for="exercise-name" class="mb-1 text-sm text-at-light-green">
                            Weight (LB's)
                        </lable>
                        <input v-if="edit" type="text" id="exercise-name"
                            class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.weight" />
                        <p v-else>{{ item.weight }}</p>
                    </div>
                    <!-- img -->
                    <img v-if="edit" @click="deleteExercise(item.id)" class="absolute h-4 w-auto -left-5 cursor-pointer"
                        src="@/assets/images/trash-light-green.png" alt="">
                </div>
                <button @click="addExercise" v-if="edit" type="button" class="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-at-light-green duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green">
                    Add Exercise
                </button>
            </div>

            <!-- Cardio -->
            <div v-else class="flex flex-col gap-y-4 w-full">
                <div class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row" v-for="item in data.exercises"
                    :key="item.id">
                    <!-- Type -->
                    <div class="flex flex-2 flex-col md:w-1/3">
                        <lable for="cardioType" class="mb-1 text-sm text-at-light-green">
                            Type
                        </lable>
                        <select v-if="edit" type="text" id="cardioType"
                            class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.cardioType">
                            <option value="#">Select Type</option>
                            <option value="run">Runs</option>
                            <option value="walk">Walk</option>
                        </select>
                        <p v-else>{{ item.cardioType }}</p>
                    </div>
                    <!-- Distance -->
                    <div class="flex flex-1 flex-col ">
                        <lable for="distance" class="mb-1 text-sm text-at-light-green">
                            Distance
                        </lable>
                        <input v-if="edit" type="text" id="distance" class="p-2 w-full text-gray-500 focus:outline-none"
                            v-model="item.distance" />
                        <p v-else>{{ item.distance }}</p>
                    </div>
                    <!-- Duraction -->
                    <div class="flex flex-1 flex-col ">
                        <lable for="duration" class="mb-1 text-sm text-at-light-green">
                            Duration
                        </lable>
                        <input v-if="edit" type="text" id="duration" class="p-2 w-full text-gray-500 focus:outline-none"
                            v-model="item.duration" />
                        <p v-else>{{ item.duration }}</p>
                    </div>
                    <!-- Weight -->
                    <div class="flex flex-1 flex-col ">
                        <lable for="pace" class="mb-1 text-sm text-at-light-green">
                            pace
                        </lable>
                        <input v-if="edit" type="text" id="pace" class="p-2 w-full text-gray-500 focus:outline-none"
                            v-model="item.pace" />
                        <p v-else>{{ item.pace }}</p>
                    </div>
                    <!-- img -->
                    <img v-if="edit" @click="deleteExercise(item.id)" class="absolute h-4 w-auto -left-5 cursor-pointer"
                        src="@/assets/images/trash-light-green.png" alt="">
                </div>
                <button @click="addExercise" v-if="edit" type="button" class="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-at-light-green duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green">
                    Add Exercise
                </button>
            </div>
        </div>
        <!-- Update -->
        <button v-if="edit" @click="update" type="submit" class="mt-10 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-at-light-green duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green">
            Update Workout
        </button>
    </div>
</template>
<script>
import { supabase } from '../supabase/supabase';
import { mapState } from 'vuex';
import router from '@/router';
import { uid } from 'uid';
export default {
    name: 'WorkoutView',
    data() {
        return {
            data: null,
            dataLoaded: null,
            errorMsg: null,
            statusMsg: null,
            edit: null

        }
    },
    computed: {
        ...mapState(['user']),
        // current id of route
        currentId() {
            return this.$route.params.workoutId
        }
    },
    methods: {
        // get workout data
        async getData() {
            //   workout data
            try {
                const { data: workouts, error } = await supabase
                    .from('workouts')
                    .select('*').eq("id", this.currentId);
                if (error) throw error;
                this.data = workouts[0];
                this.dataLoaded = true;
                console.log(this.data)
            } catch (error) {
                this.errorMsg = error.message;
                setTimeout(() => {
                    this.errorMsg = false;
                }, 5000)
            }
        },
        // Delete workout
        async deleteWorkout() {
            try {
                const { error } = await supabase
                    .from('workouts')
                    .delete()
                    .eq('id', this.currentId);
                if (error) throw error;
                router.push({ name: 'home' });
            } catch (error) {
                this.errorMsg = error.message;
                setTimeout(() => {
                    this.errorMsg = false;
                }, 5000)
            }
        },

        // add exercise
        addExercise() {
            if (this.data.workoutType === 'strength') {
                this.data.exercises.push({
                    id: uid(),
                    exercise: '',
                    setes: '',
                    reps: '',
                    weight: '',
                })
                return;
            }
            this.data.exercises.push({
                id: uid(),
                cardioType: '',
                distance: '',
                duration: '',
                pace: ''
            })
        },

        //  delete exercise

        deleteExercise(id) {

            if (this.data.exercises.length > 1) {
                this.data.exercises = this.data.exercises.filter((exercise) => exercise.id !== id);
                return;
            }
            this.errorMsg = 'Enter: Cannot remove, need to at least have one exercise';
            setTimeout(() => {
                this.errorMsg = false;
            }, 5000)
        },

        // update workout
        async update() {
            try {
                const { error } = await supabase
                    .from('workouts')
                    .update({
                        workoutName: this.data.workoutName,
                        exercises: this.data.exercises,
                    })
                    .eq('id', this.currentId);
                this.edit = false;
                this.statusMsg = 'Success: Workout Updated!';
                if (error) throw error;

            } catch (error) {
                this.errorMsg = error.message;
                setTimeout(() => {
                    this.errorMsg = false;
                })
            }
        },
        editMode() {
            this.edit = !this.edit;
        }
    },
    created() {
        this.getData();
    },
}
</script>
