export interface JobState {
  loading: boolean,
  paginationQuery: {
    pageNo: number,
    pageSize: number,
  },
  searchQuery: {
    title: string,
    location: string,
    categories: string[]
  }
  jobs: Job[],
  job: Job,
  totalCount: number
}

export interface Job {
  id: number
  title: string
  company: string
  location: string
  category: string
  description: string
  posted_at: string
  fields: string
}
