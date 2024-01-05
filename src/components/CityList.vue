<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)"/>
  </div>

  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in
    the field above.
  </p>
</template>

<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import CityCard from './CityCard.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const savedCities = ref([]);

  const getCities = async () => {
    if(localStorage.getItem('savedCities')){
      savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
    }

    const APIKey = '7efa332cf48aeb9d2d391a51027f1a71';
    const requests = [];

    savedCities.value.forEach(city =>  {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${APIKey}&units=imperial`
        ));
    });
     
    const weatherData = await Promise.all(requests);

    await new Promise((res) => setTimeout(res, 1000));
    
    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });

    console.log(weatherData);
  }

  await getCities();
  console.log(savedCities)

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