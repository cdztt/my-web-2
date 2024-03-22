<script setup>
import { computed, ref } from 'vue';

const props = defineProps(['data']);
const checkingLine = ref(null);

const deadline = computed(() => {
  return props.data.map((item) => {
    if (item.deadline) {
      const {
        deadline: { year, month, date, dayZh, hours, minutes },
      } = item;
      return `截止日期：${month}月${date}日星期${dayZh}，${hours}点${minutes}分，${year}年`;
    } else {
      return '';
    }
  });
});
</script>
<template>
  <div
    v-for="({ id, taskContent, list }, index) of props.data"
    :key="id"
    class="todo-tasklist"
  >
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
        {{ taskContent }}
      </span>
    </div>

    <div class="todo-tasklist-footer">
      <span>{{ list }}</span>
      <span>{{ deadline[index] }}</span>
    </div>
  </div>
</template>
<style scoped lang="less">
@left-width: 2.2rem;
.todo-tasklist {
  border: 1px dotted gray;
  border-radius: 3px;
  margin: 0.2rem;
  scroll-snap-align: start;
  overflow: hidden;

  &-content {
    display: flex;
    justify-content: left;
    align-items: center;

    &-finish {
      text-align: center;
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
      font-size: 1.2rem;
    }
  }
  &-footer {
    margin: 0 @left-width;
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>
