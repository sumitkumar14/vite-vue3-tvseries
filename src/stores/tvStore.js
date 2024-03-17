import { defineStore } from 'pinia'
import {ref} from 'vue';

export const useTvStore = defineStore('tvStore', () => {
    const loading = ref(false);
    const tvSeriesName = ref('');

    function startLoading() {
      loading.value=true;
    }

    function setTvSeriesName(name='hello') {
      tvSeriesName.value = name;
    }

    function stopLoading() {
      loading.value=false;
    }
    return { loading, tvSeriesName, startLoading, setTvSeriesName, stopLoading }
  })