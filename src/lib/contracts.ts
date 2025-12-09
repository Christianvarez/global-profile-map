// USDC Contract on Base Mainnet
export const USDC_CONTRACT_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const;

// Your wallet address to receive payments
export const RECEIVER_WALLET_ADDRESS = '0x0b4244568b58dd0ffcb30ee4f9a6652feab06a8b' as const;

// USDC has 6 decimals
export const USDC_DECIMALS = 6;

// 1 USDC in smallest unit (with 6 decimals)
export const USDC_AMOUNT = 1_000_000; // 1 USDC = 1,000,000 units

// ERC20 ABI (only the functions we need)
export const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function'
  }
] as const;
