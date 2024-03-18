<template>
  <v-app>
    <Toolbar/>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script setup>
import  Toolbar from '@/components/Toolbar.vue'
</script>

