<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps<{
  activeTeam: string | null;
  mark: string | null;
  index: number;
  disabled?: boolean;
}>();

const isHovered = ref(false);
</script>

<template>
  <button
    :class="{
      cell: true,
      x: props.mark === 'x',
      o: props.mark === 'o',
    }"
    :disabled="props.disabled || !!mark"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    @click="$emit('cellClicked', props.index)"
  >
    <div
      v-if="isHovered && !props.mark && props.activeTeam === 'x'"
      class="cell x preview"
    ></div>
    <div
      v-else-if="isHovered && !props.mark && props.activeTeam === 'o'"
      class="cell o preview"
    ></div>
  </button>
</template>

<style scoped>
button {
  background: none;
  border-radius: 0;
  padding: 0;
}

.cell {
  --cell-size: 100px;
  --mark-size: calc(var(--cell-size) * 0.8);

  width: var(--cell-size);
  height: var(--cell-size);
  border: 1px solid var(--color);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.cell:first-child,
.cell:nth-child(2),
.cell:nth-child(3) {
  border-top: none;
}

.cell:nth-child(3n + 1) {
  border-left: none;
}

.cell:nth-child(3n) {
  border-right: none;
}

.cell:nth-last-child(-n + 3) {
  border-bottom: none;
}

.cell.x::before,
.cell.x::after {
  content: "";
  position: absolute;
  width: calc(var(--mark-size) * 0.15);
  height: var(--mark-size);
  border-radius: 20px;
  background-color: var(--color);
}

.cell.x::before {
  transform: rotate(45deg);
}

.cell.x::after {
  transform: rotate(-45deg);
}

.cell.o::before,
.cell.o::after {
  content: "";
  position: absolute;
  border-radius: 50%;
}

.cell.o::before {
  width: var(--mark-size);
  height: var(--mark-size);
  border-radius: 50%;
  background-color: var(--color);
}

.cell.o::after {
  width: calc(var(--mark-size) * 0.8);
  height: calc(var(--mark-size) * 0.8);
  border-radius: 50%;
  background-color: var(--background-color);
}

.cell.x:not(.preview),
.cell.o:not(.preview) {
  cursor: not-allowed;
}

.preview {
  border: none;
  opacity: 0.3;
}
</style>
