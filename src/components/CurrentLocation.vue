<template>
  <div v-if="weatherData && weatherData.data" @click="goToCityView" class="flex flex-col  w-full cursor-pointer">
    <h1 class="text-xs mb-1">Current Location</h1> 
    <div class="flex flex-col py-6 px-3 bg-weather-secondary hover:bg-[#3D5476] rounded-md cursor-pointer w-full transition-all">

      <div class="flex">
        <div class="flex flex-col flex-1">
          <div class="flex gap-2">
            <h2 class="text-3xl">{{ weatherData.data.name }} </h2>
            <img
              class="w-[30px] h-auto"
              :src="`http://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}@2x.png`"
            />
          </div>
          <h3 class="capitalize">{{ weatherData.data.weather[0].description }}</h3>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-3xl self-end">
            {{ Math.round(weatherData.data.main.temp) }}&deg;
          </p>
          <div v-if="weatherDataFull && weatherDataFull.data" class="flex gap-2 flex-1 justify-end">
            <p class=""><i class="text-xs text-red-500 fa-solid fa-up-long"></i> {{ Math.round(weatherDataFull.data.daily[0].temp.max) }}&deg;</p>
            <p class=""><i class="text-xs text-blue-500 fa-solid fa-down-long"></i> {{ Math.round(weatherDataFull.data.daily[0].temp.min) }}&deg;</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col border-t-2 border-white border-opacity-10 mt-2">
        <p class="mt-3">Alerts</p>
        <p class="text-xs" v-html="descriptionAlerts"></p>
      </div>

    </div>
  </div>  
</template>

<script setup>
  import { defineProps, ref, watchEffect } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const weatherData = ref(null);
  const weatherDataFull = ref(null);
  let descriptionAlerts = ref(null);

  const props = defineProps(['coords'])

  const getCurrentCityWeather = async (coords) => {
    if (!coords) {
      console.error('coords is null or undefined');
      return;
    }

    const APIKey = '7efa332cf48aeb9d2d391a51027f1a71';
    try {
      weatherData.value = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${APIKey}&units=imperial`
      );

      weatherDataFull.value = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&appid=${APIKey}&units=imperial`
      );

      if (weatherDataFull.value.data.alerts && weatherDataFull.value.data.alerts[0]) {
        let description = weatherDataFull.value.data.alerts[0].description;
        let sentences = description.split('.');
        sentences.shift(); // remove first sentence
        descriptionAlerts.value = sentences.join('.<br/>');
      }

      console.log('----------------------------------');
      console.log(weatherDataFull.value);
      console.log('----------------------------------');

    } catch (error) {
      console.log(error);
    }
  }

  const goToCityView = () => {
    router.push({
      name: 'cityView',
      params: {
        city: weatherData.value.data.name,
        state: weatherData.value.data.sys.country
      },
      query: {
        lat: weatherData.value.data.coord.lat,
        lng: weatherData.value.data.coord.lon,
        id: weatherData.value.data.id
      }
    })
  }

  

  watchEffect(() => {
    if (props.coords) {
      getCurrentCityWeather(props.coords);
    }
  });


</script>