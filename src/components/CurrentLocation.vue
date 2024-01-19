<template>
  <Transition name="main" mode="out-in">
    <template v-if="!weatherData || !weatherData.data">
      <div class="w-full">
        <CityCardSkeleton />
      </div>
    </template>
    <template v-else>
      <div @click="goToCityView" class="flex flex-col w-full cursor-pointer mb-6">
        <h1 class="text-xs mb-1">{{ $t('current_location') }}</h1> 
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

          <div v-if="descriptionAlerts" class="flex flex-col border-t-2 border-white border-opacity-10 mt-2">
            <p class="mt-3">{{ $t('alerts') }}</p>
            <p class="text-xs" v-html="descriptionAlerts"></p>
          </div>
        </div>
      </div> 
    </template> 
  </Transition>
</template>

<script setup>
  import { defineProps, ref, watchEffect, watch, defineEmits } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { useI18n } from 'vue-i18n';
  import CityCardSkeleton from './CityCardSkeleton.vue';
  

  const { t } = useI18n();
  const store = useStore();
  const router = useRouter();

  const weatherData = ref(null);
  const weatherDataFull = ref(null);
  let descriptionAlerts = ref(null);
  const isLoading = ref(false);
  const emit = defineEmits(['update:isLoading']);

  const props = defineProps(['coords'])

  const getCurrentCityWeather = async (coords) => {
    emit('update:isLoading', true);
    isLoading.value = true;

    if (!coords) {
      console.error('coords is null or undefined');
      return;
    }

    const APIKey = '7efa332cf48aeb9d2d391a51027f1a71';
    const state = store.state;
    const units = state.unit;
    const lang = state.language === 'en' ? 'en' : 'pt_br'
    try {
      weatherData.value = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${APIKey}&units=${units}&lang=${lang}`
      );

      weatherDataFull.value = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&appid=${APIKey}&units=${units}&lang=${lang}`
      );

      if (weatherDataFull.value.data.alerts && weatherDataFull.value.data.alerts[0]) {
        let description = weatherDataFull.value.data.alerts[0].description;
        let sentences = description.split('.');
        sentences.shift(); 
        descriptionAlerts.value = sentences.join('.<br/>');
      }
      emit('update:isLoading', false);
    } catch (error) {
      console.log(error);
      emit('update:isLoading', false);
      isLoading.value = false;

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

  watch(
    () => [store.state.language, store.state.unit, props.coords, getCurrentCityWeather,], 
    async () => {
      await getCurrentCityWeather(props.coords);
      
    }, 
    { immediate: true }
  );

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