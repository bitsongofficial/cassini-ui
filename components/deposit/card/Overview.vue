<template>
  <v-card style="background-color:hsla(0,0%,100%,.04)">
    <div class="pa-4 d-flex flex-column">
      <div class="d-flex pb-2">
        <div class="font-weight-bold body-2">Amount to transfer</div>
        <div class="ml-auto body-2">{{ amountToTransfer }} BTSG</div>
      </div>
      <div class="d-flex pb-2">
        <div class="font-weight-bold body-2">Bridge fee</div>
        <div class="ml-auto body-2">- {{ bridgeFee }} BTSG</div>
      </div>
      <v-divider class="pb-2"></v-divider>
      <div class="d-flex font-weight-bold body-1">
        <div>Amount you get</div>
        <div class="ml-auto">{{ amountYouGet }} BTSG</div>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("deposit", ["amountToTransfer", "bridgeFee", "amountYouGet"])
  }
};
</script>
