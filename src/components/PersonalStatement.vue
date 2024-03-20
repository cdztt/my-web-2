<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import useResumeStore from '../store/resume.js';

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
  <template v-if="!loaded">加载中……</template>
  <template v-else>
    <div v-html="marked.parse(resume)"></div>
  </template>
</template>

<style scoped></style>
