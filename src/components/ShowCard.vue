<template>
  <v-card v-if="showInfo && Object.keys(showInfo).length " @click="moveTodetails(showInfo.id)" class="ma-0">
    <v-row no-gutters class="text-center">
      <v-col cols="12">
          <v-img  alt :src="showInfo.image.medium" />
          <div class="mt-1"><b>{{showInfo.name}}</b></div>
          <v-rating color="orange" small v-model="scaleRating" readonly half-increments></v-rating><div> <b>{{ showInfo.rating.average?scaleRating:0 }}/5</b></div>
      </v-col>
      </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ShowCard",
  props: {
    showInfo: Object
  },
  data: () => ({}),
  computed: {
    scaleRating: function () {
      return Number((this.showInfo.rating.average/2).toFixed(1));
    },
  },
  methods: {
    moveTodetails(id1) {
      this.$emit("card-click", id1);
    },
  },
};
</script>