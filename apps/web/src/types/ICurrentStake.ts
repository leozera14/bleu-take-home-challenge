export interface ICurrentStakeRecord {
  tokenId: string;
  createdAt: number;
}

export interface IGetCurrentStakesResponse {
  bleuNFTCurrentStakes: {
    items: ICurrentStakeRecord[];
    totalCount: number;
  };
}
