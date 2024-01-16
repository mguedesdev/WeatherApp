<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-row sm:flex-row items-center gap-4 text-white py-6">
      <RouterLink :to="{name: 'home'}">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">The Local Weather</p>
        </div>
      </RouterLink>

      
      <button @click="toggleLanguage">Mudar Idioma</button>
      <h1>{{ $t('welcome_message') }}</h1>
      <div class="flex gap-3 flex-1 justify-end">
        <img 
          @click="toggleLanguage" 
          class="cursor-pointer w-7 h-auto" 
          :src="currentLanguage !== 'en' ? 'src/assets/brFlag.png' : 'src/assets/usaFlag.png'"
        />
        <i 
        class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        @click="toggleModal"></i>
        <i
        class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        @click="addCity"
        v-if="route.query.preview"></i>
      </div>

      <BaseModal :modalActive="modalActive" @close-modal="toggleModal"> 
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and
            future weather of cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the
              search bar.
            </li>
            <li>
              Select a city within the results, this will take
              you to the current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the
              top right. This will save the city to view at a
              later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select
            the city within the home page. At the bottom of the
            page, there will be am option to delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
    
  </header>
</template>

<script setup>
  import { RouterLink, useRoute, useRouter } from "vue-router";
  import { uid } from "uid";
  import { ref } from "vue";
  import { useStore } from 'vuex';
  import { computed } from 'vue';
  import BaseModal from "./BaseModal.vue";

  const route = useRoute();
  const router = useRouter();

  const modalActive = ref(false);

  const savedCities = ref([]);
  const addCity = () => {
    if(localStorage.getItem('savedCities')) {
      savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
    }
    if (route && route.params) {
      const locationObj = {
        id: uid(),
        state: route.params.state,
        city: route.params.city,
        coords: {
          lat: route.query.lat,
          lng: route.query.lng
        }
      }
      savedCities.value.push(locationObj);
      localStorage.setItem('savedCities', JSON.stringify(savedCities.value));

      let query = Object.assign({}, route.query);
      delete query.preview;
      query.id = locationObj.id;
      router.replace({query});
    }
  }

  const toggleModal = () => {
    modalActive.value = !modalActive.value;
  }

  import { useI18n } from 'vue-i18n';
  const { t, locale } = useI18n();
  const store = useStore();
  let currentLanguage = 'ptBr';
  console.log(currentLanguage)

  const toggleLanguage = () => {
    currentLanguage = store.state.language;
    if (currentLanguage === 'en') {
      store.commit('SET_LANGUAGE', 'ptBr');
      store.commit('SET_UNIT', 'metric');
      locale.value = 'ptBr'; 
    } else {
      store.commit('SET_LANGUAGE', 'en');
      store.commit('SET_UNIT', 'imperial');
      locale.value = 'en'; 
    }
    console.log(currentLanguage)
  };

</script>

