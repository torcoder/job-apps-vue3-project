import { defineStore } from 'pinia';
import type { Job, JobState } from '@/types/job';
import jobService from '@/services/jobService'


export const jobStore = defineStore('job', {
  state: (): JobState => ({
    loading: false,
    paginationQuery: {
      pageNo: 1,
      pageSize: 10,
    },
    searchQuery: {
      title: "",
      location: "",
      categories: []
    },
    jobs: [] as Job[],
    job: {} as Job,
    totalCount: 0,
  }),
  getters: {
    filteredJobs(): Job[] {
      return this.jobs.filter((job) => {
        const titleMatch = this.searchQuery.title.trim() === '' ||
          job.title.toLowerCase().includes(this.searchQuery.title.toLowerCase());

        const locationMatch = this.searchQuery.location.trim() === '' ||
          job.location.toLowerCase().includes(this.searchQuery.location.toLowerCase());

        const categoryMatch = this.searchQuery.categories.length === 0 ||
          this.searchQuery.categories.includes(job.category);

        return titleMatch && locationMatch && categoryMatch;
      });
    },
    paginatedJobs(): Job[] {
      const start = (this.paginationQuery.pageNo - 1) * this.paginationQuery.pageSize;
      const end = start + this.paginationQuery.pageSize;
      return this.filteredJobs.slice(start, end);
    },
    totalFilteredCount(): number {
      return this.filteredJobs.length;
    },
    totalPage(): number {
      return Math.ceil(this.filteredJobs.length / this.paginationQuery.pageSize)
    },
    uniqueCategories(): string[] {
      return [...new Set(this.jobs.map(job => job.category))];
    },
    uniqueLocations(): string[] {
      return [...new Set(this.jobs.map(job => job.location))];
    }
  },
  actions: {
    async getAllJobs() {
      this.loading = true;
      await new Promise(resolve => setTimeout(resolve, 500))
      try {
        const response = await jobService.getAllJobs();
        this.totalCount = response.length;
        this.jobs = response;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        return error;
      }
    },
    async getJobDetail(id: string) {
      this.loading = true;
      await new Promise(resolve => setTimeout(resolve, 250))
      try {
        const response = await jobService.findById(id);
        this.job = response
      } catch (error) {
        this.loading = false;
        return error
      }
    }
  }

});
