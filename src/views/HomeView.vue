<template>
  <main class=" container text-white">
    <div class=" pt-4 mb-8 relative">
      <input 
      type="text"
      v-model="serachQuery"
      @input="getSearchRsults"
      placeholder="Search for a city or state"
      class=" py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0#004E71]"
      >
      <ul 
      class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      v-if="mapboxSearchResults"
      >
        <p v-if="searchError">
          Sorry, something went wrong, please try again.
        </p>
        <p v-if="mapboxSearchResults.length === 0">
          No results match your search, try a different city or state.
        </p>
        <template v-else>
          <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id"
          class="py-2 cursor-pointer hover:bg-weather-primary duration-100"
          >
            {{searchResult.place_name}}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
  import {ref} from 'vue'
  import axios from 'axios'

  const serachQuery = ref('');
  const queryTimeout = ref(null);
  const mapboxSearchResults = ref(null);
  const mapboxAPIKey = "pk.eyJ1IjoibWd1ZWRlc2RldiIsImEiOiJjbHF5MHg2YWowam44MmtsY296emIxOHp3In0.c-0Fm4ifUJ-ZS4Y2VCHa3Q";
  const searchError = ref(null);

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
</script>
