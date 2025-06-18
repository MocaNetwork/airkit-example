import type { Address } from "viem";
import { baseSepolia, soneiumMinato } from "viem/chains";

export const BUILD_ENV = "sandbox";
export const DEFAULT_CHAIN = baseSepolia;

const ERC20_ADDRESSES: { [chainId: number]: Address } = {
  [baseSepolia.id]: "0xa807429271f7001ED6e5eB40e2029B7ecbA9445f",
  [soneiumMinato.id]: "0x15a2e33bf32563C796b5f85e77236e20C6D1b956",
};

const ERC721_ADDRESSES: { [chainId: number]: Address } = {
  [baseSepolia.id]: "0xc9061eEC6abEB13DC7815e47FFfe1b9a40A8088b",
  [soneiumMinato.id]: "0x51aeA0a26D84eCa3ADE38078b6eFDa5e04702607",
};

export const MOCK_ERC20_CONTRACT = (chainId: number) => ({
  address: ERC20_ADDRESSES[chainId],
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
  chainId: DEFAULT_CHAIN.id,
});

export const MOCK_ERC721_CONTRACT = (chainId: number) => ({
  address: ERC721_ADDRESSES[chainId],
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
  chainId: DEFAULT_CHAIN.id,
});
