<template>
  <v-container fluid class="px-4 mt-2">
    <v-row justify="space-around" align-item="center" no-gutters>
      <v-col xs="12" sm="12" md="4">
        <v-text-field
          outlined
          v-model="SearchedShow"
          clear-icon="mdi-close-circle"
          clearable
          label="Type to Search Show by Name"
          type="text"
          @click:clear="clearMessage"
          hide-details
          class="pt-0 mt-0"
        ></v-text-field>
      </v-col>
    </v-row>
    <span v-if="!SearchedShow.length">
      <v-row no-gutters>
        <v-expansion-panels  v-model="panel" variant="accordion">
          <v-expansion-panel
            class="mt-4"
            v-for="(item, i) in differentGenres"
            :key="i"
          >
            <v-expansion-panel-title class="exp-header-background" height="150"
              ><h2 class="white--text">{{ item.label }}</h2>
              <template v-slot:actions>
                <v-icon color="white"> $expand </v-icon>
              </template>
              </v-expansion-panel-title
            >
            <v-expansion-panel-text class="pt-4">
              <v-row>
                <v-col
                  v-for="show in item.filterdShows"
                  :key="show.id"
                  xs="4"
                  sm="4"
                  md="2"
                >
                  <show-card :showInfo="show" @card-click="cardClickedEvent" />
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </span>
    <v-row no-gutters class="mt-4" v-else>
      <v-row
        v-if="
          !loading &&
          searchedshowsData &&
          searchedshowsData[0] &&
          searchedshowsData[0].length
        "
      >
        <v-col
          v-for="item in searchedshowsData[0]"
          :key="item.id"
          xs="4"
          sm="4"
          md="2"
        >
          <show-card :showInfo="item.show" @card-click="cardClickedEvent" />
        </v-col>
      </v-row>
      <v-row v-else-if="loading" justify="space-between space-around">
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

<script>
import ShowCard from "@/components/ShowCard.vue";
import SeriesService from "@/seriesService/tv-service.js";
const SeriesService1 = new SeriesService();

export default {
  name: "SeriesList",
  components: {
    ShowCard,
  },
  data() {
    return {
      differentGenres: [
        { label: "War", filterdShows: [] },
        { label: "Comedy", filterdShows: [] },
        { label: "Thriller", filterdShows: [] },
        { label: "Adventure", filterdShows: [] },
        { label: "Action", filterdShows: [] },
        { label: "Horror", filterdShows: [] },
        { label: "Drama", filterdShows: [] },
        { label: "Family", filterdShows: [] },
        { label: "Romance", filterdShows: [] },
        { label: "Supernatural", filterdShows: [] },
        { label: "Science-Fiction", filterdShows: [] },
        { label: "Medical", filterdShows: [] },
        { label: "Crime", filterdShows: [] },
        { label: "Legal", filterdShows: [] },
        { label: "Fantasy", filterdShows: [] },
      ],
      panel:0,
      showsData: [],
      SearchedShow: "",
      loading: false,
    };
  },
  methods: {
    cardClickedEvent(v) {
      this.$router.push({ path: `/SeriesDetails/${v}` });
    },
    clearMessage() {
      this.SearchedShow = "";
    },

    /* get api call to fetch the list of tv series */

    getTvSeriesData() {
      this.showsData = [];
      this.loading = true;
      SeriesService1.seriesList()
        .then((response) => {
          this.showsData = response.data.sort((a, b) => {
            return b.rating.average - a.rating.average;
          });
          this.loading = false;
        })
        .catch(() => {
          this.showsData = [];
        })
        .finally(() => {
          this.loading = false;
          this.getDiffGenresShows();
        });
    },

    /* filters for shows on different genres */

    getDiffGenresShows() {
      for (let i = 0; i < this.differentGenres.length; i++)
        this.differentGenres[i].filterdShows = this.showsData.filter((show) =>
          show.genres.includes(this.differentGenres[i].label)
        );
    },

    /* api call on search */

    searchedShowData(val) {
      this.searchedshowsData = [];
      this.loading = true;
      SeriesService1.serachList(val)
        .then((response) => {
          this.searchedshowsData.push(response.data);
        })
        .catch(() => {
          this.searchedshowsData = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  watch: {
    SearchedShow: function (srch) {
      if (srch.length) this.searchedShowData(srch);
      else {
        this.searchedshowsData = [];
      }
    },
  },
  mounted() {
    this.getTvSeriesData();
  },
};
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
