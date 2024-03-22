<script setup>
import { computed, inject, ref, watchEffect } from 'vue';
import GameBoard from '../components/GameBoard.vue';
import GamePanel from '../components/GamePanel.vue';
import Ai from '../utils/game/Ai.js';
import Game from '../utils/game/Game.js';

const mode = ref('1');
const level = ref('easy');
const game = ref(new Game(mode.value));
const ai = ref(new Ai(level.value));
const step = ref(0);
const active = ref(false);

const { messageShow } = inject('message-show');

const snapshot = computed(() => game.value.getHistorySnapshot(step.value));

const dropPiece = (x, y) => {
  if (active.value) {
    const result = game.value.judgeAndRecord(x, y);
    if (!result.done && result.info === 'ignore') return;

    if (mode !== '0') {
      //非练习模式才用ai
      ai.value.input(
        '' + x + y,
        game.value.getCurrentPlayer().getOrder().toString()
      );
    }
    step.value++;
    if (!result.done) return;

    let msg = '';
    if (result.info === 'draw') {
      msg += '平局';
    } else {
      msg += `${result.info}赢了！`;
    }

    messageShow({
      type: 'info',
      title: '游戏结果',
      content: msg,
    });

    active.value = false;
  }
};

const aiDropPiece = () => {
  const point = ai.value.output();
  if (point) {
    //当最后一个格子走完，point是undefined，忽略
    const [x, y] = point.split('').map((el) => parseInt(el));
    dropPiece(x, y);
  }
};

const youDropPiece = (x, y) => {
  if (mode === '0' || (mode !== '0' && !game.value.isAiNext())) {
    dropPiece(x, y);
  }
};

watchEffect((onCleanup) => {
  if (game.value.isAiNext()) {
    const timer = setTimeout(aiDropPiece, 500);
    onCleanup(() => {
      clearTimeout(timer);
    });
  }
});

const gameStart = () => {
  game.value = new Game(mode.value);
  ai.value = new Ai(ai.value);
  step.value = 0;
  active.value = true;
};
</script>

<template>
  <div class="game">
    <GamePanel
      v-model:mode="mode"
      v-model:level="level"
      @game-start="gameStart"
      :isDisabled="active"
    />
    <GameBoard
      :snapshot="snapshot"
      @drop-piece="youDropPiece"
    />
  </div>
</template>

<style scoped lang="less">
.game {
  display: grid;
  gap: 2rem;
  justify-items: center;
  margin: 1rem 0;
}
</style>
