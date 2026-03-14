<template>
  <v-container fluid class="pa-4">

    <!-- Back Button -->
    <v-row>
      <v-col cols="12">
        <v-btn icon @click="backClick()" color="black">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Show Header -->
    <v-row v-if="!store?.loading">

      <!-- Poster -->
      <v-col cols="12" md="4">
        <ShowCard :showInfo="showDetails" />
      </v-col>

      <!-- Show Information -->
      <v-col cols="12" md="8">

        <!-- Summary -->
        <v-card class="pa-4 mb-4">
          <div class="summary-div" v-html="showDetails.summary"></div>
        </v-card>

        <!-- Info -->
        <v-card class="pa-4">
          <v-card-title>Show Information</v-card-title>

          <v-row>

            <v-col cols="12" sm="6" v-if="showDetails?.network?.country">
              <b>Country:</b>
              <span class="show-info-txt">
                {{ showDetails.network.country.name }}
              </span>
            </v-col>

            <v-col cols="12" sm="6" v-if="showDetails?.network?.name">
              <b>Network:</b>
              <span class="show-info-txt">
                {{ showDetails.network.name }}
              </span>
            </v-col>

            <v-col cols="12" sm="6">
              <b>Language:</b>
              <span class="show-info-txt">
                {{ showDetails.language }}
              </span>
            </v-col>

            <v-col cols="12" sm="6">
              <b>Status:</b>
              <span class="show-info-txt">
                {{ showDetails.status }}
              </span>
            </v-col>

            <v-col cols="12" sm="6">
              <b>Show Type:</b>
              <span class="show-info-txt">
                {{ showDetails.type }}
              </span>
            </v-col>

            <v-col cols="12" sm="6">
              <b>Premiered:</b>
              <span class="show-info-txt">
                {{ showDetails.premiered }}
              </span>
            </v-col>

            <v-col cols="12" sm="6">
              <b>Runtime:</b>
              <span class="show-info-txt">
                {{ showDetails.runtime }} min
              </span>
            </v-col>

            <v-col cols="12">
              <b>Genres:</b>
              <v-chip
                v-for="(genre,i) in showDetails.genres"
                :key="i"
                small
                color="orange"
                class="mr-1"
              >
                {{ genre }}
              </v-chip>
            </v-col>

            <v-col cols="12">
              <b>Official URL:</b>
              <a
                class="url-look"
                :href="showDetails?.officialSite"
                target="_blank"
              >
                {{ showDetails.officialSite }}
              </a>
            </v-col>

          </v-row>
        </v-card>

      </v-col>
    </v-row>

    <!-- Episodes Section -->
    <v-row class="mt-6">

      <v-col cols="12">
        <h2>Episodes</h2>
      </v-col>

      <v-col cols="12">

        <div class="table-wrapper">

          <v-data-table
            :headers="headers"
            :items="episodes"
            :items-per-page="10"
            class="elevation-1"
          >

            <!-- Episode Name + Image -->
            <template v-slot:item.name="{ item }">

              <div class="d-flex align-center">

                <v-img
                  :src="item.image?.medium"
                  width="80"
                  height="60"
                  class="mr-3"
                />

                <div>
                  <b>{{ item.name }}</b>
                </div>

              </div>

            </template>

            <!-- Ratings -->
            <template v-slot:item.rating.average="{ item }">

              <v-icon color="orange">mdi-star</v-icon>

              {{
                item.rating.average
                ? (item.rating.average / 2).toFixed(1)
                : 0
              }}/5

            </template>

          </v-data-table>

        </div>

      </v-col>

    </v-row>

    <!-- Cast Section -->
    <v-row class="mt-6">

      <v-col cols="12">
        <h2>Cast Details</h2>
      </v-col>

      <v-col
        cols="6"
        sm="4"
        md="2"
        v-for="(cast, i) in limitedcastDetail"
        :key="i"
      >
        <CharactorCard :cast="cast" />
      </v-col>

      <v-col cols="12" v-if="castDetail.length > 6">

        <v-btn
          small
          text
          class="primary--text"
          @click="viewMoreLessCast()"
        >

          <b>
            {{
              enableViewCastButton
              ? "Show More Casts..."
              : "Show Less Casts..."
            }}
          </b>

        </v-btn>

      </v-col>

    </v-row>

    <!-- Loader -->
    <v-row v-if="store?.loading" justify="center" class="mt-10">

      <v-progress-circular
        indeterminate
        size="70"
        width="7"
        color="primary"
      />

    </v-row>

  </v-container>
</template>

<script setup>

import { ref, computed } from 'vue'
import { useTvStore } from '@/stores/tvShowsListStore'
import { useTvShowDetailsStore } from '@/stores/tvShowDetailsStore'
import { useRouter, useRoute } from 'vue-router'

import ShowCard from "@/components/ShowCard.vue"
import CharactorCard from "@/components/CharactorCard.vue"

const store = useTvStore()
const store1 = useTvShowDetailsStore()

const router = useRouter()
const route = useRoute()

const headers = ref([
  { title: "Name", value: "name", sortable: true },
  { title: "Season", value: "season", sortable: true },
  { title: "Air Time", value: "airtime", sortable: true },
  { title: "Run Time", value: "runtime", sortable: true },
  { title: "Type", value: "type", sortable: true },
  { title: "Air Date", value: "airdate", sortable: true },
  { title: "Ratings", value: "rating.average", sortable: true }
])

const enableViewCastButton = ref(true)

const seriesId = computed(() => route?.params?.showId)

const showDetails = computed(() => store1.showDetails)
const episodes = computed(() => store1.episodes)
const castDetail = computed(() => store1.castDetail)
const limitedcastDetail = computed(() => store1.limitedcastDetail)

function backClick() {
  router.push({ path: "/" })
}

function viewMoreLessCast() {

  store1.limitedcastDetail = []

  enableViewCastButton.value = !enableViewCastButton.value

  store1.limitedcastDetail = enableViewCastButton.value
    ? castDetail.value.slice(0, 6)
    : castDetail.value
}

store1.detailsOfShow(seriesId.value)
store1.getCastingDetails(seriesId.value)
store1.getEpisodes(seriesId.value)

</script>

<style scoped>

.summary-div {
  font-weight: 500;
}

.show-info-txt {
  font-size: 14px;
  color: grey;
  font-weight: bold;
}

.url-look {
  word-wrap: break-all;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.center-text {
  height: calc(100vh - 128px);
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
