import { defineStore } from 'pinia';
import axios from './axios.js';

const fetchResume = () => {
  return axios
    .get('getResume')
    .then((res) => res.data)
    .then((res) => {
      if (res.fail) return;
      return res;
    })
    .catch(() => {
      return undefined;
    });
};

const fetchProjects = () => {
  return axios
    .get('getProjects')
    .then((res) => res.data)
    .then((res) => {
      if (res.fail) return;
      return res;
    })
    .catch(() => {
      return undefined;
    });
};

const useResumeStore = defineStore('resume', () => {
  const getResume = async () => {
    const resume = await fetchResume();
    return resume;
  };

  const getProjects = async () => {
    const projects = await fetchProjects();
    return projects;
  };

  return { getResume, getProjects };
});

export default useResumeStore;
