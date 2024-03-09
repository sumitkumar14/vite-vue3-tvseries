<template>
  <v-card v-if="showInfo && Object.keys(showInfo).length" @click="moveTodetails(showInfo.id)" class="ma-0">
    <v-row no-gutters class="text-center">
      <v-col cols="12">
        <v-img alt :src="showInfo?.image?.medium" />
        <div class="mt-1"><b>{{ showInfo.name }}</b></div>
        <v-rating color="orange" small v-model="scaleRating" readonly half-increments></v-rating>
        <div> <b>{{ showInfo.rating.average ? scaleRating : 0 }}/5</b></div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  showInfo: Object
});
const emit = defineEmits(['card-click'])

const scaleRating = computed(() => Number((props.showInfo.rating.average / 2).toFixed(1)));

function moveTodetails(id1) {
  emit("card-click", id1);
}
</script>