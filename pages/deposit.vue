<template>
  <div>
    <deposit-card
      class="mb-12"
      v-on:connect-wallet-dialog="openConnectWalletDialog"
      v-on:deposit="onDeposit"
    >
    </deposit-card>

    <connect-eth-wallet
      v-model="connectWalletDialog"
      v-on:connect="onConnect"
      v-on:close="onClose"
    ></connect-eth-wallet>
  </div>
</template>

<script>
import DepositCard from "@/components/deposit/Card.vue";
import ConnectEthWallet from "@/components/ConnectEthWallet.vue";

export default {
  components: {
    DepositCard,
    ConnectEthWallet
  },

  data() {
    return {
      connectWalletDialog: false
    };
  },

  methods: {
    openConnectWalletDialog() {
      this.connectWalletDialog = true;
    },

    onDeposit() {
      this.deposit({
        amount: new BigNumber(this.amount).toString()
      });
    },

    onConnect(address) {
      this.connectWalletDialog = false;
      this.from = address;
    },

    onClose() {
      this.connectWalletDialog = false;
    }
  }
};
</script>
