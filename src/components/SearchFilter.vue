<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
    <!-- Ana Arama -->
    <div class="mb-6">
      <div class="flex flex-col md:flex-row gap-4 items-end">
        <div class="flex-1">
          <label for="cars">Search position:</label>
          <input v-model="searchQuery" @keydown="handleKeydown" type="text" placeholder="İş pozisyonu, şirket adı..."
            class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div class="flex-1">
          <label for="cars">Choose a location:</label>
          <select v-model="locationQuery" name="cars" id="cars" form="carform"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Seçiniz</option>
            <option v-for="location in locations" :value="location">{{ location }}</option>
          </select>
        </div>
        <button @click="handleSearch" class=" px-4 h-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors
          flex items-center">
          <i class="fas fa-search mr-2"></i>
          Search
        </button>

      </div>
    </div>

    <div class="border-t border-gray-200 dark:border-gray-600 pt-6">
      <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Categories</h3>

      <div class="mb-6">
        <div class="flex flex-wrap gap-2">
          <button v-for="category in categories" :key="category.id" @click="toggleCategory(category)" :class="[
            'px-4 py-2 rounded-full text-sm transition-colors cursor-pointer',
            selectedCategories.includes(category)
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]">
            {{ category }}
          </button>
        </div>
      </div>
      <button
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 dark:text-red-200 bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400"
        v-if="isFilterActive" @click="clearFilter">
        <svg class="-ml-1 mr-2 h-5 w-5 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
            clip-rule="evenodd" />
        </svg>
        Clear Filter
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { jobStore } from '@/stores/jobs';

const store = jobStore()
const emit = defineEmits(['search', 'filter-change'])

const searchQuery = ref('')
const locationQuery = ref('')
const selectedCategories = ref([])

const toggleCategory = (categoryId) => {
  const index = selectedCategories.value.indexOf(categoryId)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(categoryId)
  }
}

const handleSearch = (event) => {
  emit('search', {
    query: searchQuery.value,
    location: locationQuery.value
  })
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key && event?.key == 'Enter') {
    emit('search', {
      query: searchQuery.value,
      location: locationQuery.value
    })
  }
}

const clearFilter = () => {
  searchQuery.value = "";
  locationQuery.value = "";
  selectedCategories.value = []
  emit('search', {
    query: searchQuery.value,
    location: locationQuery.value
  })
}

const categories = computed(() => store.uniqueCategories)
const locations = computed(() => store.uniqueLocations)
const isFilterActive = computed(() => selectedCategories.value.length || searchQuery.value || locationQuery.value)

watch([selectedCategories], () => {
  emit('filter-change', {
    categories: selectedCategories.value
  })
}, { deep: true })
</script>
