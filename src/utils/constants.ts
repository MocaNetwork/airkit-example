import { BUILD_ENV as AIRKIT_BUILD_ENV } from "@mocanetwork/airkit";
import { type Address, type Chain, defineChain } from "viem";
import { baseSepolia, soneiumMinato } from "viem/chains";

export const mocaTestnet: Chain & {
  contracts: { multicall3: { address: `0x${string}`; blockCreated: number } };
} = defineChain({
  id: 5151,
  name: "Moca Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Moca Network",
    symbol: "MOCA",
  },
  rpcUrls: {
    default: {
      http: ["https://devnet-rpc.mocachain.org"],
      webSocket: ["wss://devnet-rpc.mocachain.org"],
    },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://devnet-scan.mocachain.org" },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3837540,
    },
  },
} as const);

export const BUILD_ENV = AIRKIT_BUILD_ENV.SANDBOX;

const ERC20_ADDRESSES: { [chainId: number]: Address } = {
  [baseSepolia.id]: "0xa807429271f7001ED6e5eB40e2029B7ecbA9445f",
  [soneiumMinato.id]: "0x15a2e33bf32563C796b5f85e77236e20C6D1b956",
  [mocaTestnet.id]: "0xF025335C838738ba426ded3ABc8Ce36B871F5c0C",
};

const ERC721_ADDRESSES: { [chainId: number]: Address } = {
  [baseSepolia.id]: "0xc9061eEC6abEB13DC7815e47FFfe1b9a40A8088b",
  [soneiumMinato.id]: "0x51aeA0a26D84eCa3ADE38078b6eFDa5e04702607",
  [mocaTestnet.id]: "0x6c513255C62D9036aFd14dA3633C4f2e4239adD1",
};

export const MOCK_ERC20_CONTRACT = (chainId: number) => {
  const erc20Address = ERC20_ADDRESSES[chainId];

  if (!erc20Address) {
    throw new Error(`No erc20 address found for chainId: ${chainId}`);
  }

  return {
    address: erc20Address,
    abi: [
      "function balanceOf(address account) view returns (uint256)",
      "function symbol() view returns (string)",
      "function mint(address to, uint256 amount)",
      "function transfer(address to, uint256 value)",
      "error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed)",
      "error ERC20InvalidSender(address sender)",
      "error ERC20InvalidReceiver(address receiver)",
      "error ERC20InsufficientAllowance(address spender, uint256 allowance, uint256 needed)",
      "error ERC20InvalidApprover(address approver)",
      "error ERC20InvalidSpender(address spender)",
    ],
  };
};

export const MOCK_ERC721_CONTRACT = (chainId: number) => {
  const erc721Address = ERC721_ADDRESSES[chainId];

  if (!erc721Address) {
    throw new Error(`No erc721 address found for chainId: ${chainId}`);
  }

  return {
    address: erc721Address,
    abi: [
      "function balanceOf(address account) view returns (uint256)",
      "function safeMint(address to)",
      "function transferFrom(address from, address to, uint256 tokenId)",
      "error ERC721InvalidOwner(address owner)",
      "error ERC721NonexistentToken(uint256 tokenId)",
      "error ERC721IncorrectOwner(address sender, uint256 tokenId, address owner)",
      "error ERC721InvalidSender(address sender)",
      "error ERC721InvalidReceiver(address receiver)",
      "error ERC721InsufficientApproval(address operator, uint256 tokenId)",
      "error ERC721InvalidApprover(address approver)",
      "error ERC721InvalidOperator(address operator)",
    ],
  };
};
