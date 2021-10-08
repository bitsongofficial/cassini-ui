import { BigNumber } from "bignumber.js";
import { getField, updateField } from 'vuex-map-fields';

export const state = () => ({
  fromNetwork: '',
  toNetwork: '',
  recipient: '',
  amount: 0
})

export const getters = {
  getField,
  fromNetwork: state => state.fromNetwork,
  toNetwork: state => state.toNetwork,
  recipient: state => state.recipient,
  amount: state => state.amount,
  amountToTransfer: state => new BigNumber(state.amount).toFixed(2),
  bridgeFee: state => new BigNumber(state.amount).multipliedBy(new BigNumber(process.env.BRIDGE_FEE)).toFixed(2),
  amountYouGet: (state, getters) => new BigNumber(getters.amountToTransfer).minus(new BigNumber(getters.bridgeFee)).toFixed(2)
}

export const mutations = {
  updateField
}
