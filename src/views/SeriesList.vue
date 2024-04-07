<template>
  <v-container fluid style="min-width: 90vw;" class="px-2 mt-1">
    <v-row justify="space-around" align-item="center" no-gutters>
      <v-col xs="12" sm="12" md="4">
        <v-text-field outlined v-model="SearchedShow" clear-icon="mdi-close-circle" clearable
          label="Type to Search Show by Name" type="text" @click:clear="clearMessage" hide-details
          class="pt-0 mt-0"></v-text-field>
      </v-col>
    </v-row>
    <span v-if="!SearchedShow.length">
      <v-row no-gutters>
        <v-expansion-panels v-model="panel" variant="accordion">
          <v-expansion-panel class="mt-4" v-for="(item, i) in store.differentGenres" :key="i">
            <v-expansion-panel-title class="exp-header-background" height="150">
              <h2 class="white--text">{{ item.label }}</h2>
              <template v-slot:actions>
                <v-icon color="white"> $expand </v-icon>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="pt-4">
              <v-row>
                <v-col v-for="show in item.filterdShows" :key="show.id" xs="4" sm="4" md="2">
                  <show-card :showInfo="show" @card-click="cardClickedEvent" />
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </span>
    <v-row no-gutters class="mt-4" v-else>
      <v-row v-if="!store.loading &&
          store.searchedshowsData &&
          store.searchedshowsData[0] &&
          store.searchedshowsData[0].length
          ">
        <v-col v-for="item in store.searchedshowsData[0]" :key="item.id" xs="4" sm="4" md="2">
          <show-card :showInfo="item.show" @card-click="cardClickedEvent" />
        </v-col>
      </v-row>
      <v-row v-else-if="store.loading" justify="space-between space-around">
        <v-col class="center-text">
          <h2>Loading in progress ...</h2>
        </v-col>
      </v-row>
      <v-row v-else justify="space-between space-around">
        <v-col class="center-text">
          <h2>No Data Found</h2>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script setup>
import '@mdi/font/css/materialdesignicons.css'
import { ref, watch, onMounted } from 'vue';
import { useTvStore } from '@/stores/tvStore'
// import { debounceSearch } from '@/utils/debounce.js'
import { useRouter } from 'vue-router'
import ShowCard from "@/components/ShowCard.vue";


const store = useTvStore()
const router = useRouter()
const panel = ref(0);
const SearchedShow = ref("");

function cardClickedEvent(v) {
  router.push({ path: `/SeriesDetails/${v}` });
}

function clearMessage() {
  SearchedShow.value = "";
}

watch(SearchedShow, (srch) => {
  if (srch.length)(store.searchedShowDataFn(srch));
  else {
    store.searchedshowsData = [];
  }
})
store.tvSeriesName='';
store.getTvSeriesData();
</script>
<style scoped>
.exp-header-background {
  background-color: #1976d2 !important;
}

.center-text {
  height: calc(100vh - 128px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
