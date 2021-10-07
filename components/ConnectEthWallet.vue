<template>
  <v-card>
    <v-card-title>Select wallet</v-card-title>
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
</template>

<script>
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers, utils, Contract } from "ethers";

export default {
  data() {
    return {
      loading: {
        metamask: false,
        walletConnet: false
      },
      address: null
    };
  },

  methods: {
    async connectMetamask() {
      if (this.loading.metamask) return;

      this.loading.metamask = true;

      const metamask = await detectEthereumProvider();
      if (!metamask) {
        this.loading.metamask = false;
        // metamask not detected
        return;
      }

      try {
        await window.ethereum.enable();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        this.$emit("connect", address);

        console.log(address);
      } catch (err) {
        console.error(err);
      } finally {
        this.loading.metamask = false;
      }
    }
  }
};
</script>
