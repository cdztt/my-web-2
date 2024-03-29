import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from './axios.js';

const fetchCategory = (signal) => {
  return axios
    .get('getCategory', signal)
    .then((res) => res.data)
    .then((res) => {
      if (res.fail) return;
      return res;
    })
    .catch(() => undefined);
};

const fetchFile = (data, signal) => {
  return axios
    .post('getFile', data, signal)
    .then((res) => res.data)
    .then((res) => {
      if (res.fail) return;
      return res;
    })
    .catch(() => undefined);
};

export default defineStore('blog', () => {
  const category = ref();
  const file = ref();

  const subjects = computed(() => {
    if (!category.value) {
      return [];
    }
    return Object.entries(category.value).map(([subject, files]) => [
      subject,
      files.length,
    ]);
  });

  // 显示js的文章
  const firstSubjectName = computed(() => subjects.value[1]?.[0]);

  const getCategory = async (signal) => {
    if (category.value) {
      return;
    }
    category.value = await fetchCategory(signal);
  };

  const getFile = async (data, signal) => {
    const res = await fetchFile(data, signal);
    if (!res) {
      file.value = {};
    } else {
      const { text, createdAt } = res;
      const index = text.indexOf('\n');
      const title = text.slice(0, index);
      const content = text.slice(index);
      file.value = {
        title,
        createdAt,
        content,
      };
    }
  };

  return {
    category,
    file,
    subjects,
    firstSubjectName,
    getCategory,
    getFile,
  };
});
