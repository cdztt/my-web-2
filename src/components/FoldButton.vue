<script setup>
import { ref } from 'vue';

const props = defineProps({
  folded: Boolean,
});
const emit = defineEmits(['update:folded']);

const folded = ref(props.folded);

const handleClick = () => {
  emit('update:folded', !folded.value);
  folded.value = !folded.value;
};
</script>
<template>
  <div
    @click="handleClick"
    class="foldbutton"
  >
    <template v-if="folded"> &#8811; </template>
    <template v-else> &#8810; </template>
  </div>
</template>
<style scoped lang="less">
.foldbutton {
  color: rgb(87, 87, 87);
}
</style>
