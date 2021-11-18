import detectEthereumProvider from "@metamask/detect-provider";
import { providers, utils, Contract } from "ethers";

import WalletConnectProvider from "@walletconnect/web3-provider";

import { BigNumber } from "bignumber.js";

import * as Abi from '@/utils/abi'

let subscription, provider

export const state = () => ({
  mustApprove: true,
  approveLoading: false,
  depositLoading: false,
  pendingTransactions: [],
  address: null,
  balance: new BigNumber(0),
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
  approveLoading: state => state.approveLoading,
  depositLoading: state => state.depositLoading,
  providers: state => state.providers,
  pendingTransactions: state => state.pendingTransactions,
  address: state => state.address,
  balance: state => state.balance,
  loading: state => state.providers.metamask.loading
}

export const mutations = {
  setApproveLoading: (state, payload) => state.approveLoading = payload,
  setDepositLoading: (state, payload) => state.depositLoading = payload,
  setLoadingMetamask: (state, payload) => state.providers.metamask.loading = payload,
  setMetamaskErrors: (state, payload) => state.providers.metamask.errors = payload,
  setWalletConnectErrors: (state, payload) => state.providers.walletConnect.errors = payload,
  setAddress: (state, payload) => state.address = payload,
  setBalance: (state, payload) => state.balance = payload,
  setChainId: (state, payload) => state.chainId = payload,
  setApprove: (state, payload) => state.mustApprove = payload,
  addPendingTransaction: (state, payload) => state.pendingTransactions.push(payload),
  removePendingTransaction: (state, payload) => {
    const i = state.pendingTransactions.findIndex(t => t === payload)
    state.pendingTransactions.splice(i, 1)
  }
}

export const actions = {
  async connectMetamask({ getters, commit, dispatch }) {
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

      const chainId = await ethereum.request({ method: 'eth_chainId' });

      if (chainId !== process.env.NETWORK) {
        alert(`Wrong network, please select ${process.env.NETWORK_NAME}`)
        return
      }

      //ethereum.on('chainChanged', window.location.reload());

      provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      commit('setAddress', address)

      dispatch('getBalance')

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

    const wcProvider = new WalletConnectProvider({
      infuraId: process.env.INFURA,
    });

    //  Enable session (triggers QR Code modal)
    await wcProvider.enable();

    // Subscribe to accounts change
    wcProvider.on("accountsChanged", (accounts) => {
      console.log(accounts);
      commit('setAddress', accounts[0])
    });

    // Subscribe to chainId change
    wcProvider.on("chainChanged", (chainId) => {
      console.log(chainId);
      commit('setChainId', chainId)
    });

    // Subscribe to session disconnection
    wcProvider.on("disconnect", (code, reason) => {
      console.log(code, reason);
      commit('setAddress', null)
      commit('setChainId', null)
    });

    provider = new providers.Web3Provider(wcProvider);
  },

  async getBalance({ getters, commit, dispatch }) {
    try {
      const contract = new Contract(
        process.env.BTSG_CONTRACT,
        Abi.balanceOf,
        provider
      );

      const balance = await contract.balanceOf(getters.address);
      commit('setBalance', balance)

      dispatch('getAllowance')
    } catch (e) {
      console.error(e);
    }
  },

  async getAllowance({ getters, commit }) {
    try {
      const contract = new Contract(
        process.env.BTSG_CONTRACT,
        Abi.allowance,
        provider
      );

      const allowance = await contract.allowance(
        getters.address,
        process.env.BRIDGE_CONTRACT
      );

      const result = allowance.lt(getters.balance);
      commit('setApprove', result);
    } catch (e) {
      console.error(e);
    }
  },

  async setApprove({ commit, getters }) {
    try {
      commit('setApproveLoading', true)

      const signer = provider.getSigner();

      const contract = new Contract(
        process.env.BTSG_CONTRACT,
        Abi.setApprove,
        signer
      );

      const tx = await contract.approve(
        process.env.BRIDGE_CONTRACT,
        utils.parseUnits(getters.balance.toString(), 18)
      );

      let check = setInterval(async () => {
        const response = await provider.getTransactionReceipt(tx.hash);

        if (response !== null) {
          commit("setApprove", false);
          commit('setApproveLoading', false)

          clearInterval(check);
        }
      }, 1500);

    } catch (e) {
      commit('setApproveLoading', false)
      console.error(e);
    }
  },

  async deposit({ commit, getters, rootGetters }) {
    try {
      commit('setDepositLoading', true)

      const signer = provider.getSigner();

      const contract = new Contract(
        process.env.BRIDGE_CONTRACT,
        Abi.deposit,
        signer
      );

      const tx = await contract.deposit(
        utils.parseUnits(rootGetters['transfer/amount'], 18),
        rootGetters['transfer/recipient'],
      );

      let check = setInterval(async () => {
        const response = await provider.getTransactionReceipt(tx.hash);

        if (response !== null) {
          commit('transfer/clearForm', null, { root: true })

          commit('setDepositLoading', false)

          clearInterval(check);
        }
      }, 5000);
    } catch (e) {
      commit('setDepositLoading', false)
      console.error(e)
    }
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
