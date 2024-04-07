import { defineStore } from 'pinia'
import {ref} from 'vue';
import SeriesService from "@/seriesService/tv-service.js";

const SeriesService1 = new SeriesService();

export const useTvStore = defineStore('tvStore', () => {
    const loading = ref(false);
    const tvSeriesName = ref('');
    const showsData = ref([]);
    const searchedshowsData = ref([]);
    const differentGenres = ref([
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
    ]);

    /* filters for shows on different genres */

    function getDiffGenresShows() {
      for (let i = 0; i < differentGenres.value.length; i++)
        differentGenres.value[i].filterdShows = showsData.value.filter((show) =>
          show.genres.includes(differentGenres.value[i].label)
        );
    }
  /* get api call to fetch the list of tv series */
    function getTvSeriesData() {
      showsData.value = [];
      loading.value = true;
      SeriesService1.seriesList()
        .then((response) => {
          showsData.value = response.data.sort((a, b) => {
            return b.rating.average - a.rating.average;
          });
        })
        .catch(() => {
          showsData.value = [];
        })
        .finally(() => {
          loading.value=false;
          getDiffGenresShows();
        });
    }

    function searchedShowDataFn(val) {
      searchedshowsData.value = [];
      loading.value=true;
      SeriesService1.serachList(val)
        .then((response) => {
          searchedshowsData.value.push(response.data);
        })
        .catch(() => {
          searchedshowsData.value = [];
        })
        .finally(() => {
          loading.value=false;
        });
    }

    return { loading, tvSeriesName, searchedshowsData, getTvSeriesData, searchedShowDataFn, differentGenres }
  })