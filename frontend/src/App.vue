<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.debug {
  display: flex;
}
</style>
