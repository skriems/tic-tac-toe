<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { createMatch } from "../../integrations/createMatch";
import { store } from "../../store";
import MatchCards from "../components/MatchCards.vue";

const count = computed(() => {
  const count = {
    x: 0,
    o: 0,
  };
  for (const match of store.matches) {
    if (match.winner === "x") count.x++;
    if (match.winner === "o") count.o++;
  }
  return count;
});

const loading = ref(true);

onMounted(() => {
  fetch("http://localhost:8000/matches")
    .then((response) => response.json())
    .then((data) => {
      store.matches = data;
      loading.value = false;
    })
    .catch((error) => console.error(error));
});
</script>

<template>
  <h1>Tic-Tac-Toe</h1>
  <div class="container">
    <h2 v-if="store.playerName">Hello {{ store.playerName }}</h2>
    <div class="stats">
      <span>Team X: {{ count.x }} wins</span>
      <span>Team O: {{ count.o }} wins</span>
    </div>
    <div v-if="loading" class="loading">Loading Matches...</div>
    <button @click="createMatch">Create Match</button>
    <MatchCards />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stats span {
  display: block;
}
</style>
<!-- <style scoped> -->
<!-- .logo { -->
<!--   height: 6em; -->
<!--   padding: 1.5em; -->
<!--   will-change: filter; -->
<!--   transition: filter 300ms; -->
<!-- } -->
<!-- .logo:hover { -->
<!--   filter: drop-shadow(0 0 2em #646cffaa); -->
<!-- } -->
<!-- .logo.vue:hover { -->
<!--   filter: drop-shadow(0 0 2em #42b883aa); -->
<!-- } -->
<!-- </style> -->
