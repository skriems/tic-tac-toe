<script setup lang="ts">
import { ref } from "vue";
import { store } from "../../store";
const playerName = ref("");
</script>

<template>
  <div class="container">
    <h1>Login</h1>
    <form
      @submit.prevent="
        store.setPlayerName(playerName);
        $router.push({ name: 'home' });
      "
    >
      <input
        type="text"
        id="player"
        v-model.trim="playerName"
        placeholder="Player"
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped lang="css">
.container {
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  height: 100%;
}
h1 {
  text-align: center;
}
form {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
}
</style>
