import { chain, createClient } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { JsonRpcProvider, getNetwork } from "@ethersproject/providers";

// import * as dotenv from "dotenv";
// dotenv.config();

// could be configure in .env file and call here with process.env.RPC_URL and process.env.CHAIN_ID
const ethProvider = new JsonRpcProvider(
  "https://sepolia.infura.io/v3/1cc8a39be27344e395af4b18f8a5413e",
  getNetwork(11155111)
);
const connector = new MetaMaskConnector({ chains: [chain.sepolia] });

export const client = createClient({
  autoConnect: true,
  provider: ethProvider,
  connectors: [connector],
});
