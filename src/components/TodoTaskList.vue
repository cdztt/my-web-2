<script setup>
import { ref } from "vue";

const checkingLine = ref(null);
const props = defineProps(["data"]);
</script>
<template>
  <div v-for="(item, index) of props.data" :key="item.id" class="todo-tasklist">
    <div class="todo-tasklist-content">
      <span class="todo-tasklist-content-finish none-user-select">
        <span
          @mouseover="checkingLine = index"
          @mouseout="checkingLine = null"
          class="todo-tasklist-content-finish-circle"
        >
          ◯
        </span>
        <span
          class="todo-tasklist-content-finish-check"
          v-show="index === checkingLine"
        >
          ✓
        </span>
      </span>
      <span class="todo-tasklist-content-text">
        {{ item.taskContent }}
      </span>
    </div>
    <div class="todo-tasklist-footer">任务</div>
  </div>
</template>
<style scoped lang="less">
@left-width: 2.2rem;
.todo-tasklist {
  border: 1px dotted gray;
  border-radius: 3px;
  margin: 0.2rem;
  &-content {
    &-finish {
      display: inline-block;
      width: @left-width;
      &:active {
        color: orange;
      }
      &-circle {
        font-size: 1rem;
        cursor: default;
      }
      &-check {
        font-size: 1rem;
        position: relative;
        left: -1.2rem;
        margin-right: calc(-1rem - 0.4px);
        z-index: -1;
      }
    }
    &-text {
      //margin-left: 0.5rem;
    }
  }
  &-footer {
    margin-left: @left-width;
    font-size: 0.8rem;
  }
}
</style>
