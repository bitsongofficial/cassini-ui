<template>
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

      <deposit-card-overview></deposit-card-overview>
    </v-col>
  </v-row>
</template>

<script>
import { ValidationProvider, Validator } from "vee-validate";

import { isValidAddress } from "@/utils/address";
import { utils } from "ethers";

import { mapFields } from "vuex-map-fields";

import DepositCardOverview from "@/components/deposit/card/Overview.vue";

Validator.extend("validAddress", {
  getMessage: field => "The address is not a valid bitsong address",
  validate: value => !!isValidAddress(value, "bitsong")
});

export default {
  props: {
    balance: {
      type: String | Number,
      default: () => 0
    }
  },

  components: {
    ValidationProvider,
    DepositCardOverview
  },

  methods: {
    formatNumber(number) {
      return utils.formatUnits(number, 18);
    }
  },

  computed: {
    ...mapFields("deposit", ["recipient", "amount"]),

    addressRules() {
      return {
        required: true,
        validAddress: true
      };
    },

    amountRules() {
      return {
        required: true,
        decimal: 18
      };
    }
  }
};
</script>

<style>
.v-text-field.text-field-amount .v-input__append-inner {
  margin-top: 12px;
}
</style>
