<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const TEXT = "我真的在加载，可能网速比较慢，相信我";
let timer;

const count = ref(0);
const text = ref([]);

onMounted(() => {
  timer = setInterval(() => {
    text.value.push(TEXT[count.value]);
    count.value += 1;
  }, 150);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<template>
  Loading......
  <span v-for="(char, index) of text" :key="index">
    {{ char ?? "！" }}
  </span>
</template>
