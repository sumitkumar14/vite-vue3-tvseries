<template>
  <v-container fluid class="px-6 mt-2">
    <v-row v-if="!store?.loading" no-gutters>
      <div class="d-flex" shrink cols="1">
        <v-btn class="mb-0 mr-1" :title="home" icon @click="backClick()" color="black" dark>
          <v-icon dark left> mdi-arrow-left </v-icon>
        </v-btn>
      </div>
      <v-col>
        <v-row no-gutters>
          <ShowCard class="mr-4 mb-4" :showInfo="showDetails"> </ShowCard>
          <v-col xs="12" :sm="$vuetify.breakpoint && $vuetify.breakpoint.mobile ? '12' : ''">
            <v-row no-gutters>
              <v-col cols="12">
                <div class="summary-div" v-html="showDetails.summary"></div>
              </v-col>
              <v-col cols="12">
                <v-card class="pa-2 mb-4" v-if="showDetails && Object.keys(showDetails).length">
                  <v-card-title class="pl-3 pt-0">
                    Show Information</v-card-title>
                  <v-row no-gutters>
                    <p v-if="showDetails?.network?.country" class="mx-3">
                      <b>Country:</b>&nbsp;<span class="show-info-txt">{{
                        showDetails.network.country.name
                        }}</span>
                    </p>
                    <p v-if="showDetails?.network?.name" class="mx-3">
                      <b>Network:</b>&nbsp;<span class="show-info-txt">{{
                        showDetails.network.name
                        }}</span>
                    </p>
                    <p v-if="showDetails?.network?.country" class="mx-3">
                      <b>Days:</b>&nbsp;<v-chip tile class="mr-1" small color="orange"
                        v-for="(day, i) in showDetails?.schedule?.days" :key="i"><b>{{ day }}</b></v-chip>
                    </p>
                    <p v-if="showDetails?.network?.country" class="mx-3">
                      <b>Time:</b>&nbsp;<span class="show-info-txt">{{
                        showDetails.schedule.time
                        }}</span>
                    </p>
                    <p class="mx-3">
                      <b>Language:</b>&nbsp;<span class="show-info-txt">{{
                        showDetails.language
                        }}</span>
                    </p>
                    <p class="mx-3">
                      <b>Status:</b>&nbsp;<span class="show-info-txt">{{
                        showDetails.status
                        }}</span>
                    </p>
                    <p class="mx-3">
                      <b>Show type:</b>&nbsp;<span class="show-info-txt">{{
                        showDetails.type
                        }}</span>
                    </p>
                    <p class="mx-3">
                      <b>Premiered:</b>&nbsp;<span class="show-info-txt">{{
                        showDetails.premiered
                        }}</span>
                    </p>
                    <p class="mx-3">
                      <b>Run time:</b>&nbsp;<span class="show-info-txt">{{ showDetails.runtime }}&nbsp;min</span>
                    </p>
                    <p class="mx-3">
                      <b>Official URL :</b>
                      <a class="url-look" :href="showDetails?.officialSite">
                        {{ showDetails.officialSite }}</a>
                    </p>
                    <p class="mx-3">
                      <b>Genres:&nbsp;</b><v-chip tile class="mr-1" text small color="orange"
                        v-for="(genre, i) in showDetails.genres" :key="i"><b>{{ genre }}</b></v-chip>
                    </p>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="pl-0 ml-0 mb-4" cols="12">
            <h3>Episodes</h3>
          </v-col>
          <v-row stretch no-gutters>
            <v-container class="pa-0" fluid>
              <v-data-table :headers="headers" :items="episodes" fixed-header :items-per-page="10" class="elevation-2">
                <template v-slot:[`item.name`]="{ item }">
                  <div class="episode-name-col pt-2">
                    <b>{{ item.name }}</b><a style="cursor: pointer" :href="item.url">
                      <v-img class="mb-1" width="80" height="60" alt :src="item.image.medium" /></a>
                  </div>
                </template>
                <template v-slot:[`item.rating.average`]="{ item }">
                  <div class="pt-2">
                    <v-icon color="orange" dark> mdi-star </v-icon>
                    {{
                    item.rating.average
                    ? (item.rating.average / 2).toFixed(1)
                    : 0
                    }}/5
                  </div>
                </template>
              </v-data-table>
            </v-container>
          </v-row>
        </v-row>
        <v-col class="pl-0 ml-0 mb-2" cols="12">
          <h3>Cast Details</h3>
        </v-col>
        <v-row>
          <v-col xs="3" sm="3" md="2" v-for="(cast, i) in limitedcastDetail" :key="i">
            <CharactorCard :cast="cast" />
          </v-col>
        </v-row>
        <v-col class="pl-0 mt-2" v-if="castDetail.length > 6" cols="12">
          <v-btn @click="viewMoreLessCast()" class="primary--text" small text type="text"><b>{{
              enableViewCastButton ? "show more casts..." : "show less casts..."
              }}</b></v-btn>
        </v-col>
      </v-col>
    </v-row>
    <v-row v-else justify="space-between space-around">
      <v-col class="center-text">
        <v-progress-circular color="primary" :size="70" :width="7" indeterminate></v-progress-circular>
        <h2>Loading in progress ...</h2>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useTvStore } from '@/stores/tvShowsListStore';
import { useTvShowDetailsStore } from '@/stores/tvShowDetailsStore';
import { useRouter, useRoute } from 'vue-router';
import ShowCard from "@/components/ShowCard.vue";
import CharactorCard from "@/components/CharactorCard.vue";

// access the `store` variable anywhere in the component ✨

const store = useTvStore()
const store1 = useTvShowDetailsStore()
const router = useRouter()
const route = useRoute()

const headers = ref([
  {
    title: "Name",
    align: "start",
    value: "name",
    sortable: true,
  },
  { title: "Season", value: "season", sortable: true, },
  { title: "Air Time", value: "airtime", sortable: true, },
  { title: "Run Time", value: "runtime", sortable: true, },
  { title: "Type", value: "type", sortable: true, },
  { title: "Air Date", value: "airdate", sortable: true, },
  { title: "Ratings", value: "rating.average", sortable: true, },
]);
const enableViewCastButton = ref(true);

const seriesId = computed(() => route?.params?.showId);
const showDetails = computed(() => store1.showDetails);
const episodes = computed(() => store1.episodes);
const castDetail = computed(() => store1.castDetail);
const limitedcastDetail = computed(() => store1.limitedcastDetail);

function backClick() {
  router.push({ path: "/" });
}

function viewMoreLessCast() {
  store1.limitedcastDetail = [];
  enableViewCastButton.value = !enableViewCastButton.value;
  store1.limitedcastDetail = enableViewCastButton.value
    ? castDetail.value.slice(0, 6)
    : castDetail.value;
}

store1.detailsOfShow(seriesId.value);

store1.getCastingDetails(seriesId.value);

store1.getEpisodes(seriesId.value);
</script>
<style scoped>
.small-text-size {
  font-size: 12px;
}

.show-info-txt {
  font-size: 14px;
  color: grey;
  font-weight: bold;
}

.url-look {
  word-wrap: break-all;
  cursor: pointer;
}

.center-text {
  height: calc(100vh - 128px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.summary-div {
  font-weight: 500;
}

.episode-name-col {
  min-height: 80px;
  min-width: 120px;
}
</style>
