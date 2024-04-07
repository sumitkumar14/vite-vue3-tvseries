import { defineStore } from 'pinia'
import { ref } from 'vue';
import SeriesService from "@/seriesService/tv-service.js";
import { useTvStore } from './tvShowsListStore';

const SeriesService1 = new SeriesService();

export const useTvShowDetailsStore = defineStore('tvShowDetailsStore', () => {
    const store = useTvStore();

    const showDetails = ref({});
    const castDetail = ref([]);
    const episodes = ref([]);
    const limitedcastDetail = ref([]);

    function detailsOfShow(seriesId) {
        store.loading = true;
        SeriesService1.seriesDetails(seriesId)
            .then((response) => {
                showDetails.value = response.data;
                store.tvSeriesName = showDetails.value.name;
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                store.loading = false;
            });
    }

    /* get api call to fetch the casting details of tv series */

    function getCastingDetails(seriesId) {
        SeriesService1.seriesCastDetails(seriesId)
            .then((response) => {
                castDetail.value = response.data;
                limitedcastDetail.value = response.data.slice(0, 6);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function getEpisodes(seriesId) {
        SeriesService1.seriesEpisodesDetails(seriesId)
            .then((response) => {
                episodes.value = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return {showDetails, castDetail, episodes, detailsOfShow, limitedcastDetail, getEpisodes, getCastingDetails }
})