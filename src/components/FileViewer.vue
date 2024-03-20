<script setup>
import { storeToRefs } from 'pinia';
import { computed, reactive, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useBlogStore from '../store/blog.js';

const blogStore = useBlogStore();
const route = useRoute();
const router = useRouter();

const { file, category } = storeToRefs(blogStore);

const loaded = ref(false);

const files = computed(() => category.value?.[route.params.subjectName]);
const currentFileIndex = computed(() =>
  files.value?.findIndex((fileName) => fileName === route.params.fileName)
);
const prevFile = computed(() => files.value?.[currentFileIndex.value - 1]);
const nextFile = computed(() => files.value?.[currentFileIndex.value + 1]);

const isPopup = reactive({
  prev: false,
  next: false,
});
const handleMouseOver = (which) => {
  isPopup[which] = true;
};
const handleMouseOut = (which) => {
  isPopup[which] = false;
};

const handleClick = (which) => {
  if (which === 'prev') {
    router.replace(
      route.path.split('/').slice(0, -1).concat(prevFile.value).join('/')
    );
  } else if (which === 'next') {
    router.replace(
      route.path.split('/').slice(0, -1).concat(nextFile.value).join('/')
    );
  }
};

watchEffect(
  (onCleanup) => {
    const controller = new AbortController();
    onCleanup(() => controller.abort());

    const data = {
      subject: route.params.subjectName,
      filename: route.params.fileName + '.md',
    };
    const signal = {
      signal: controller.signal,
    };

    blogStore.getFile(data, signal);
  },
  { flush: 'post' }
);

blogStore.$onAction(({ name, after }) => {
  after(() => {
    if (name === 'getFile') {
      loaded.value = true;
    }
  });
});
</script>

<template>
  <div class="fileviewer">
    <div className="fileviewer-title">
      <div className="fileviewer-title-arrow">
        <span
          :class="['fileviewer-title-arrow-entity', { invisible: !prevFile }]"
          @mouseover="handleMouseOver('prev')"
          @mouseout="handleMouseOut('prev')"
          @click="handleClick('prev')"
        >
          &#5130;
        </span>
        <span
          :class="['fileviewer-title-arrow-popup', { visible: isPopup.prev }]"
        >
          上一篇：{{ prevFile }}
        </span>
      </div>

      <div className="fileviewer-title-text">
        {{ file?.title }}
      </div>

      <div className="fileviewer-title-arrow">
        <span
          :class="['fileviewer-title-arrow-entity', { invisible: !nextFile }]"
          @mouseover="handleMouseOver('next')"
          @mouseout="handleMouseOut('next')"
          @click="handleClick('next')"
        >
          &#5125;
        </span>
        <span
          :class="['fileviewer-title-arrow-popup', { visible: isPopup.next }]"
        >
          下一篇：{{ nextFile }}
        </span>
      </div>
    </div>

    <div className="fileviewer-time">
      {{
        file?.createdAt
          ? new Date(file.createdAt).toISOString().slice(0, 10)
          : ''
      }}
    </div>

    <div v-if="!loaded">加载中……</div>
    <div
      v-else
      v-html="marked.parse(file?.content ?? '')"
    ></div>
  </div>
</template>

<style scoped lang="less">
.fileviewer {
  &-title {
    display: grid;
    grid-template-columns: 1fr 8fr 1fr;
    gap: 0.5rem;
    justify-items: center;
    align-items: center;
    &-text {
      font-size: 1.2em;
      font-weight: 600;
    }
    &-arrow {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      &-entity {
        font-size: 1.2rem;
        color: orange;
      }
      &-popup {
        display: none;
        font-size: 0.6rem;
        position: absolute;
        transform: translateY(3rem);
        color: white;
        background-color: rgba(0, 0, 0, 0.8);
        border: 1px solid rgba(0, 0, 0, 0.8);
        border-radius: 2px;
      }
    }
  }
  &-time {
    text-align: center;
    font-size: 0.7rem;
    margin-top: 0.3rem;
  }
}
.invisible {
  display: none;
}
.visible {
  display: unset;
}
</style>
