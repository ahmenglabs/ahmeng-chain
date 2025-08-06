export type Contract = {
  contractAddress: string
  creatorAddress: string
  timestamp: number
  sourceCode: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storage: Record<string, any>
}
