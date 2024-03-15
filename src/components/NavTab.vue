<script setup>
defineProps(["tabs", "activeTab"]);
defineEmits(["update:activeTab"]);
</script>

<template>
  <div class="tabs">
    <span
      v-for="tabName of tabs"
      :key="tabName"
      :class="['tab', { 'active-tab': activeTab === tabName }]"
      @click="$emit('update:activeTab', tabName)"
    >
      {{ tabName }}
    </span>
  </div>
</template>

<style scoped lang="less">
.tabs {
  margin-bottom: 1.5rem;

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
