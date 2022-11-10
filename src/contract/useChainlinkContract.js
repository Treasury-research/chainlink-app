import { contracts } from "../config";
import useWeb3Context from "../hooks/useWeb3Context";
import useContract from "../hooks/useContract";
import ChainlinkAbi from "./abi/Chainlink.json";

export default function useChainlinkContract() {
  const contract = useContract(ChainlinkAbi, contracts.chainlink);
  const { sendTx } = useWeb3Context();

  return {
    async getPageRank() {
      return await contract.methods.getPageRank().call();
    },
    async requestPageRankInfo() {
      const func = contract.methods.requestPageRankInfo(
        "0xE5A18517eBA297555F22b70BafB21930e23D0c4E",
        "3950e7ab342747d6aa71a2a2c0cc20e2"
      );
      return await sendTx(func);
    },
    async requestPageRankInfoParams(ids) {
      // ids should be array
      const func = contract.methods.requestPageRankInfoParams(
        "0xE5A18517eBA297555F22b70BafB21930e23D0c4E",
        "6d8c0efb6af8450da230e8b41d9e3f39",
        ids
      );
      return await sendTx(func);
    },
  };
}
