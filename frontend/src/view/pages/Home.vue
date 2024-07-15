<script setup lang="ts">
import { onMounted, ref } from "vue";
import { createMatch } from "../../integrations/createMatch";
import { store } from "../../store";
import MatchCards from "../components/MatchCards.vue";

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
  <div class="container">
    <h1>tic-tac-toe</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <p v-if="store.matches.length === 0">No matches yet</p>
    <span>connected: {{ store.connected }}</span>
    <MatchCards />
    <button @click="createMatch">Create Match</button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
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
