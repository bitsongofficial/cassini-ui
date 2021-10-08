<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.smAndDown"
    persistent
    :value="value"
    max-width="400"
  >
    <v-card>
      <v-toolbar flat color="transparent">
        <v-toolbar-title>Select wallet</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn :disabled="loading" icon dark @click.stop="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-card
          outlined
          class="mb-4"
          v-for="provider in providers"
          :key="provider.id"
        >
          <v-list-item @click.stop="connectProvider(provider.id)">
            <v-list-item-avatar>
              <img :src="provider.icon" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                {{ provider.name }}
              </v-list-item-title>
              <v-list-item-subtitle v-if="provider.errors" class="red--text">
                {{ provider.errors }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon v-if="!provider.loading">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>

              <v-progress-circular
                v-else
                indeterminate
                size="24"
                color="grey lighten-1"
              ></v-progress-circular>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DialogConnectWalletEthereum",

  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
  },

  watch: {
    address: {
      immediate: false,
      handler(address) {
        this.$emit("close");
        this.$emit("connect", address);
      },
    },
  },

  computed: {
    ...mapGetters("ethereum", [`address`, `loading`, `providers`]),
  },

  methods: {
    ...mapActions("ethereum", [`connectMetamask`, `connectWalletConnect`]),

    close() {
      this.$emit("close");
    },

    connectProvider(id) {
      switch (id) {
        case `walletconnect`:
          this.connectWalletConnect();
          break;
        default:
          this.connectMetamask();
          break;
      }
    },
  },
};
</script>
