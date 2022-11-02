import { apiClient } from '@/boot/axios';

export default {
  me() {
    return apiClient.get('/me');
  },
};
