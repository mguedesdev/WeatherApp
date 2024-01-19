<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg z-10">
    <nav class="container flex flex-row sm:flex-row items-center gap-4 text-white py-6">
      <RouterLink :to="{name: 'home'}">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="sm:text-2xl text-xl">The Local Weather</p>
        </div>
      </RouterLink>
      
      <!-- <h1>{{ $t('welcome_message') }}</h1> -->
      <div class="flex gap-3 flex-1 justify-end">
        <img 
          @click="toggleLanguage" 
          class="cursor-pointer w-7 h-auto" 
          :src="flagImagePath"
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
          <h1 class="text-2xl mb-1">{{ $t('about_title') }}</h1>
          <p class="mb-4">
            {{ $t('about_description') }}
          </p>
          <h2 class="text-2xl">{{ $t('how_it_works') }}</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              {{ $t('search_city') }}
            </li>
            <li>
              {{ $t('select_city') }}
            </li>
            <li>
              {{ $t('track_city') }}
            </li>
          </ol>

          <h2 class="text-2xl">{{ $t('removing_city') }}</h2>
          <p>
            {{ $t('remove_city_description') }}
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
  import brFlag from '@/assets/brFlag.png';
  import usaFlag from '@/assets/usaFlag.png';

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
      store.commit('SET_LANGUAGE', 'pt_br');
      store.commit('SET_UNIT', 'metric');
      locale.value = 'pt_br'; 
    } else {
      store.commit('SET_LANGUAGE', 'en');
      store.commit('SET_UNIT', 'imperial');
      locale.value = 'en'; 
    }
    console.log(currentLanguage)
  };

  const flagImagePath = computed(() => {
    return store.state.language === 'en' ? brFlag : usaFlag;
  });

</script>

