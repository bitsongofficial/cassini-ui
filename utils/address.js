import { Bech32 } from "@cosmjs/encoding";

export function isValidAddress(input, requiredPrefix) {
  try {
    const { prefix, data } = Bech32.decode(input);
    if (prefix !== requiredPrefix) {
      return false;
    }
    return data.length === 20;
  } catch {
    return false;
  }
}
