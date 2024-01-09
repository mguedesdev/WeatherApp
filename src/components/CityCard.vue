<template>
  <div
    class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer"
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

<script setup>
  defineProps({
    city: {
      type: Object,
      default: () => {}
    }
  })

  
</script>