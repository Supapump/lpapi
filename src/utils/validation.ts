import { z } from 'zod';

// Pool info validation schema
export const GetPoolInfoSchema = z.object({
  poolAddress: z.string().regex(/^[A-Za-z0-9]{32,44}$/, {
    message: "Invalid pool address format"
  })
});

// Get pools by tokens validation schema
export const GetPoolsByTokensSchema = z.object({
  tokenAMint: z.string().regex(/^[A-Za-z0-9]{32,44}$/, {
    message: "Invalid token A mint address format"
  }),
  tokenBMint: z.string().regex(/^[A-Za-z0-9]{32,44}$/, {
    message: "Invalid token B mint address format"
  })
});

// Add liquidity validation schema
export const AddLiquiditySchema = z.object({
  poolAddress: z.string().regex(/^[A-Za-z0-9]{32,44}$/),
  tokenAAmount: z.string().regex(/^\d+(\.\d+)?$/),
  tokenBAmount: z.string().regex(/^\d+(\.\d+)?$/),
  slippageTolerance: z.number().min(0).max(100).default(1),
  userAddress: z.string().regex(/^[A-Za-z0-9]{32,44}$/)
});

// Remove liquidity validation schema
export const RemoveLiquiditySchema = z.object({
  poolAddress: z.string().regex(/^[A-Za-z0-9]{32,44}$/),
  positionAddress: z.string().regex(/^[A-Za-z0-9]{32,44}$/),
  liquidity: z.string().regex(/^\d+(\.\d+)?$/),
  slippageTolerance: z.number().min(0).max(100).default(1),
  userAddress: z.string().regex(/^[A-Za-z0-9]{32,44}$/)
});