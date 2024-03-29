<template>
  <div class="max-w-screen-md w-full sm:py-10 py-0">
    <div class="mx-8 text-white">
      <h2 class="mb-4 text-lg">{{ $t('Week Weather') }}</h2>
      <template v-for="(day, index) in weatherData.daily" :key="day.dt">

        <div
          v-if="index > 0"
          :class="{ 'hover:bg-weather-secondary duration-200 hover:bg-opacity-25 flex items-center border-t border-white border-opacity-10 cursor-pointer': true,
          'border-b': index === weatherData.daily.length - 1}"
          @click="toggleDetails(day)"
        >

          <p class="flex-1 capitalize">{{ formatDay(day.dt) }} </p>

          <div class="flex justify-start items-center">
            <img
              class="w-[50px] h-[50px] object-cover"
              :src="
                `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
              "
              alt=""
            />
            <p class="hidden md:block capitalize">
              {{ day.weather[0].description }}
            </p>
          </div>
          <div class="flex gap-2 flex-1 justify-end">
            <p class=""><i class=" text-[17px] text-red-500 fa-solid fa-up-long"></i> {{ Math.round(day.temp.max) }}&deg;</p>
            <p class=""><i class=" text-[17px] text-blue-500 fa-solid fa-down-long"></i> {{ Math.round(day.temp.min) }}&deg;</p>
          </div>
        </div>
        
        <transition name="slide">
          <div
          v-if="detailsVisibility[new Date(day.dt * 1000).toLocaleDateString()]" 
          class=" bg-weather-secondary overflow-hidden"
          >
          <div class="flex flex-1 bg-weather-secondary m-5 flex-col overflow-hidden">
            <div class="flex justify-between items-center">
              <p class="text-lg">{{ $t('details') }}</p>
              
            </div>
            <div class="flex flex-col gap-2 mt-4 ">
              <div class="flex justify-between border-b border-white border-opacity-10">
                <p>{{ $t('humidity') }}</p>
                <p>{{ day.humidity }}%</p>
              </div>
              <div class="flex justify-between border-b border-white border-opacity-10">
                <p>{{ $t('pressure') }}</p>
                <p>{{ day.pressure }} hPa</p>
              </div>
              <div class="flex justify-between border-b border-white border-opacity-10">
                <p>{{ $t('wind') }}</p>
                <p>{{ day.wind_speed }} m/s</p>
              </div>
              <div class="flex justify-between border-b border-white border-opacity-10">
                <p>{{ $t('clouds') }}</p>
                <p>{{ day.clouds }}%</p>
              </div>
              <div class="flex justify-between border-b border-white border-opacity-10">
                <p>{{ $t('uv_index') }}</p>
                <p>{{ day.uvi }}</p>
              </div>
              <div class="flex justify-between border-b border-white border-opacity-10">
                <p>{{ $t('sunrise') }}</p>
                <p>{{ formatHour(day.sunrise) }}</p>
              </div>
              <div class="flex justify-between border-b border-white border-opacity-10">
                <p>{{ $t('sunset') }}</p>
                <p>{{ formatHour(day.sunset) }}</p>
              </div>
            </div>
            </div>
          </div>
        </transition>
      </template>
      </div>
  </div>
</template>

<script setup>
import { defineProps, reactive, onMounted} from "vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps({
  weatherData: {
    type: Object,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
});

const detailsVisibility = reactive({});

const toggleDetails = (day) => {
  const dateKey = new Date(day.dt * 1000).toLocaleDateString();
  detailsVisibility[dateKey] = !detailsVisibility[dateKey];
};

const formatDay = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString(
    props.lang === "en" ? "en-US" : "pt-BR",
    {
      weekday: "long",
    }
  );
};

const formatHour = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString(
    props.lang === "en" ? "en-US" : "pt-BR",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};

onMounted(() => {
  console.log(props.weatherData);
});

</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all .5s ease;
}
.slide-enter-from, .slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-enter-to, .slide-leave-from {
  max-height: 300px; 
  opacity: 1;
}
.slide-leave-to {
  opacity: 0;
}
</style>