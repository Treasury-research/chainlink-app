import { useMemo } from "react";
import Web3 from "web3";
import { endpoint } from "../config";

export default function useContract(ABI, address) {
  const web3 = new Web3(endpoint);
  return useMemo(() => {
    if (!web3) {
      return;
    }
    return new web3.eth.Contract(ABI, address);
  }, [web3]);
}
