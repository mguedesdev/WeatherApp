<template>
  <div class=" flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div v-if="route.query.preview" class=" text-white p-4 bg-weather-secondary w-full text-center">
      <p>
        You are currently previewing this city, click the "+" icon to start tracking this city.
      </p>
    </div>
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString(
            "en-us",
            {
              weekday: "short",
              day: "2-digit",
              month: "long",
            }
          )
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString(
            "en-us",
            {
              timeStyle: "short",
            }
          )
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.current.temp) }}&deg;
      </p>
      <p>
        Feels like
        {{ Math.round(weatherData.current.feels_like) }} &deg;
      </p>
      <p class="capitalize">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img
        class="w-[150px] h-auto"
        :src="
          `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
        "
        alt=""
      />
      
    </div>
    <hr class=" border-white border-opacity-10 border w-full">
    <!-- Hourly Weather -->
    <HourlyWeather :weatherData="hourlyWeather" />
    <!-- Daily Weather -->
    <WeekWeather :weatherData="weekWeather" />
    
    <div
      v-if="!route.query.preview"
      class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
      @click="removeCity">
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
    </div>
  </div>

</template>

<script setup>
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import HourlyWeather from './HourlyWeather.vue';
  import WeekWeather from './WeekWeather.vue';

  const route = useRoute();
  const getWeatherData = async () => {
    const APIKey = '7efa332cf48aeb9d2d391a51027f1a71';
    try { 
      const weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${APIKey}&units=imperial`
      );

       // cal current date & time
      const localOffset = new Date().getTimezoneOffset() * 60000;
      const utc = weatherData.data.current.dt * 1000 + localOffset;
      weatherData.data.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;

      // cal hourly weather offset
      weatherData.data.hourly.forEach((hour) => {
        const utc = hour.dt * 1000 + localOffset;
        hour.currentTime =
          utc + 1000 * weatherData.data.timezone_offset;
      });
      
      return weatherData.data;
    } catch(err) {
      console.log(err);
    }
    
  }
  const weatherData = await getWeatherData();

  const hourlyWeather = {
    title: 'Hourly Weather',
    data: weatherData.hourly.map((hour) => {
      return {
        time: new Date(hour.currentTime).toLocaleTimeString(
          "en-us",
          {
            hour: "numeric",
          }
        ),
        temp: Math.round(hour.temp),
        feelsLike: Math.round(hour.feels_like),
        description: hour.weather[0].description,
        icon: hour.weather[0].icon,
      };
    }),
  }

  const weekWeather = {
    title: 'Daily Weather',
    data: weatherData.daily.map((day) => {
      return {
        time: new Date(day.dt * 1000).toLocaleDateString(
          "en-us",
          {
            weekday: "long",
          }
        ),
        temp: Math.round(day.temp.max),
        tempMin: Math.round(day.temp.min),
        tempMax: Math.round(day.temp.max),
        feelsLike: Math.round(day.feels_like.day),
        description: day.weather[0].description,
        icon: day.weather[0].icon,

      };
    }),
  }
  
  const router = useRouter();
  const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem('savedCities'));
    const newCities = cities.filter(city => city.id !== route.query.id);
    localStorage.setItem('savedCities', JSON.stringify(newCities));
    router.push({name: 'home'});

  }

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
