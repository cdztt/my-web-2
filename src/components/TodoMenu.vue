<script setup>
import { inject, nextTick, ref, watch } from 'vue';

const props = defineProps(['filterType']);
const emit = defineEmits(['update:filterType']);

const todoLists = inject('todoLists');
const tooltip = inject('tooltip');

const handleClick = (filterType) => {
  emit('update:filterType', filterType);
};

const listsRef = ref();
const lastInputRef = ref();
const count = ref(0);

const handleAddList = () => {
  count.value += 1;
  todoLists.actions.add({
    title: `无标题列表 ${count.value}`,
    emoji: '🗒',
    filterType: Date.now().toString(),
    type: 'list',
  });
};

const handleBlur = async (e) => {
  todoLists.actions.updateLastListTitle(e.target.value);
  await nextTick();
  await nextTick(); //必须用2次nextTick，比watch的nextTick多一次，确保在watch之后执行
  const span = document.createElement('span');
  span.textContent = e.target.value;
  lastInputRef.value.parentNode.replaceChild(span, lastInputRef.value);
};

watch(
  [
    () => todoLists.lists.length,
    () => todoLists.lists[todoLists.lists.length - 1].title,
  ],
  async ([newLength], [oldLength]) => {
    await nextTick();
    lastInputRef.value = Array.from(
      listsRef.value.childNodes.values()
    ).findLast((node) => node.nodeType === 1).lastChild;

    if (newLength !== oldLength) {
      lastInputRef.value.focus();
      lastInputRef.value.select();
      lastInputRef.value.addEventListener('blur', handleBlur, { once: true });
    }
  }
);
</script>
<template>
  <div class="todomenu">
    <div
      class="todomenu-lists"
      ref="listsRef"
    >
      <div
        v-for="({ title, emoji, filterType, type }, index) of todoLists.lists"
        :key="title"
        :class="[
          'todomenu-lists-item',
          { 'todomenu-lists-item-selected': props.filterType === filterType },
        ]"
        @click="handleClick(filterType)"
      >
        <span
          :class="[
            'todomenu-lists-item-prefix',
            {
              'todomenu-lists-item-prefix-selected':
                props.filterType === filterType,
            },
          ]"
        ></span>

        <span class="todomenu-lists-item-emoji">
          {{ emoji }}
        </span>

        <template v-if="type === 'static'">
          <span>
            {{ title }}
          </span>
        </template>
        <template v-else>
          <input
            type="text"
            :value="title"
            class="todomenu-lists-item-input"
          />
        </template>
      </div>
    </div>

    <div
      class="todomenu-new"
      @mouseenter="tooltip.config({ content: '新建列表' }).popup"
      @click="handleAddList"
    >
      <span class="todomenu-new-prefix"> + </span>
      <span class="todomenu-new-text"> 新建列表 </span>
    </div>
  </div>
</template>
<style scoped lang="less">
.todomenu {
  height: var(--main-fit-height);
  display: grid;
  grid-template-rows: 1fr 120px;
  &-lists {
    overflow-y: scroll;
    &-item {
      --selected-background-color: rgba(128, 128, 128, 0.2);
      font-size: 0.8rem;
      display: grid;
      grid-template-columns: auto auto 1fr;
      align-items: center;
      margin-bottom: 0.8rem;
      border-radius: 4px;
      cursor: default;
      &-selected {
        background-color: var(--selected-background-color);
      }
      &-prefix {
        width: 0.2rem;
        height: 0.8rem;
        &-selected {
          background-color: gray;
        }
      }
      &-emoji {
        font-size: 1rem;
        width: 2rem;
        text-align: center;
      }
      &-input {
        border: none;
        min-width: 70px;
        &:disabled {
          color: inherit;
        }
      }
      &:hover {
        background-color: var(--selected-background-color);
      }
    }
  }
  &-new {
    margin: auto 0;
    border: 2px solid gray;
    border-radius: 5px;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    cursor: default;
    &-prefix {
      font-size: 2rem;
      margin: 0 0.8rem;
    }
    &-text {
      font-size: 1.2rem;
    }
  }
}
</style>
