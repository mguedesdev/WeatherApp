<template>
  <Transition name="main" mode="out-in">
    <template v-if="!city.weather">
      <CityCardSkeleton />
    </template>
    <template v-else>
      <div
        class="flex py-6 px-3 bg-weather-secondary hover:bg-[#3D5476] duration-150 rounded-md shadow-md cursor-pointer mb-4"
      >
        <div class="flex flex-col flex-1">
          <div class="flex gap-2">
            <h2 class="text-3xl">{{ city.city }} </h2>
            <img
              class="w-[30px] h-auto"
              :src="`http://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`"
            />
          </div>
          <h3>{{ city.state }}</h3>
        </div>

        <div class="flex flex-col gap-2">
          <p class="text-3xl self-end">
            {{ Math.round(city.weather.main.temp) }}&deg;
          </p>
          <div class="flex gap-2 flex-1 justify-end">
            <p class=""><i class=" text-xs text-red-500 fa-solid fa-up-long"></i> {{ Math.round(city.weather.main.temp_max) }}&deg;</p>
            <p class=""><i class=" text-xs text-blue-500 fa-solid fa-down-long"></i> {{ Math.round(city.weather.main.temp_min) }}&deg;</p>
          </div>
        </div>
      </div>
    </template>
  </Transition>
</template>

<script setup>
  import { defineProps } from 'vue'
  import CityCardSkeleton from './CityCardSkeleton.vue';
  defineProps({
    city: {
      type: Object,
      default: () => {}
    }
  })

</script>

<style scoped>
  .main-enter-active,
  .main-leave-active {
    transition: 0.5s ease all;
  }

  .main-enter-from,
  .main-leave-to {
    opacity: 0;
  }
</style>