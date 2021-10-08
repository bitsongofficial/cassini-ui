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
          :messages="amountMessages"
        >
          <template v-slot:append>
            <v-btn text @click.stop="">Max</v-btn>
          </template>
        </v-text-field>
      </validation-provider>

      <transfer-card-overview></transfer-card-overview>
    </v-col>
  </v-row>
</template>

<script>
import { ValidationProvider, Validator } from "vee-validate";
import { utils } from "ethers";
import { mapFields } from "vuex-map-fields";

import { isValidAddress } from "@/utils/address";

import TransferCardOverview from "@/components/transfer/TransferCardOverview.vue";

Validator.extend("validAddress", {
  getMessage: () => "The address is not a valid bitsong address",
  validate: (value) => !!isValidAddress(value, "bitsong"),
});

export default {
  name: "TransferCardForm",

  props: {
    balance: {
      type: String | Number,
      default: () => 0,
    },
  },

  components: {
    ValidationProvider,
    TransferCardOverview,
  },

  computed: {
    ...mapFields("transfer", ["recipient", "amount"]),
    amountRules: () => ({ required: true, decimal: 18 }),
    addressRules: () => ({ required: true, validAddress: true }),
    amountMessages: function () {
      return [
        `Your balance is ${utils.formatUnits(this.balance.toString(), 18)}btsg`,
      ];
    },
  },
};
</script>

<style>
.v-text-field.text-field-amount .v-input__append-inner {
  margin-top: 12px;
}
</style>
