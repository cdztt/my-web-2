<script setup>
import { ref } from 'vue';
const props = defineProps(['tabs']);
const emit = defineEmits(['click-tab']);

const activeTab = ref(props.tabs[0].tabName);

const handleClick = (tabName, path) => {
  activeTab.value = tabName;
  emit('click-tab', path);
};
</script>

<template>
  <div class="tabs">
    <span
      v-for="({ tabName, path }, idx) of tabs"
      :key="idx"
      :class="['tab', { 'active-tab': activeTab === tabName }]"
      @click="handleClick(tabName, path)"
    >
      {{ tabName }}
    </span>
  </div>
</template>

<style scoped lang="less">
.tabs {
  .tab {
    margin: 0 1em;
    font-size: 1.2em;
    border-bottom: 2px solid orange;
    cursor: pointer;
  }

  .active-tab {
    border-bottom-width: 4px;
  }
}
</style>
