<template>
  <button type="button" class="rounded" :aria-label="label">
    <v-icon :icon="icon" :color="color" />
  </button>
</template>

<script setup lang="ts">
  defineProps<{
    icon: string;
    label: string;
    color?: string;
  }>();
</script>

<style scoped>
  button:hover,
  button:focus-visible {
    transform: scale(1.15);
  }

  button:focus-visible {
    outline: 2px solid rgb(var(--v-theme-on-surface));
    outline-offset: 2px;
  }
</style>
