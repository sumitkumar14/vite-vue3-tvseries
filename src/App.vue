<template>
  <v-app> 
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h2><v-icon class="mb-1 mr-1">mdi-television</v-icon>TV Shows</h2>
      </div>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
  }),
};
</script>
