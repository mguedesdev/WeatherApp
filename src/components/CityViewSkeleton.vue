<template>
  <div class="flex max-w-screen-md flex-col flex-1 m-auto">
    <!-- Overview -->
    <div class="flex sm:flex-row max-w-screen-md flex-col gap-8 sm:py-12 py-7 items-center justify-center">
      <div class="sm:w-[52%] w-full flex flex-col flex-1 sm:ml-8 sm:mr-4 mb-6 sm:mb-0">
        <AnimatedPlaceholder class=" h-[100px] w-full mb-12"/>
        
        <div class="flex flex-row w-full gap-6 justify-center">
          <AnimatedPlaceholder class="h-[100px] w-full mb-8" />
          <AnimatedPlaceholder class="h-[100px] w-full mb-8" />
        </div>
      </div>

      <div class="sm:w-[50%] flex flex-col w-full">
        <AnimatedPlaceholder class="h-[60px] w-full mb-8"/>
        <AnimatedPlaceholder class="h-[60px] w-full mb-8"/>
        <AnimatedPlaceholder class="h-[60px] w-full mb-8"/>
      </div>

    </div>
    
    <!-- Hourly -->
    <div class="flex flex-col py-12 px-8 items-center">
      <AnimatedPlaceholder
        class="h-[100px] w-full mb-12 "
      />
    </div>
    <!-- Weekly -->
    <div class="flex flex-col py-12 px-8 items-center">
      <AnimatedPlaceholder
        class="h-[100px] w-full mb-12"
      />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>