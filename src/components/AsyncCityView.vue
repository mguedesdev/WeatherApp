<template>
  <transition name="page" mode="out-in">
    <template v-if="isLoading">
      <CityViewSkeleton  />
    </template>
    <template v-else>
      <div key="content" class=" flex flex-col flex-1 items-center">
        <!-- Banner -->
        <div v-if="route.query.preview" class=" text-white p-4 bg-weather-secondary w-full text-center">
          <p>
            {{ $t('preview_city_message')}}
          </p>
        </div>
        <div class="flex sm:flex-row flex-col max-w-screen-md w-full text-white sm:py-12 py-7 ">
          <!-- Current Weather -->
          <div class="sm:w-[50%] w-full flex flex-col flex-1 items-center sm:ml-8 sm:mr-4 mb-6 sm:mb-0">
            <div  class="flex flex-col flex-1 items-center">
              <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
              <p class="text-sm mb-4">
                {{ formatDateTime(weatherData.currentTime) }}
              </p>
            </div>
            <div class="flex gap-6">
              
              <div class="flex flex-col flex-1 items-center"> 
                <p class="text-7xl flex flex-1 mt-6 justify-center text-center">
                  {{ Math.round(weatherData.current.temp) }}&deg;
                </p>
                <p class="flex justify-center">
                  {{ $t('feels_like') }}
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

          <div class="sm:w-[53%] w-full flex flex-col sm:border-l border-gray-400 sm:pl-6 px-8 gap-5">
            <p>{{ $t('todays_highlights') }}</p>
            <div class="flex flex-1 border-b border-white border-opacity-10 items-center pb-2">
              <div class="flex flex-1 items-center flex-col">
                <p class="text-xl flex items-center gap-1">
                  <i class="text-xs text-blue-500 fa-solid fa-down-long"></i>
                  {{ Math.round(weatherData.daily[0].temp.min) }}&deg;
                </p>
                <p class="sm:text-sm text-xs">{{ $t('min') }}</p>
              </div>
              <div class="flex flex-1 items-center flex-col">
                <p class="text-xl flex items-center gap-1">
                  <i class="text-xs text-red-500 fa-solid fa-up-long"></i>
                    {{ Math.round(weatherData.daily[0].temp.max) }}&deg;
                </p>
                <p class="sm:text-sm text-xs">{{ $t('max') }}</p>
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
                  <p class="sm:text-sm text-xs">{{ $t('sunrise') }}</p></div>
                  
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
                  <p class="sm:text-sm text-xs">{{ $t('sunset') }}</p></div>
                  
                </div>
                </div>

            </div>

            <div class="flex flex-1 border-b border-white border-opacity-10 items-center pb-2">
              <div class="flex flex-col flex-1 items-center">
                <p class="text-xl">
                  {{ Math.round(weatherData.daily[0].temp.morn) }}&deg;
                </p>
                <p class="sm:text-sm text-xs">{{ $t('morning') }}</p>
              </div>
              <div class="flex flex-col flex-1 items-center">
                <p class="text-xl">
                  {{ Math.round(weatherData.daily[0].temp.day) }}&deg;
                </p>
                <p class="sm:text-sm text-xs">{{ $t('day') }}</p>
              </div>
              <div class="flex flex-col flex-1 items-center">
                <p class="text-xl">
                  {{ Math.round(weatherData.daily[0].temp.eve) }}&deg;
                </p>
                <p class="sm:text-sm text-xs">{{ $t('evening') }}</p>
              </div>
              <div class="flex flex-col flex-1 items-center">
                <p class="text-xl">
                  {{ Math.round(weatherData.daily[0].temp.night) }}&deg;
                </p>
                <p class="sm:text-sm text-xs">{{ $t('night') }}</p>
              </div>
              
            </div>
            <div class="flex flex-1 items-center pb-2">

              <div v-if="weatherData.daily[0].pop || weatherData.daily[0].pop > -1" class="flex flex-col flex-1 items-center">
                <p class="text-xl">
                  {{ Math.round(weatherData.daily[0].pop * 100) }}%
                </p>
                <p class="sm:text-sm text-xs text-center">{{ $t('chance_rain') }}</p>
              </div>

              <div class="flex flex-col flex-1 items-center">
                <p class="text-xl">
                  {{ Math.round(weatherData.daily[0].clouds) }}%
                </p>
                <p class="sm:text-sm text-xs">{{ $t('clouds') }}</p>
              </div>

              <div class="flex flex-col flex-1 items-center">
                  <p class="text-xl">
                    {{ Math.round(weatherData.daily[0].humidity) }}%
                  </p>
                  <p class="sm:text-sm text-xs">{{ $t('humidity') }}</p>
              </div>
              <div class="flex flex-col flex-1 items-center">
                <div class="flex items-center gap-1">
                  <p class="text-xl">
                  {{ Math.round(weatherData.daily[0].wind_speed) }} 
                </p>
                <p class="sm:text-sm text-xs">mph</p>
                </div>
                <p class="sm:text-sm text-xs">{{ $t('wind') }}</p>
              </div>
            </div>
          </div>
          
        </div>
        <hr class=" border-white border-opacity-10 border w-full">
        <!-- Hourly Weather -->
        <HourlyWeather v-if="weatherData" :weatherData="hourlyWeather" />
        <!-- Daily Weather -->
        <WeekWeather v-if="weatherData" :weatherData="weatherData" :lang="store.state.language" />
        
        <div
          v-if="!route.query.preview"
          class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
          @click="removeCity">
          <i class="fa-solid fa-trash"></i>
          <p>{{ $t('remove_city') }}</p>
        </div>
      </div>
    </template>
  </transition>
