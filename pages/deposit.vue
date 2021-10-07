<template>
  <v-card flat>
    <v-toolbar flat color="transparent">
      <v-btn icon to="/">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-toolbar-title class="headline">Deposit</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container>
      <v-row>
        <v-col sm="12" lg="6">
          <div class="overline">FROM</div>
          <chain-card network="Ethereum" :address="address" />
        </v-col>

        <v-col
          v-if="$vuetify.breakpoint.mdAndUp"
          md="1"
          class="d-flex align-center"
        >
          <v-icon class="pt-8">mdi-arrow-right</v-icon>
        </v-col>

        <v-col sm="12" lg="5">
          <div class="overline">TO</div>
          <chain-card network="BitSong" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12"
          ><v-text-field outlined label="BitSong address"></v-text-field>
          <v-text-field outlined label="Amount"></v-text-field>
          <v-card style="background-color:hsla(0,0%,100%,.04)">
            <div class="pa-4 d-flex flex-column">
              <div class="d-flex pb-2">
                <div class="font-weight-bold body-2">Amount to transfer:</div>
                <div class="ml-auto body-2">10 BTSG</div>
              </div>
              <div class="d-flex pb-2">
                <div class="font-weight-bold body-2">Bridge fee:</div>
                <div class="ml-auto body-2">10 BTSG</div>
              </div>
              <div class="d-flex pb-2">
                <div class="font-weight-bold body-2">Network fee:</div>
                <div class="ml-auto body-2">10 BTSG</div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn
            block
            large
            color="secondary"
            @click.stop="openConnectWalletDialog"
            >Connect Wallet</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <connect-eth-wallet
      :show="connectWalletDialog"
      v-on:connect="onConnect"
      v-on:loading="onLoading"
      v-on:close="onClose"
    ></connect-eth-wallet>
  </v-card>
</template>

<script>
import ChainCard from "@/components/ChainCard.vue";
import ConnectEthWallet from "~/components/ConnectEthWallet.vue";

export default {
  components: {
    ChainCard,
    ConnectEthWallet
  },

  data() {
    return {
      connectWalletDialog: false,
      address: null,
      dialogProminent: false
    };
  },

  methods: {
    openConnectWalletDialog() {
      this.connectWalletDialog = true;
    },

    onConnect(address) {
      this.connectWalletDialog = false;
      this.address = address;
    },

    onLoading(status) {
      this.dialogProminent = status;
    },

    onClose() {
      console.log("close");
      this.connectWalletDialog = false;
    }
  }
};
</script>
