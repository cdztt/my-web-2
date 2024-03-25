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
    v-html="resume"
    class="my-resume-skill"
  ></div>
</template>

<style lang="less">
.my-resume-skill {
  font-size: 1.1em;
  line-height: 2;
  & > h3 {
    font-style: italic;
    &:after {
      content: '：';
    }
  }
  & ul > li {
    font-size: 0.8rem;
  }
  & a {
    font-size: 1rem;
  }
  & hr {
    width: 80%;
    margin-left: 0;
  }
}
</style>