</template>

<script setup>
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import HourlyWeather from './HourlyWeather.vue';
  import WeekWeather from './WeekWeather.vue';
  import { ref, onMounted, watch } from 'vue';

  import { useStore } from 'vuex';
  import { useI18n } from 'vue-i18n';
  import CityViewSkeleton from './CityViewSkeleton.vue';

  const { t } = useI18n();
  const route = useRoute();
  const store = useStore();

  const hourlyWeather = ref(null);
  const weatherData = ref(null);
  const router = useRouter();
  const isLoading = ref(true);

  const getWeatherData = async () => {
    isLoading.value = true;
    const state = store.state;
    const units = state.unit;
    const lang = state.language === 'en' ? 'en' : 'pt_br'
    const APIKey = '7efa332cf48aeb9d2d391a51027f1a71';

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${APIKey}&units=${units}&lang=${lang}`;

    try { 
      const weatherData = await axios.get(url);

      const localOffset = new Date().getTimezoneOffset() * 60000;
      const utc = weatherData.data.current.dt * 1000 + localOffset;
      weatherData.data.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;

      weatherData.data.hourly.forEach((hour) => {
        const utc = hour.dt * 1000 + localOffset;
        hour.currentTime =
          utc + 1000 * weatherData.data.timezone_offset;
      });
      return weatherData.data;
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(async () => {
        isLoading.value = false;
      }, 100);
    }
  }

  onMounted(async () => {
    isLoading.value = true;
    weatherData.value = await getWeatherData();
    isLoading.value = false;
  });

  watch(
    () => [store.state.language, store.state.unit], 
    async () => {
      weatherData.value = await getWeatherData();
    }, 
    { immediate: true }
  );

  watch(weatherData, (newWeatherData) => {
    if(newWeatherData && newWeatherData.hourly && newWeatherData.daily) {
      
      hourlyWeather.value = {
        data: newWeatherData.hourly.map((hour) => {
          let options;
          if (store.state.language === "en") {
            options = { hour: "2-digit" };
          } else {
            options = { hour: "2-digit", minute: "2-digit" };
          }
          return {
            time: new Date(hour.currentTime).toLocaleTimeString(
              store.state.language === "en" ? "en-US" : "pt-BR",
              options
            ),
            temp: Math.round(hour.temp),
            feelsLike: Math.round(hour.feels_like),
            description: hour.weather[0].description,
            icon: hour.weather[0].icon,
          };
        }),
      };
    }
  });

  
  const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem('savedCities'));
    const newCities = cities.filter(city => city.id !== route.query.id);
    localStorage.setItem('savedCities', JSON.stringify(newCities));
    router.push({name: 'home'});

  }

  const formatDateTime = (timestamp) => {
    if (!timestamp) {
      return '';
    }

    const date = new Date(timestamp);

    const options = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
    };

    return date.toLocaleDateString(store.state.language === "en" ? "en-US" : "pt-BR", options);
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

  .page-enter-active,
  .page-leave-active {
    transition: 0.4s ease all;

  }

  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }
  
</style>


