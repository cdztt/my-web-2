<script setup>
import { storeToRefs } from "pinia";
import { onBeforeUnmount, ref, watchEffect } from "vue";
import {
  onBeforeRouteUpdate,
  RouterView,
  useRoute,
  useRouter,
} from "vue-router";
import useBlogStore from "../store/blog.js";

const blogStore = useBlogStore();
const { subjects, firstSubjectName } = storeToRefs(blogStore);

const route = useRoute();
const router = useRouter();

const currentSubjectName = ref();
watchEffect(
  () =>
    (currentSubjectName.value =
      route.params.subjectName ?? firstSubjectName.value),
);

const controller = new AbortController();

blogStore.$onAction(({ after }) => {
  after(() => {
    if (route.path === "/blog" && !route.params.subjectName) {
      router.replace(route.path + "/" + firstSubjectName.value);
    }
  });
});
blogStore.setCategory({ signal: controller.signal });

onBeforeUnmount(() => {
  controller.abort();
});

onBeforeRouteUpdate((to, from) => {
  if (!to.params.subjectName) {
    if (!from.params.fileName) {
      return false;
    } else {
      return { path: to.path + "/" + from.params.subjectName, replace: true };
    }
  }
});

const handleSubjectClick = (name) => {
  currentSubjectName.value = name;
  router.replace(route.matched[0].path + "/" + name);
};
</script>

<template>
  <div class="blog">
    <div class="blog-main">
      <RouterView />
    </div>

    <div class="blog-sider">
      <div v-for="[name, count] of subjects" :key="name" class="blog-subjects">
        <span
          :class="[
            'blog-subjects-name',
            { 'blog-subjects-name-selected': currentSubjectName === name },
          ]"
          @click="handleSubjectClick(name)"
        >
          {{ name }}
        </span>
        <span>{{ ` (${count})` }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.blog {
  font-size: calc(0.5rem + 1vw);
  display: grid;
  grid-template-columns: 1fr auto;
  height: var(--main-fit-height);
  &-main {
    padding: 0 1rem;
    overflow: scroll;
  }
  &-sider {
    padding-left: 1rem;
    border-left: 1px solid orange;
  }
}
.blog-subjects {
  margin-bottom: 0.5rem;
  &-name {
    cursor: pointer;
    text-decoration: underline;
    &-selected {
      text-decoration-color: orange;
    }
  }
}
</style>
