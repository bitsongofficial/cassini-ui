<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.smAndDown"
    persistent
    :value="show"
    max-width="400"
  >
    <v-card>
      <v-toolbar flat color="transparent">
        <v-toolbar-title>Select wallet</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn :disabled="loading.metamask" icon dark @click.stop="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-card outlined class="mb-4">
          <v-list-item @click.stop="connectMetamask">
            <v-list-item-avatar>
              <img src="/metamask.svg" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold"
                >Metamask</v-list-item-title
              >
              <v-list-item-subtitle v-if="errors.metamask" class="red--text">{{
                errors.metamask
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon v-if="!loading.metamask">
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
        <v-card outlined>
          <v-list-item @click.stop="">
            <v-list-item-avatar>
              <img src="/walletconnect.svg" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold"
                >Wallet Connect</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers, utils, Contract } from "ethers";

export default {
  props: {
    show: {
      type: Boolean,
      default: () => false
    }
  },

  data() {
    return {
      loading: {
        metamask: false,
        walletConnet: false
      },
      errors: {
        metamask: null
      },
      address: null
    };
  },

  methods: {
    resetErrors() {
      this.errors.metamask = null;
    },

    toggleLoading() {
      this.loading.metamask = !this.loading.metamask;
      this.$emit("loading", this.loading.metamask);
    },

    close() {
      this.$emit("close");
    },

    async connectMetamask() {
      if (this.loading.metamask) return;

      this.resetErrors();
      this.toggleLoading();

      const metamask = await detectEthereumProvider();

      if (!metamask) {
        this.errors.metamask = "Unable to detect Metamask";
        this.toggleLoading();
        return;
      }

      try {
        await window.ethereum.enable();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        this.$emit("connect", address);
      } catch (err) {
        console.error(err);
      } finally {
        this.toggleLoading();
      }
    }
  }
};
</script>
