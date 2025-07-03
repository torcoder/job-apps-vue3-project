<template>
  <header class="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
    <div class="container !mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="bg-primary-500 p-2 rounded-lg">
            <font-awesome-icon @click="goHome" :icon="['fas', 'briefcase']" class="cursor-pointer" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer" @click="goHome">FindJob</h1>
            <p class="text-sm text-gray-600 dark:text-gray-400">Find your dream job</p>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <button v-if="showBackButton" @click="$emit('back')"
            class="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">
            <i class="fas fa-arrow-left mr-2"></i>
            Go Back
          </button>

          <button @click="toggleTheme"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <i v-if="!isDark" class="fas fa-moon text-gray-600"></i>
            <i v-else class="fas fa-sun text-yellow-400"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme';
const { isDark, toggleTheme } = useTheme();
const router = useRouter()
defineProps({
  showBackButton: {
    type: Boolean,
    default: false
  }
})

defineEmits(['back'])

const goHome = () => {
  router.push('/')
}

watch(isDark, (val) => {
  console.log('val', val)
})
</script>
