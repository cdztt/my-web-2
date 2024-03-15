<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import useBlogStore from "../store/blog.js";

const blogStore = useBlogStore();
const { category, firstSubjectName } = storeToRefs(blogStore);

const props = defineProps(["subjectName"]);
const subjectName = computed(() => props.subjectName);

const currentSubjectName = computed(
  () => subjectName.value ?? firstSubjectName.value,
);
</script>
<template>
  <div
    v-for="file of category?.[currentSubjectName]"
    :key="file"
    class="filelist"
    @click="$router.push({ path: $route.path + '/' + file })"
  >
    <span class="filelist-index"> &#9711; </span>
    <span class="filelist-file">
      {{ file }}
    </span>
  </div>
</template>
<style scoped lang="less">
.filelist {
  @gap: 1vh;
  padding: @gap 0;
  margin: @gap 0;
  border: 1px solid transparent;
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  cursor: pointer;
  &-index {
    color: orange;
    font-size: 0.6em;
    justify-self: center;
  }
  &-file {
    justify-self: left;
  }
  &:hover {
    border-color: orange;
    border-radius: 10px;
  }
}
</style>
