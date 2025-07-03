import http from '@/plugins/axios';
import type { Job } from '@/types/job';
class JobService {

  public async getAllJobs() {
    const { data } = await http.get('/data/job.json');
    return data;
  }

  public async findById(id: string) {
    const { data } = await http.get('/data/job.json');
    const findJob = data.find(job => job.id == id);
    if (findJob) {
      return findJob
    }
    return {};
  }
}

export default new JobService();
