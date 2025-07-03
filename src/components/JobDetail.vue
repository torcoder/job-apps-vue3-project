<template>
  <div class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen">
    <Header :show-back-button="true" @back="goBack" />

    <main class="container !mx-auto px-4 py-8">
      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
            <div class="flex items-start space-x-6">
              <div class="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                <i class="fas fa-code text-blue-500 w-8 h-8 flex items-center justify-center text-3xl"></i>
              </div>
              <div class="flex-1">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ job.title }}</h1>
                <p class="text-xl text-blue-600 dark:text-blue-400 font-medium mb-4">{{ job.company }}</p>
                <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span class="flex items-center">
                    <i class="fas fa-map-marker-alt w-4 h-4 mr-2"></i>
                    {{ job.location }}
                  </span>

                  <span class="flex items-center">
                    <i class="fas fa-users w-4 h-4 mr-2"></i>
                    {{ job.fields }}
                  </span>
                  <span class="flex items-center">
                    <i class="fas fa-calendar-alt w-4 h-4 mr-2"></i>
                    {{ job.posted_at }}
                  </span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span v-for="skill in job.skills" :key="skill"
                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Job Description</h2>
            <div class="prose dark:prose-invert max-w-none">
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                {{ job.description }}
              </p>
            </div>
          </div>

          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Responsibilities</h2>
            <ul class="space-y-3">
              <li v-for="responsibility in job.responsibilities" :key="responsibility" class="flex items-start">
                <i class="fas fa-check-circle text-green-500 w-5 h-5 mt-1 mr-3 flex-shrink-0 text-xl"></i>
                <span class="text-gray-700 dark:text-gray-300">{{ responsibility }}</span>
              </li>
            </ul>
          </div>


        </div>

        <div class="lg:col-span-1">
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700  top-8">
            <button @click="applyToJob"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-4 flex items-center justify-center">
              <i class="fas fa-paper-plane w-4 h-4 mr-2"></i>
              Apply Now
            </button>

            <button @click="toggleFavorite" :class="[
              'w-full font-medium py-3 px-6 rounded-lg transition-colors mb-6 flex items-center justify-center',
              isFavorite
                ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-600'
                : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            ]">
              <i :class="['fas fa-heart w-4 h-4 mr-2', isFavorite ? 'text-red-700 dark:text-red-300' : '']"></i>
              {{ isFavorite ? 'Remove from Favorites' : 'Add to favorites' }}
            </button>

            <div class="border-t border-gray-200 dark:border-gray-600 pt-6">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Ad Details</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Number of Applications:</span>
                  <span class="text-gray-900 dark:text-white font-medium">{{ 100 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Views:</span>
                  <span class="text-gray-900 dark:text-white font-medium">{{ 1000 }}</span>
                </div>

                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">İlan No:</span>
                  <span class="text-gray-900 dark:text-white font-medium">{{ job.id }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Benzer İlanlar</h3>
            <div class="space-y-4">
              <div v-for="similarJob in similarJobs" :key="similarJob.id"
                class="border-b border-gray-200 dark:border-gray-600 pb-4 last:border-b-0 last:pb-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded transition-colors"
                @click="viewSimilarJob(similarJob)">
                <h4 class="font-medium text-gray-900 dark:text-white mb-1">{{ similarJob.title }}</h4>
                <p class="text-sm text-blue-600 dark:text-blue-400 mb-2">{{ similarJob.company }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ similarJob.salary }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { jobStore } from '@/stores/jobs';
import { useRoute, useRouter } from 'vue-router';
const store = jobStore()
const isFavorite = ref(false)
const route = useRoute()
const router = useRouter()

const similarJobs = ref([
  {
    id: 2,
    title: 'React Developer',
    company: 'StartupXYZ',
    salary: '40.000 - 60.000 $'
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'DevCorp Ltd.',
    salary: '60.000 - 100.000 $'
  },
  {
    id: 4,
    title: 'Vue.js Developer',
    company: 'WebStudio',
    salary: '60.000 - 80.000 $'
  }
])

onMounted(() => {
  window.scroll({
    behavior: 'smooth',
    top: 0
  })
  getJobDetail()
})

const getJobDetail = async () => {
  await store.getJobDetail(route.params.id)
}

const goBack = () => {
  router.go(-1)
}

const applyToJob = () => {
  alert(`Position applied for ${job.value.title}`)
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const viewSimilarJob = (similarJob) => {
}

const job = computed(() => store.job)

onUnmounted(() => {
  store.job = {}
})
</script>
