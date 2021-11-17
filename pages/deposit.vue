<template>
  <div>
    <transfer-card class="mb-12" v-on:connect="openDialogConnectWalletEthereum">
    </transfer-card>

    <dialog-connect-wallet-ethereum
      v-model="dialogConnectWalletEthereum"
      @connect="onConnect"
      @close="onClose"
    >
    </dialog-connect-wallet-ethereum>
  </div>
</template>

<script>
import TransferCard from "@/components/transfer/TransferCard.vue";
import DialogConnectWalletEthereum from "@/components/dialog/ConnectWalletEthereum.vue";

export default {
  components: {
    TransferCard,
    DialogConnectWalletEthereum
  },

  data() {
    return {
      dialogConnectWalletEthereum: false
    };
  },

  methods: {
    openDialogConnectWalletEthereum() {
      this.dialogConnectWalletEthereum = true;
    },

    onConnect() {
      this.dialogConnectWalletEthereum = false;
    },

    onClose() {
      this.dialogConnectWalletEthereum = false;
    }
  }
};
</script>
