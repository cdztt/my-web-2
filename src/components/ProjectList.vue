<script setup>
import { storeToRefs } from 'pinia';
import { ref, watchEffect } from 'vue';
import useResumeStore from '../store/resume';
import Loading from './Loading.vue';

const resumeStore = useResumeStore();
const { projects } = storeToRefs(resumeStore);

const loaded = ref(false);
const folded = ref();

watchEffect(() => {
  folded.value = projects.value.map(() => true);
});

const handleFold = (index) => (folded.value[index] = !folded.value[index]);

resumeStore.$onAction(({ name, after }) => {
  after(() => {
    if (name === 'getProjects') {
      loaded.value = true;
    }
  });
});
resumeStore.getProjects();
</script>

<template>
  <Loading v-if="!loaded" />
  <div
    v-else
    class="project"
    v-for="(project, index) of projects"
    :key="project.name"
  >
    <div class="title">{{ index + 1 }}.&nbsp;&nbsp;{{ project.name }}</div>

    <div class="subtitle">
      <span class="description">
        {{ project.description }}
      </span>
      <a
        class="code"
        :href="project.code"
        target="_blank"
        rel="noreferrer"
      >
        仓库
      </a>
    </div>

    <div class="libraries">
      <span
        class="librarytag"
        v-for="lib of project.libraries"
        :key="lib"
      >
        {{ lib }}
      </span>
    </div>

    <div class="more">
      <template v-if="folded[index]">
        <a @click="() => handleFold(index)"> 更多…… </a>
      </template>
      <template v-else>
        &nbsp;&nbsp;&nbsp;&nbsp;{{ project.details }}
        <div>
          <a @click="() => handleFold(index)"> 收起。 </a>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.project {
  margin: 1rem 5rem 1rem 0;
  padding-bottom: 1rem;
  border-bottom: 2px dotted gray;
  scroll-snap-align: start;

  .title {
    font-size: 1em;
    font-weight: 600;
  }

  .subtitle {
    font-size: 0.8em;

    .description {
      font-style: italic;
    }

    .code {
      margin: 0 2rem;
    }
  }

  .libraries {
    font-size: 0.9em;
    margin: 0.3rem 0;
    display: flex;
    flex-wrap: wrap;

    .librarytag {
      border: 1px dashed gray;
      border-radius: 5px;
      padding: 0 0.3rem;
      margin: 0.2rem 0.8rem 0.2rem 0;
    }
  }

  .more {
    font-size: 1em;
    line-height: 1.5;
    margin-top: 0.5rem;
    a {
      cursor: default;
    }
  }
}
</style>
