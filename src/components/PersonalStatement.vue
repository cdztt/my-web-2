<script setup>
import statement from "../assets/personalStatement.txt?raw";
</script>

<template>
  <div v-html="marked.parse(statement)"></div>
</template>

<style scoped></style>
