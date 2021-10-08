<template>
  <v-card class="pa-2 transfer-card-chain-item" height="72">
    <v-list-item class="pl-1">
      <v-list-item-avatar :color="chainColor">
        <v-img contain :src="chainAvatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">
          {{ network }} Mainnet
        </v-list-item-title>

        <v-list-item-subtitle v-if="address">
          {{ address }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "TransferCardChainItem",

  props: {
    network: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      require: false,
    },
  },

  computed: {
    chainAvatar: function () {
      return `/${this.network.toLowerCase()}.svg`;
    },
    chainColor: function () {
      return this.network.toLowerCase() === "ethereum" ? `white` : ``;
    },
  },
};
</script>

<style>
.transfer-card-chain-item {
  background-color: hsla(0, 0%, 100%, 0.04);
}
</style>
