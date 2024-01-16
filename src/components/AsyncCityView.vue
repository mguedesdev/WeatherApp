<template>
  <div class=" flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div v-if="route.query.preview" class=" text-white p-4 bg-weather-secondary w-full text-center">
      <p>
        You are currently previewing this city, click the "+" icon to start tracking this city.
      </p>
    </div>
    <div class="flex sm:flex-row flex-col max-w-screen-md w-full text-white sm:py-12 py-7 ">
      <!-- Current Weather -->
      <div class="sm:w-[50%] w-full flex flex-col flex-1 items-center sm:ml-8 sm:mr-4 mb-6 sm:mb-0">
        <div class="flex flex-col flex-1 items-center">
          <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
          <p class="text-sm mb-4">
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
          
          
          
        </div>
        <div class="flex gap-6">
          
          <div class="flex flex-col flex-1 items-center"> 
            <p class="text-7xl flex flex-1 mt-6 justify-center">
              {{ Math.round(weatherData.current.temp) }}&deg;
            </p>
            <p class="flex justify-center">
              Feels like
              {{ Math.round(weatherData.current.feels_like) }} &deg;
            </p>
          </div>

          <div class="flex flex-col flex-1 items-center">
            <img
              class="w-[110px] h-auto justify-center"
              :src="
                `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
              "
              alt=""
            />
            <p class="capitalize text-center justify-center">
              {{ weatherData.current.weather[0].description }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- More infos -->

      <div class="sm:w-[53%] w-full flex flex-col sm:border-l border-gray-400 sm:pl-6 px-8 sm:mr-8 gap-5">
        <p>Today's Highlights</p>
        <div class="flex flex-1 border-b border-white border-opacity-10 items-center pb-2">
          <div class="flex flex-1 items-center flex-col">
            <p class="text-xl flex items-center gap-1">
              <i class="text-xs text-blue-500 fa-solid fa-down-long"></i>
              {{ Math.round(weatherData.daily[0].temp.min) }}&deg;
            </p>
            <p class="sm:text-sm text-xs">Min</p>
          </div>
          <div class="flex flex-1 items-center flex-col">
            <p class="text-xl flex items-center gap-1">
              <i class="text-xs text-red-500 fa-solid fa-up-long"></i>
                {{ Math.round(weatherData.daily[0].temp.max) }}&deg;
            </p>
            <p class="sm:text-sm text-xs">Max</p>
          </div>
          <!-- sunrise -->
          <div class="flex flex-1 items-center flex-col">
            <div class=" flex items-center gap-1">
              
              <div class="flex items-center flex-col">
                <p class="text-xl">{{
                new Date(weatherData.daily[0].sunrise * 1000).toLocaleTimeString(
                  "en-us",
                  {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                  }
                )
              }}
              </p>
              <p class="sm:text-sm text-xs">Sunrise</p></div>
              
            </div>
            </div>
          <!-- sunset -->
          <div class="flex flex-1 items-center flex-col">
            <div class=" flex items-center gap-1">
              
              <div class="flex items-center flex-col">
                <p class="text-xl">{{
                new Date(weatherData.daily[0].sunset * 1000).toLocaleTimeString(
                  "en-us",
                  {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                  }
                )
              }}
              </p>
              <p class="sm:text-sm text-xs">Sunset</p></div>
              
            </div>
            </div>

        </div>

        <div class="flex flex-1 border-b border-white border-opacity-10 items-center pb-2">
          <div class="flex flex-col flex-1 items-center">
            <p class="text-xl">
              {{ Math.round(weatherData.daily[0].temp.morn) }}&deg;
            </p>
            <p class="sm:text-sm text-xs">Morning</p>
          </div>
          <div class="flex flex-col flex-1 items-center">
            <p class="text-xl">
              {{ Math.round(weatherData.daily[0].temp.day) }}&deg;
            </p>
            <p class="sm:text-sm text-xs">Day</p>
          </div>
          <div class="flex flex-col flex-1 items-center">
            <p class="text-xl">
              {{ Math.round(weatherData.daily[0].temp.eve) }}&deg;
            </p>
            <p class="sm:text-sm text-xs">Evening</p>
          </div>
          <div class="flex flex-col flex-1 items-center">
            <p class="text-xl">
              {{ Math.round(weatherData.daily[0].temp.night) }}&deg;
            </p>
            <p class="sm:text-sm text-xs">Night</p>
          </div>
          
        </div>
        <div class="flex flex-1 items-center pb-2">

          <div v-if="weatherData.daily[0].pop || weatherData.daily[0].pop > -1" class="flex flex-col flex-1 items-center">
            <p class="text-xl">
              {{ Math.round(weatherData.daily[0].pop * 100) }}%
            </p>
            <p class="sm:text-sm text-xs text-center">Chance Rain</p>
          </div>

          <div class="flex flex-col flex-1 items-center">
            <p class="text-xl">
              {{ Math.round(weatherData.daily[0].clouds) }}%
            </p>
            <p class="sm:text-sm text-xs">Clouds</p>
          </div>

          <div class="flex flex-col flex-1 items-center">
              <p class="text-xl">
                {{ Math.round(weatherData.daily[0].humidity) }}%
              </p>
              <p class="sm:text-sm text-xs">Humidity</p>
          </div>
          <div class="flex flex-col flex-1 items-center">
            <div class="flex items-center gap-1">
              <p class="text-xl">
              {{ Math.round(weatherData.daily[0].wind_speed) }} 
            </p>
            <p class="sm:text-sm text-xs">mph</p>
            </div>
            <p class="sm:text-sm text-xs">Wind</p>
          </div>
        </div>
      </div>
      
    </div>
    <hr class=" border-white border-opacity-10 border w-full">
    <!-- Hourly Weather -->
    <HourlyWeather :weatherData="hourlyWeather" />
    <!-- Daily Weather -->
    <WeekWeather :weatherData="weatherData" />
    
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

      await new Promise((res) => setTimeout(res, 700));
      
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
  console.log(weatherData);
  const weekWeather = {
    title: 'Week Weather',
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
