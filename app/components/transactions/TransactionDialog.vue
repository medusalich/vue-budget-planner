<template>
  <v-dialog v-model="isOpen">
    <v-card title="Buchung erfassen">
      <v-card-actions>
        <v-btn @click="isOpen = false">Schließen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  const isOpen = defineModel<boolean>();
</script>
