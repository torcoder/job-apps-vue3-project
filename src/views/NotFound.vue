<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-900 dark:bg-black text-white">
    <h1 class="text-9xl font-extrabold text-blue-600 dark:text-blue-400 tracking-widest">404</h1>
    <div class="bg-gray-700 dark:bg-gray-800 px-2 text-sm rounded rotate-12 absolute">
      Page Not Found!
    </div>
    <button class="mt-5">
      <router-link to="/"
        class="relative inline-block text-sm font-medium text-blue-600 dark:text-blue-400 group active:text-blue-500 dark:active:text-blue-300 focus:outline-none focus:ring">
        <span
          class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-blue-600 dark:bg-blue-700 group-hover:translate-y-0 group-hover:translate-x-0"
          style="mix-blend-mode: multiply;"></span>
        <span class="relative block px-8 py-3 text-white bg-gray-800 dark:bg-gray-900 border border-current">
          Return Homepage
        </span></router-link>
    </button>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
