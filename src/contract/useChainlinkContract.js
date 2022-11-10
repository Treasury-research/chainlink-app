import { contracts } from "../config";
import useContract from "../hooks/useContract";
import ChainlinkAbi from "./abi/Chainlink.json";

export default function useChainlinkContract() {
  const contract = useContract(ChainlinkAbi, contracts.chainlink);

  return {
    async getPageRank() {
      return await contract.methods.getPageRank().call();
    },
  };
}
