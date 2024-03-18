<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h2><v-icon class="mb-1 mr-1">mdi-television</v-icon>{{tvSeriesName?tvSeriesName:'TV Shows'}}</h2>
      </div>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script setup>
import { useTvStore } from '@/stores/tvStore'
import { computed } from 'vue';
const store = useTvStore();
const tvSeriesName = computed(()=>store.tvSeriesName);
</script>

