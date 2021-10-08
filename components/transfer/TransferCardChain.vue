<template>
  <v-row>
    <v-col sm="12" lg="5">
      <div class="overline">FROM</div>
      <transfer-card-chain-item network="Ethereum" :address="address">
      </transfer-card-chain-item>
    </v-col>

    <v-col
      v-if="$vuetify.breakpoint.lgAndUp"
      class="d-flex justify-center align-center text-center"
      lg="2"
    >
      <v-icon class="pt-8">mdi-arrow-right</v-icon>
    </v-col>

    <v-col sm="12" lg="5">
      <div class="overline">TO</div>
      <transfer-card-chain-item network="BitSong" :address="recipient">
      </transfer-card-chain-item>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

import TransferCardChainItem from "@/components/transfer/TransferCardChainItem.vue";

export default {
  name: "TransferCardChain",

  components: {
    TransferCardChainItem,
  },

  computed: {
    ...mapGetters("ethereum", ["address"]),
    ...mapGetters("transfer", ["recipient"]),
  },
};
</script>
