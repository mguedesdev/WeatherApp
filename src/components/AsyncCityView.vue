<template>
  <div class=" flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div v-if="route.query.preview" class=" text-white p-4 bg-weather-secondary w-full text-center">
      <p>
        You are currently previewing this city, click the "+" icon to start tracking this city.
      </p>
    </div>
    <!-- Weather Overview -->
    <!-- <div class="flex flex-col items-center">
      <h1 class="text-4xl font-bold">{{ weatherData.data.timezone }}</h1>
      <p class="text-xl">{{ new Date(weatherData.data.currentTime).toLocaleString() }}</p>
      <p class="text-6xl font-bold">{{ Math.round(weatherData.data.current.temp) }}°</p>
      <p class="text-xl">{{ weatherData.data.current.weather[0].description }}</p>
    </div> -->
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
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly Weather</h2>
          <div class="flex gap-10 overflow-x-scroll scrollbar scrollbar-thumb-weather-secondary scrollbar-track-gray-800 ">
          <div v-for="hourData in weatherData.hourly"
          :key="hourData.dt"
          class="flex flex-col gap-4 items-center text-center mb-2"
          >
            <!-- <p class="text-sm">
              {{
                new Date(hourData.currentTime).toLocaleTimeString(
                  "en-us",
                  {
                    timeStyle: "short",
                  }
                )
              }}
            </p>
            <img
              class="w-[50px] h-auto"
              :src="
                `http://openweathermap.org/img/wn/${hourData.weather[0].icon}.png`
              "
              alt=""
            />
            <p class="text-sm">
              {{ Math.round(hourData.temp) }}&deg;
            </p> -->
            <p class="whitespace-nowrap text-md">
              {{
                new Date(
                  hourData.currentTime
                ).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="
                `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`
              "
              alt=""
            />
            <p class="text-xl">
              {{ Math.round(hourData.temp) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import { useRoute } from 'vue-router';

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
  console.log(weatherData);
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
