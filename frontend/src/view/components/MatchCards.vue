<script setup lang="ts">
import { RouterLink } from "vue-router";
import { store } from "../../store";
import { winnerMessage } from "../../matches/winnerMessage";
</script>

<template>
  <div class="cards">
    <p v-if="store.matches.length === 0">No matches yet</p>
    <RouterLink
      v-for="match in store.matches"
      :key="match.id"
      :to="{ name: 'match', params: { id: match.id } }"
    >
      <div class="card">
        <h3>{{ match.player_x ?? "?" }} vs. {{ match.player_o ?? "?" }}</h3>
        <em v-if="match.winner">{{ winnerMessage(match) }}</em>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.cards {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.card {
  width: 70vw;
  padding: 1rem;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #1d1d1d;
}

.card em {
  font-size: 0.9rem;
}
</style>
