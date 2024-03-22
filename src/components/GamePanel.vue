<script setup>
defineProps(['mode', 'level', 'isDisabled']);
defineEmits(['update:mode', 'update:level', 'game-start']);
</script>
<template>
  <div class="gamepanel">
    <div>
      <label>选择棋子：</label>
      <label>
        <input
          type="radio"
          :checked="mode === '1'"
          @click="$emit('update:mode', '1')"
          :disabled="isDisabled"
        />
        先手
      </label>
      <label>
        <input
          type="radio"
          :checked="mode === '2'"
          @click="$emit('update:mode', '2')"
          :disabled="isDisabled"
        />
        后手
      </label>
      <label>
        <input
          type="radio"
          :checked="mode === '0'"
          @click="$emit('update:mode', '0')"
          :disabled="isDisabled"
        />
        练习
      </label>
    </div>

    <div>
      <label>选择难度：</label>
      <label>
        <input
          type="radio"
          :checked="level === 'easy'"
          @click="$emit('update:level', 'easy')"
          :disabled="isDisabled"
        />
        简单
      </label>
      <label>
        <input
          type="radio"
          :checked="level === 'hard'"
          @click="$emit('update:level', 'hard')"
          :disabled="isDisabled"
        />
        困难
      </label>
    </div>

    <div class="gamepanel-start">
      <button @click="$emit('game-start')">开始</button>
    </div>
  </div>
</template>
<style scoped lang="less">
.gamepanel {
  font-size: 0.8rem;
  > div {
    margin-bottom: 1rem;
  }
  label {
    margin-right: 1rem;
  }
  &-start {
    margin-top: 1.5rem;
    text-align: center;
    > button {
      width: 80px;
    }
  }
}
</style>
