<template>
    <v-card class="mx-0 px-0">
    <v-row no-gutters class="text-center">
      <v-col cols="12">
        <v-img alt :src="cast.person.image.medium" />
        <div>
          <p class="small-text-size">
            <b>{{ cast.person.name }}</b>
          </p>
          <p class="small-text-size">as</p>
          <p class="small-text-size">
            <b> {{ cast.character.name }}</b>
          </p>
        </div>
      </v-col>
    </v-row>
  </v-card>
  </template>

  <script setup>
   defineProps({
     cast: null,
    });
  </script>
  <style scoped>
  .small-text-size {
    font-size: 12px;
  }
  </style>
  