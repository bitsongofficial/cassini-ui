<template>
  <v-card flat>
    <transfer-card-title></transfer-card-title>

    <v-container>
      <transfer-card-chain></transfer-card-chain>

      <validation-observer ref="observer">
        <transfer-card-form :balance="balance"></transfer-card-form>

        <transfer-card-actions
          v-on:connect-wallet-dialog="$emit('connectWalletDialog')"
          v-on:deposit="$emit('deposit')"
        >
        </transfer-card-actions>
      </validation-observer>
    </v-container>
  </v-card>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapGetters } from "vuex";

import TransferCardTitle from "@/components/transfer/TransferCardTitle.vue";
import TransferCardChain from "@/components/transfer/TransferCardChain.vue";
import TransferCardForm from "@/components/transfer/TransferCardForm.vue";
import TransferCardActions from "@/components/transfer/TransferCardActions.vue";

export default {
  name: "TransferCard",

  components: {
    ValidationObserver,
    TransferCardTitle,
    TransferCardChain,
    TransferCardForm,
    TransferCardActions,
  },

  computed: {
    ...mapGetters("ethereum", ["address", "balance"]),
  },
};
</script>
