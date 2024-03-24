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
  const skillLabels = shallowRef(null);
  const projects = shallowRef([]);

  const getResume = async () => {
    if (resume.value === '') {
      let html = await fetchResume();

      if (html) {
        const labels = [];

        html = html
          .split('\n')
          .map((line) => {
            const result = line.match(/(?<=<(?<tag>h3|h4)>).*(?=<\/\k<tag>>)/);

            if (result) {
              const {
                0: text,
                index,
                groups: { tag },
              } = result;
              const id = window.crypto.getRandomValues(new Uint16Array(1))[0];

              line =
                line.slice(0, index - 1) +
                ` id="${id}"` +
                line.slice(index - 1);

              labels.push({ tag, text, id });
            }

            return line;
          })
          .join('\n');

        resume.value = html;
        skillLabels.value = labels;
      }
    }
  };

  const getProjects = async () => {
    if (projects.value.length === 0) {
      const res = await fetchProjects();
      projects.value = res ?? [];
    }
  };

  return { resume, skillLabels, projects, getResume, getProjects };
});

export default useResumeStore;
