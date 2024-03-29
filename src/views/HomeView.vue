<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input 
        type="text"
        v-model="serachQuery"
        @input="getSearchRsults"
        :placeholder="$t('search_placeholder')"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0#004E71]"
      >
      <ul 
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults"
      >
        <p v-if="searchError">
          {{ $t('search_error') }}
        </p>
        <p v-if="mapboxSearchResults.length === 0">
          {{ $t('no_results') }}
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer hover:bg-weather-primary duration-100"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    
      <Transition name="main" mode="out-in">
        <div v-if="isLoading && isLoadingCity" class="flex flex-col gap-4">
          <!-- <CityCardSkeleton />
          <CityCardSkeleton />
          <CityCardSkeleton /> -->
        </div>
      </Transition>
      <Transition name="main" mode="out-in">
        <Suspense>
          <div v-show="!isLoading && !isLoadingCity">

              <CurrentLocation v-if="hasGeoPermission" :coords="coords" @update:isLoading="handleLoadingComplete"/>

              <CityList @update:isLoading="handleLoadingCityComplete" />

          </div>
        </Suspense>
      </Transition>
    
  </main>
</template>

<script setup>
  import {ref, onMounted} from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  import CityList from '@/components/CityList.vue';
  import CurrentLocation from '@/components/CurrentLocation.vue';

  import { useI18n } from 'vue-i18n';
  import CityCardSkeleton from '@/components/CityCardSkeleton.vue';

  const { t } = useI18n();

  const serachQuery = ref('');
  const queryTimeout = ref(null);
  const mapboxSearchResults = ref(null);
  const mapboxAPIKey = "pk.eyJ1IjoibWd1ZWRlc2RldiIsImEiOiJjbHF5MHg2YWowam44MmtsY296emIxOHp3In0.c-0Fm4ifUJ-ZS4Y2VCHa3Q";
  const searchError = ref(null);

  const router = useRouter();

  const previewCity = (searchResult) => {
    const [city, state] = searchResult.place_name.split(', ');
    let savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];
    let cityExists = savedCities.some(savedCity => savedCity.city === city && savedCity.state === state.replaceAll(' ', ''));

    let query = {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0]
    };

    if (!cityExists) {
      query.preview = true;
    }

    router.push({
      name: 'cityView',
      params: {
        city,
        state: state.replaceAll(' ', '')
      },
      query
    })
  }

  const getSearchRsults = () => {
    clearTimeout(queryTimeout.value);
    queryTimeout.value = setTimeout(async () => {
      if(serachQuery.value.length > 2 && serachQuery.value !== '') {
        try {
          const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${serachQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
          )
          mapboxSearchResults.value = result.data.features;
        }
        catch (error) {
          searchError.value = true;
        }
    
        return;
      }
      mapboxSearchResults.value = null;
    }, 300);
  }

  const hasGeoPermission = ref(false);
  const coords = ref(null);

  const getGeolocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( async (position) => {
        const { latitude, longitude } = position.coords;
        coords.value = {lat: latitude, lng: longitude};
        hasGeoPermission.value = true;
      }, (error) => {
        console.log(error);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  getGeolocation();

  const isLoading = ref(true);
  const isLoadingCity = ref(true);

  const handleLoadingComplete = (value) => {
    isLoading.value = value;
    console.log(isLoading.value);
  }

  const handleLoadingCityComplete = (value) => {
    isLoadingCity.value = value;
  }

</script>


<style scoped>
  .main-enter-active,
  .main-leave-active {
    transition: 0.3s ease all;
  }

  .main-enter-from,
  .main-leave-to {
    opacity: 0;
  }
</style>