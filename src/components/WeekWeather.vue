<template>
  <div class="max-w-screen-md w-full py-12">
    <div class="mx-8 text-white">
      <h2 class="mb-4">{{ weatherData.title }}</h2>
      <div v-for="day in weatherData.data"
      :key="day.time"
      class="flex  items-center border-y border-white border-opacity-10 "
      >
        <p class="flex-1">{{ day.time }}</p>
        <div class="flex  justify-start items-center">
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="
              `http://openweathermap.org/img/wn/${day.icon}@2x.png`
            "
            alt=""
          />
          <p class="hidden md:block">
            {{ day.description }}
          </p>
        </div>
        <div class="flex gap-2 flex-1 justify-end">
          <p class="">H: {{ Math.round(day.tempMax) }}&deg;</p>
          <p class="">L: {{ Math.round(day.tempMin) }}&deg;</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeekWeather',
  props: {
    weatherData: {
      type: Object,
      required: true,
    },
  },

}
</script>

<style>

</style>