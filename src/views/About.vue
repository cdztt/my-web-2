<script setup>
import { storeToRefs } from 'pinia';
import { ref, watchEffect } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import NavTab from '../components/NavTab.vue';
import useResumeStore from '../store/resume';

const tabs = [
  {
    tabName: '个人技能',
    path: '',
  },
  {
    tabName: '个人项目',
    path: '/projects',
  },
];

const router = useRouter();
const contentRef = ref(null);
const contentRefOffsetTop = ref();
const currentPath = ref('');

const resumeStore = useResumeStore();
const { skillLabels } = storeToRefs(resumeStore);

watchEffect(() => {
  if (contentRef.value) {
    contentRefOffsetTop.value = contentRef.value.offsetTop;
  }
});

const handleClickTab = (path) => {
  router.push('/about' + path);
  currentPath.value = path;
};

const handleScroll = () => {
  contentRef.value.scroll({ top: 0, behavior: 'smooth' });
};

const jump = (id) => {
  const offsetTop = document.getElementById(id).offsetTop;
  contentRef.value.scroll({
    top: offsetTop - contentRefOffsetTop.value,
    behavior: 'smooth',
  });
};
</script>

<template>
  <div class="about">
    <div class="about-nav">
      <NavTab
        :tabs="tabs"
        @click-tab="handleClickTab"
      />
    </div>

    <div
      class="about-labels"
      v-show="currentPath === ''"
    >
      <span
        v-for="({ tag, text, id }, index) of skillLabels"
        :key="index"
        :class="`about-labels-${tag}`"
        @click="jump(id)"
        >{{ text }}</span
      >
    </div>

    <!-- <div
      class="about-rocket"
      @click="handleScroll"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 48 48"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M24 29.13V43.5m-4.51-14.37v9.77m15.1-9.77L24 4.5L13.41 29.13m15.1 0v9.77"
        />
      </svg>
    </div> -->

    <div
      class="about-content"
      ref="contentRef"
    >
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="less">
.about {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  font-size: calc(0.5rem + 0.6vw);
  padding: 0 5rem;

  &-nav {
    font-size: calc(0.5rem + 0.8vw);
    box-sizing: border-box;
    height: 10%;
    padding: 1rem 0;
    margin: 0;
    position: sticky;
    top: 0rem;
    background-color: white;
    display: flex;
    align-items: center;
  }

  &-content {
    box-sizing: border-box;
    height: 90%;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
  }

  &-labels {
    position: absolute;
    right: 8rem;
    line-height: 2;
    span {
      color: rgb(78, 78, 78);
      display: block;
      font-size: 0.8rem;
      text-decoration: underline;
      cursor: pointer;
    }
    &-h3 {
      position: relative;
      left: -0.8rem;
      font-style: italic;
      &::after {
        content: '：';
      }
    }
  }
  // &-rocket {
  //   font-size: 5rem;
  //   color: orangered;
  //   position: absolute;
  //   right: 6rem;
  //   top: 70%;
  //   cursor: pointer;
  // }
}
</style>
