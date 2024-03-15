<script setup>
defineProps(["snapshot"]);
defineEmits(["drop-piece"]);

const drawPiece = (order) => {
  switch (order) {
    case 1:
      return "⚔️";
    case 2:
      return "🛡️";
    default:
      return "";
  }
};
</script>

<template>
  <div class="gameboard">
    <div v-for="(row, x) of snapshot" :key="x" class="gameboard-row">
      <div
        v-for="(square, y) of row"
        :key="y"
        class="gameboard-square"
        @click="$emit('drop-piece', x, y)"
      >
        {{ drawPiece(square) }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.gameboard {
  &-row {
    width: var(--gameboard-width);
    &::after {
      content: "";
      clear: left;
      display: block;
    }
  }
  &-square {
    float: left;
    width: 6rem;
    height: 6rem;
    line-height: 6rem;
    font-size: 4rem;
    border: 2px dashed orange;
    margin-left: -2px;
    margin-top: -2px;
    text-align: center;
    user-select: none;
  }
}
</style>
