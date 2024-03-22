<script setup>
import { computed, ref } from 'vue';
import NavTab from '../components/NavTab.vue';
import PersonalStatement from '../components/PersonalStatement.vue';
import ProjectList from '../components/ProjectList.vue';

const tabs = [
  {
    tabName: '个人项目',
    component: ProjectList,
    props: {},
  },
  {
    tabName: '个人技能',
    component: PersonalStatement,
    props: {},
  },
];
const activeTab = ref(tabs[0].tabName);
const contentRef = ref(null);

const activeComponent = computed(() => {
  return tabs.find((tab) => tab.tabName === activeTab.value);
});

const handleScroll = () => {
  contentRef.value.scroll({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <div class="about">
    <div class="about-nav">
      <NavTab
        :tabs="tabs.map((tab) => tab.tabName)"
        v-model:activeTab="activeTab"
      />
    </div>

    <div
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
    </div>

    <div
      class="about-content"
      ref="contentRef"
    >
      <component
        :is="activeComponent.component"
        v-bind="activeComponent.props"
      />
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

  &-rocket {
    font-size: 5rem;
    color: orangered;
    position: absolute;
    right: 5rem;
    bottom: 0;
    cursor: pointer;
  }
}
</style>
