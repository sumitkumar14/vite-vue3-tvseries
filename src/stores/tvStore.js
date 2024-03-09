import { defineStore } from 'pinia'
import {ref} from 'vue';

export const useTvStore = defineStore('tvStore', () => {
    const loading = ref(false);

    function startLoading() {
      loading.value=true;
    }

    function stopLoading() {
      loading.value=false;
    }
    return { loading, startLoading, stopLoading }
  })