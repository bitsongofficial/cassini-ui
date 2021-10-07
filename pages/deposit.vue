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
          <chain-card network="Ethereum" :address="from" />
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
          <chain-card network="BitSong" :address="recipient" />
        </v-col>
      </v-row>

      <validation-observer ref="observer">
        <v-row>
          <v-col cols="12">
            <validation-provider
              v-slot="{ errors }"
              name="address"
              :rules="addressRules"
            >
              <v-text-field
                outlined
                label="BitSong address"
                v-model="recipient"
                :error-messages="errors"
                class="pt-2"
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="amount"
              :rules="amountRules"
            >
              <v-text-field
                class="text-field-amount py-1"
                outlined
                v-model="amount"
                label="Amount"
                :error-messages="errors"
                type="number"
                :messages="[
                  `Your balance is ${formatNumber(balance.toString())}btsg`
                ]"
              >
                <template v-slot:append>
                  <v-btn text @click.stop="">Max</v-btn>
                </template>
              </v-text-field>
            </validation-provider>

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
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-btn
              block
              large
              color="secondary"
              @click.stop="openConnectWalletDialog"
              v-if="from === null"
              >Connect Wallet</v-btn
            >
            <v-btn block large color="secondary" @click.stop="transfer" v-else
              >Transfer BTSG</v-btn
            >
          </v-col>
        </v-row>
      </validation-observer>
    </v-container>

    <connect-eth-wallet
      v-model="connectWalletDialog"
      v-on:connect="onConnect"
      v-on:close="onClose"
    ></connect-eth-wallet>
  </v-card>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
  Validator
} from "vee-validate";
import { BigNumber } from "bignumber.js";
import { isValidAddress } from "@/utils/address";

Validator.extend("validAddress", {
  getMessage: field => "The address is not a valid bitsong address",
  validate: value => !!isValidAddress(value, "bitsong")
});

import ChainCard from "@/components/ChainCard.vue";
import ConnectEthWallet from "~/components/ConnectEthWallet.vue";

/// nuovo
import { mapGetters } from "vuex";
import { utils } from "ethers";

export default {
  components: {
    ChainCard,
    ConnectEthWallet,
    ValidationProvider,
    ValidationObserver
  },

  data() {
    return {
      connectWalletDialog: false,
      from: null,
      recipient: null,
      amount: 0
    };
  },

  methods: {
    openConnectWalletDialog() {
      this.connectWalletDialog = true;
    },

    onConnect(address) {
      this.connectWalletDialog = false;
      this.from = address;
    },

    onClose() {
      this.connectWalletDialog = false;
    },

    formatNumber(number) {
      return utils.formatUnits(number, 18);
    },

    transfer() {}
  },

  computed: {
    ...mapGetters("ethereum", ["balance"]),
    addressRules() {
      return {
        required: true,
        validAddress: true
      };
    },

    amountRules() {
      //const balance = new BigNumber(1000000000000000000);
      return {
        required: true,
        decimal: 18
      };
    },

    amountToTransfer() {
      return new BigNumber(this.amount).toFixed(2);
    },

    bridgeFee() {
      const bridgeFee = new BigNumber(0.3);
      return new BigNumber(this.amount).multipliedBy(bridgeFee).toFixed(2);
    },

    amountYouGet() {
      return new BigNumber(this.amountToTransfer)
        .minus(new BigNumber(this.bridgeFee))
        .toFixed(2);
    }
  }
};
</script>

<style>
.v-text-field.text-field-amount .v-input__append-inner {
  margin-top: 12px;
}
</style>
