<template>
  <v-row>
    <v-col sm="12" lg="5">
      <div class="overline">FROM</div>
      <chain-card network="Ethereum" :address="address" />
    </v-col>

    <v-col
      v-if="$vuetify.breakpoint.lgAndUp"
      lg="2"
      class="d-flex justify-center align-center text-center"
    >
      <v-icon class="pt-8">mdi-arrow-right</v-icon>
    </v-col>

    <v-col sm="12" lg="5">
      <div class="overline">TO</div>
      <chain-card network="BitSong" :address="recipient" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("ethereum", ["address", "recipient"])
  }
};
</script>
