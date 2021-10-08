<template>
  <v-row>
    <v-col cols="12">
      <v-btn
        block
        large
        color="accent"
        @click.stop="setApprove"
        class="mb-4 font-weight-bold"
        style="text-transform: none"
        :disabled="approveLoading"
        v-if="address && mustApprove"
      >
        <v-progress-circular
          v-if="approveLoading"
          indeterminate
          size="24"
        ></v-progress-circular>
        <div v-else>
          Allow the BitSong Bridge to use your BTSG

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                dark
                size="20"
                right
                class="mt-n1"
                v-bind="attrs"
                v-on="on"
                >mdi-information-outline</v-icon
              >
            </template>
            <span
              >You must give the BitSong Bridge smart contracts permission to
              use your BTSG. This is a one-time operation.</span
            >
          </v-tooltip>
        </div>
      </v-btn>

      <v-btn
        block
        large
        color="secondary"
        @click.stop="$emit('connectWalletDialog')"
        v-if="address === null"
        >Connect Wallet</v-btn
      >
      <v-btn
        :disabled="(address && mustApprove) || depositLoading"
        block
        large
        color="secondary"
        @click.stop="$emit('deposit')"
        v-else
      >
        <v-progress-circular
          v-if="depositLoading"
          indeterminate
          size="24"
        ></v-progress-circular>
        <div v-else>Deposit {{ amountYouGet }} BTSG</div>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TransferCardActions",

  methods: {
    ...mapActions("ethereum", [`setApprove`, `deposit`]),
  },

  computed: {
    ...mapGetters("ethereum", [
      "address",
      "balance",
      "mustApprove",
      "approveLoading",
      "depositLoading",
    ]),
  },
};
</script>
