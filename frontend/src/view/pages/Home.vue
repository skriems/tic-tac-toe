<script setup lang="ts">
import { store } from "../../store";
</script>

<template>
  <h1>tic-tac-toe</h1>
  <span>connected: {{ store.connected }}</span>
</template>

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
