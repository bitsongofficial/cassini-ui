<template>
  <v-card flat>
    <card-title></card-title>

    <v-container>
      <card-chains></card-chains>

      <validation-observer ref="observer">
        <card-form :balance="balance"></card-form>
        <card-actions
          v-on:connect-wallet-dialog="$emit('connectWalletDialog')"
          v-on:deposit="$emit('deposit')"
        >
        </card-actions>
      </validation-observer>
    </v-container>
  </v-card>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapGetters } from "vuex";

import CardTitle from "@/components/deposit/card/Title.vue";
import CardChains from "@/components/deposit/card/Chains.vue";
import CardForm from "@/components/deposit/card/Form.vue";
import CardActions from "@/components/deposit/card/Actions.vue";

export default {
  components: {
    ValidationObserver,
    CardTitle,
    CardChains,
    CardForm,
    CardActions
  },

  computed: {
    ...mapGetters("ethereum", ["address", "balance"])
  }
};
</script>
