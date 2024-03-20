<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import useResumeStore from '../store/resume.js';
import Loading from './Loading.vue';

const resumeStore = useResumeStore();
const { resume } = storeToRefs(resumeStore);

const loaded = ref(false);

resumeStore.$onAction(({ name, after }) => {
  after(() => {
    if (name === 'getResume') {
      loaded.value = true;
    }
  });
});
resumeStore.getResume();
</script>

<template>
  <Loading v-if="!loaded" />
  <div
    v-else
    v-html="marked.parse(resume)"
  ></div>
</template>

<style scoped></style>
