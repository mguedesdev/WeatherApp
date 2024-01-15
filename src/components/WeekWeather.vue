<template>
  <div class="max-w-screen-md w-full py-12">
    <div class="mx-8 text-white">
      <h2 class="mb-4 text-lg">Week Weather</h2>
      <template v-for="(day, index) in weatherData.daily" :key="day.dt">

        <div
          v-if="index > 0"
          :class="{ 'hover:bg-white hover:bg-opacity-10 flex items-center border-t border-white border-opacity-10 cursor-pointer': true,
          'border-b': index === weatherData.daily.length - 1}"
          @click="toggleDetails(day)"
        >

          <p class="flex-1">{{ new Date(day.dt * 1000).toLocaleDateString(
              "en-us",
              {
                weekday: "long",
              }
            )}}
          </p>

          <div class="flex justify-start items-center">
            <img
              class="w-[50px] h-[50px] object-cover"
              :src="
                `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
              "
              alt=""
            />
            <p class="hidden md:block">
              {{ day.weather[0].description }}
            </p>
          </div>
          <div class="flex gap-2 flex-1 justify-end">
            <p class=""><i class=" text-[17px] text-red-500 fa-solid fa-up-long"></i> {{ Math.round(day.temp.max) }}&deg;</p>
            <p class=""><i class=" text-[17px] text-blue-500 fa-solid fa-down-long"></i> {{ Math.round(day.temp.min) }}&deg;</p>
          </div>
        </div>
        
        <transition name="slide">
          <div
          v-if="detailsVisibility[new Date(day.dt * 1000).toLocaleDateString()]" 
          class=" bg-weather-secondary overflow-hidden"
          >
          <div class="flex flex-1 bg-weather-secondary m-5 flex-col overflow-hidden">
            <div class="flex justify-between items-center">
              <p class="text-lg">Details</p>
              
            </div>
            <div class="flex flex-col gap-2 mt-4 ">
              <div class="flex justify-between border-b border-white border-opacity-10">
                <p>Humidity</p>
                <p>{{ day.humidity }}%</p>
              </div>
              <div class="flex justify-between border-b border-white border-opacity-10">
                <p>Pressure</p>
                <p>{{ day.pressure }} hPa</p>
              </div>
              <div class="flex justify-between border-b border-white border-opacity-10">
                <p>Wind</p>
                <p>{{ day.wind_speed }} m/s</p>
              </div>
              <div class="flex justify-between border-b border-white border-opacity-10">
                <p>Clouds</p>
                <p>{{ day.clouds }}%</p>
              </div>
              <div class="flex justify-between border-b border-white border-opacity-10">
                <p>UV Index</p>
                <p>{{ day.uvi }}</p>
              </div>
              <div class="flex justify-between border-b border-white border-opacity-10">
                <p>Sunrise</p>
                <p>{{ new Date(day.sunrise * 1000).toLocaleTimeString() }}</p>
              </div>
              <div class="flex justify-between border-b border-white border-opacity-10">
                <p>Sunset</p>
                <p>{{ new Date(day.sunset * 1000).toLocaleTimeString() }}</p>
              </div>
            </div>
            </div>
          </div>
        </transition>
      </template>
      </div>
  </div>
</template>

<script setup>
import { defineProps, reactive } from "vue";

defineProps({
  weatherData: {
    type: Object,
    required: true,
  },
});

const detailsVisibility = reactive({});

const toggleDetails = (day) => {
  const dateKey = new Date(day.dt * 1000).toLocaleDateString();
  detailsVisibility[dateKey] = !detailsVisibility[dateKey];
};

</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all .5s ease;
}
.slide-enter-from, .slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-enter-to, .slide-leave-from {
  max-height: 300px; 
  opacity: 1;
}
.slide-leave-to {
  opacity: 0;
}
</style>