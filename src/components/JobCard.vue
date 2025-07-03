<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer"
    @click="$emit('click', job)">
    <div class="sm:flex items-start lg:flex justify-between">
      <div class="flex items-start space-x-4">
        <div :class="[
          'w-16 h-16 rounded-lg flex items-center justify-center',
          job.company.color || 'bg-blue-100 dark:bg-blue-900'
        ]">
          <i :class="[
            'text-xl',
            getCategoryDetails(job.category).icon,
            getCategoryDetails(job.category).color || 'text-blue-500'
          ]"></i>
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ job.title }}</h3>
          <p class="text-blue-600 dark:text-blue-400 font-medium mb-2">{{ job.company }}</p>
          <p class="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ job.description }}</p>
          <div class="flex flex-wrap gap-2 mb-3">
            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
              {{ job.fields }}
            </span>
          </div>
          <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 gap-2">
            <span class="flex items-center gap-1">
              <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
              {{ job.location }}
            </span>
            <span class="flex items-center gap-1">
              <font-awesome-icon :icon="['fas', 'calendar']" />
              {{ job.posted_at }}
            </span>
          </div>
        </div>
      </div>
      <div class="text-right">
        <button @click.stop="$emit('apply', job)"
          class="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors cursor-pointer">
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  job: {
    type: Object,
    required: true
  }
})

defineEmits(['click', 'apply'])

const getCategoryDetails = (category) => {
  const categoryMap = {
    'Accounts': { icon: 'fas fa-calculator', color: 'text-blue-500 dark:text-blue-400' },
    'Quality': { icon: 'fas fa-check-circle', color: 'text-green-500 dark:text-green-400' },
    'Program': { icon: 'fas fa-project-diagram', color: 'text-indigo-500 dark:text-indigo-400' },
    'Branding': { icon: 'fas fa-lightbulb', color: 'text-purple-500 dark:text-purple-400' },
    'Marketing': { icon: 'fas fa-chart-line', color: 'text-pink-500 dark:text-pink-400' },
    'Group': { icon: 'fas fa-users', color: 'text-teal-500 dark:text-teal-400' },
    'Design': { icon: 'fas fa-palette', color: 'text-yellow-500 dark:text-yellow-400' },
    'Creative': { icon: 'fas fa-paint-brush', color: 'text-orange-500 dark:text-orange-400' },
    'Security': { icon: 'fas fa-lock', color: 'text-red-500 dark:text-red-400' },
    'Operations': { icon: 'fas fa-cogs', color: 'text-gray-500 dark:text-gray-400' },
    'Markets': { icon: 'fas fa-globe', color: 'text-cyan-500 dark:text-cyan-400' },
    'Development': { icon: 'fas fa-code', color: 'text-blue-600 dark:text-blue-500' }
  };

  return categoryMap[category] || { icon: 'fas fa-question-circle', color: 'text-gray-400 dark:text-gray-500' };
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
