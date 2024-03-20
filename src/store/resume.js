import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
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
  const resume = ref('');
  const projects = shallowRef([]);

  const getResume = async () => {
    if (resume.value === '') {
      const res = await fetchResume();
      resume.value = res ?? '';
    }
  };

  const getProjects = async () => {
    if (projects.value.length === 0) {
      const res = await fetchProjects();
      projects.value = res ?? [];
    }
  };

  return { resume, projects, getResume, getProjects };
});

export default useResumeStore;
