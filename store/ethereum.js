import detectEthereumProvider from "@metamask/detect-provider";
import { providers, utils, Contract } from "ethers";

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

let subscription

export const state = () => ({
  mustApprove: true,
  pendingTransactions: [],
  address: null,
  chainId: null,
  providers: {
    metamask: {
      id: 'metamask',
      icon: `/metamask.svg`,
      name: `Metamask`,
      loading: false,
      errors: null
    },
    walletConnect: {
      id: 'walletconnect',
      icon: `/walletconnect.svg`,
      name: `Wallet Connect`,
      loading: false,
      errors: null
    },
  }
})

export const getters = {
  mustApprove: state => state.mustApprove,
  providers: state => state.providers,
  pendingTransactions: state => state.pendingTransactions,
  address: state => state.address,
  loading: state => state.providers.metamask.loading
}

export const mutations = {
  setLoadingMetamask: (state, payload) => state.providers.metamask.loading = payload,
  setMetamaskErrors: (state, payload) => state.providers.metamask.errors = payload,
  setWalletConnectErrors: (state, payload) => state.providers.walletConnect.errors = payload,
  setAddress: (state, payload) => state.address = payload,
  setChainId: (state, payload) => state.chainId = payload,
  setApprove: (state, payload) => state.mustApprove = payload,
  addPendingTransaction: (state, payload) => state.pendingTransactions.push(payload),
  removePendingTransaction: (state, payload) => {
    const i = state.pendingTransactions.findIndex(t => t === payload)
    state.pendingTransactions.splice(i, 1)
  }
}

export const actions = {
  async connectMetamask({ getters, commit }) {
    if (getters.loading.metamask) return

    // reset provider errors
    commit('setMetamaskErrors', null)

    // set loading
    commit('setLoadingMetamask', true)

    // detect provider
    const metamask = await detectEthereumProvider();

    // if provider not found
    if (!metamask) {
      commit('setMetamaskErrors', 'Unable to detect')
      commit('setLoadingMetamask', false)
      return;
    }

    try {
      await window.ethereum.enable();

      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      commit('setAddress', address)

      return;
    } catch (err) {
      console.error(err);
    } finally {
      commit('setLoadingMetamask', false)
    }
  },

  async connectWalletConnect({ getters, commit }) {
    if (getters.loading.walletConnect) return

    // reset provider errors
    commit('setWalletConnectErrors', null)

    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal
    });

    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      connector.createSession();
    }

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        commit('setWalletConnectErrors', error)
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];

      commit('setAddress', accounts[0])
      commit('setChainId', chainId)
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];

      commit('setAddress', accounts[0])
      commit('setChainId', chainId)
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Delete connector
      commit('setAddress', null)
      commit('setChainId', null)
    });
  },

  addPendingTransaction({ commit, dispatch }, payload) {
    commit('addPendingTransaction', payload)

    dispatch('subscribe')
  },

  async subscribe({ getters, commit, dispatch }) {
    subscription = setInterval(async () => {
      const pendingTxs = getters.pendingTransactions

      if (pendingTxs.length > 0) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        for (const tx of pendingTxs) {
          const response = await provider.getTransactionReceipt(tx);

          // TODO: add check for status (0 error, 1 success)
          if (response !== null) {
            commit('removePendingTransaction', tx)
          }
        }
      } else {
        dispatch('unsubscribe')
      }
    }, 1500)
  },

  unsubscribe() {
    clearInterval(subscription)
  }
}
