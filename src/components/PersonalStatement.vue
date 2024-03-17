<script setup>
import { ref } from 'vue';
import useResumeStore from '../store/resume.js';

const resumeStore = useResumeStore();

const resume = ref('');

resumeStore.$onAction(({ name, after }) => {
  after((result) => {
    if (name === 'getResume') {
      resume.value = result ?? '';
    }
  });
});
resumeStore.getResume();
</script>

<template>
  <div v-html="marked.parse(resume)"></div>
</template>

<style scoped></style>
