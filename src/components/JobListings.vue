<template>
  <div class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen">
    <Header @back="goBack" />

    <main class="container !mx-auto px-2 py-8">
      <SearchFilters @search="handleSearch" @filter-change="handleFilterChange" />

      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Job Postings</h2>
          <p class="text-gray-600 dark:text-gray-400">{{ filteredJobs.length }} ad found</p>
        </div>

        <div class="grid gap-6">
          <div class="border border-blue-300 dark:border-blue-600 shadow rounded-md p-4  w-full mx-auto"
            v-if="store.loading" v-for="item in 4">
            <div class="animate-pulse flex space-x-4">
              <div class="rounded-full bg-slate-200 dark:bg-slate-700 h-10 w-10"></div>
              <div class="flex-1 space-y-6 py-1">
                <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div class="space-y-3">
                  <div class="grid grid-cols-3 gap-4">
                    <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></div>
                    <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
                  </div>
                  <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <JobCard v-else v-for="job in paginatedJobs" :key="job.id" :job="job" @click="viewJobDetail"
            @apply="applyToJob" />
        </div>
        <div class="grid" v-if="!paginatedJobs.length">
          <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Sorry! </strong>
            <span class="block sm:inline">No job postings matching your search criteria were found.</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            </span>
          </div>
        </div>

        <div class="flex justify-center mt-12" v-if="totalPages > 1">
          <nav class="flex items-center space-x-2">
            <button @click="previousPage" :disabled="currentPage === 1"
              class="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50">
              <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </button>

            <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="[
              'px-4 py-2 rounded-lg',
              page === currentPage
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]">
              {{ page }}
            </button>

            <button @click="nextPage" :disabled="currentPage === totalPages"
              class="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50">
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </button>
          </nav>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Header from './Header.vue'
import SearchFilters from './SearchFilter.vue'
import JobCard from './JobCard.vue'
import Footer from './Footer.vue'
import { jobStore } from '@/stores/jobs';
import { useRouter } from 'vue-router'
const store = jobStore()
const router = useRouter()

onMounted(() => {
  onInitJobs()
})

const handleSearch = async (searchData) => {
  sleep()
  store.searchQuery.title = searchData.query
  store.searchQuery.location = searchData.location
  store.paginationQuery.pageNo = 1
}

const handleFilterChange = async ({ categories }) => {
  sleep()
  console.log('categories', categories)
  store.searchQuery.categories = categories
  store.paginationQuery.pageNo = 1
}

const sleep = async () => {
  store.loading = true;
  await new Promise(resolve => setTimeout(resolve, 500))
  store.loading = false
}

const viewJobDetail = (job) => {
  router.push(`/job/${job.id}`)
}

const applyToJob = (job) => {
  alert(`Position applied for ${job.title}`)
}

const goToPage = (page) => {
  sleep()
  store.paginationQuery.pageNo = page
}

const previousPage = async () => {
  await sleep()
  if (store.paginationQuery.pageNo > 1) {
    store.paginationQuery.pageNo--
  }
}

const nextPage = async () => {
  await sleep()
  if (store.paginationQuery.pageNo < totalPages.value) {
    store.paginationQuery.pageNo++
  }
}

const goBack = () => {
}

const onInitJobs = async () => {
  await store.getAllJobs()
}

const totalPages = computed(() => store.totalPage)
const filteredJobs = computed(() => store.filteredJobs)
const paginatedJobs = computed(() => store.paginatedJobs)
const currentPage = computed(() => store.paginationQuery.pageNo)
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

</script>
