<template>
    <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
            <h2 style="cursor: pointer;" @click="back()"><v-icon class="mb-1 mr-1">mdi-television</v-icon>TV Shows{{tvSeriesName?` /
                ${tvSeriesName}`:''}}</h2>
        </div>
    </v-app-bar>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useTvStore } from '@/stores/tvStore'
import { computed } from 'vue';

const store = useTvStore();
const router = useRouter();
const tvSeriesName = computed(() => store.tvSeriesName);
function back() {
    router.push({ path: "/" });
}
</script>