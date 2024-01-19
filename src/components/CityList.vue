<template>
  <h1 v-if="savedCities.length > 0" class="text-xs mb-1">{{ $t('saved_locations') }}</h1> 
  <div v-for="city in savedCities" :key="city.id" class="">
    <CityCard :city="city" @click="goToCityView(city)"/>
  </div>

  <p v-if="savedCities.length === 0">
    {{ $t('no_locations_added') }}
  </p>
</template>

<script setup>
  import axios from 'axios';
  import CityCard from './CityCard.vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { ref, watch, onMounted, defineEmits  } from 'vue';

  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const router = useRouter();
  const store = useStore();
  const savedCities = ref([]);
  const weatherData = ref([]);
  const isLoading = ref(false);

  const emit = defineEmits(['update:isLoading']);

  const getCities = async () => {
    isLoading.value = true;
    emit('update:isLoading', true);
    if(localStorage.getItem('savedCities')){
      const savedCitiesData = localStorage.getItem('savedCities');
      if (savedCitiesData) {
        savedCities.value = JSON.parse(savedCitiesData);
      }
    }

    const APIKey = '7efa332cf48aeb9d2d391a51027f1a71';
    const requests = [];
    const state = store.state;
    const units = state.unit;
    const lang = state.language === 'en' ? 'en' : 'pt_br'

    savedCities.value.forEach(city =>  {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${APIKey}&units=${units}&lang=${lang}`
        ));
    });

    const responses = await Promise.all(requests);
    if (Array.isArray(responses)) {
      weatherData.value = responses.map(response => response.data);
    }

    if (Array.isArray(weatherData.value)) {
      weatherData.value.forEach((value, index) => {
        if (savedCities.value[index]) {
          savedCities.value[index].weather = value;
        }
      });
    }
    isLoading.value = false;
    emit('update:isLoading', false);
  }

  watch(
    () => [store.state.language, store.state.unit], 
    async () => {
      weatherData.value = await getCities();
    }, 
    { immediate: true }
  );

  onMounted(async () => {
    await getCities();
  });

  const goToCityView = (city) => {
    router.push({
      name: 'cityView',
      params: {
        city: city.city,
        state: city.state
      },
      query: {
        lat: city.coords.lat,
        lng: city.coords.lng,
        id: city.id
      }
    })
  }
  
</script>
