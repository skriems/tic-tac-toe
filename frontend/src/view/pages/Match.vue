<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { store } from "../../store";
import Board from "../components/Board.vue";

const router = useRouter();
const route = useRoute();
const match = store.getMatch(route.params.id);

if (!match) {
  router.push({ name: "home" });
}
</script>

<template>
  <Board :match-id="match?.id" />
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
