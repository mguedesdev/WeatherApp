<template>
  <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">{{weatherData.title}}</h2>
          <div class="flex gap-10 space-x-1 overflow-x-scroll scrollbar scrollbar-thumb-weather-secondary scrollbar-track-gray-800 ">
          <div v-for="weather in weatherData.data"
          :key="weather.time"
          class="flex flex-col gap-4 items-center text-center mb-2"
          >
            <p class="whitespace-nowrap text-md">
              {{weather.time}}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="
                `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
              "
              alt=""
            />
            <p class="text-xl">
              {{ Math.round(weather.temp) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
 export default {
   props: {
     weatherData: {
       type: Object,
       required: true,
     },
   },
 };

</script>

<style scoped>
  .scrollbar {
    scrollbar-width: thin;
  }
  .scrollbar::-webkit-scrollbar {
    width: 4px;
    height: 10px;
  }
</style>