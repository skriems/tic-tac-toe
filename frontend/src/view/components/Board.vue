<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { store } from "../../store";
import Cell from "./Cell.vue";
import { activePlayer } from "../../matches/activePlayer";
import { winnerMessage } from "../../matches/winnerMessage";
import type { Board, MoveMessage } from "../../types";

const props = defineProps<{
  matchId: string;
}>();

const router = useRouter();

const emptyBoard: Board = Array(9).fill(null);
const match = store.getMatch(props.matchId);

const activeTeam = computed(() => {
  return activePlayer(match?.board || emptyBoard);
});

const winner = computed(() => {
  return match ? winnerMessage(match) : null;
});

function handleClick(index: number) {
  if (!store.playerName) {
    router.push({ name: "login" });
    return;
  }

  if (match) {
    const msg = JSON.stringify({
      type: "move",
      matchId: match.id,
      value: `${activeTeam.value.toLowerCase()}:${index}`,
      playerName: store.playerName,
    } satisfies MoveMessage);
    store.sendMessage(msg);
  }
}
</script>

<template>
  <div class="container">
    <h1>{{ match?.player_x ?? "?" }} vs. {{ match?.player_o ?? "?" }}</h1>
    <h3>it's team {{ activeTeam.toUpperCase() }}'s turn</h3>
    <div class="wrapper">
      <div class="board">
        <template v-if="match" v-for="(cell, index) in match.board">
          <Cell
            :mark="cell"
            :active-team="activeTeam"
            :index
            :disabled="!!match.winner"
            @cell-clicked.once="handleClick"
          />
        </template>
      </div>
    </div>
    <div class="winner" v-if="winner">
      <h2>{{ winner }}</h2>
      <RouterLink to="/">Back to Matches</RouterLink>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 3rem;
  text-align: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.wrapper {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}

.board {
  display: grid;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
}

.winner {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  font-size: 2rem;
  font-weight: bold;
}
</style>
