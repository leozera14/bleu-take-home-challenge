export interface IMintRecord {
  id: string;
  to: string;
  tokenId: string;
  createdAt: number;
}

export interface IGetMintsResponse {
  bleuNFTMints: {
    items: IMintRecord[];
    totalCount: number;
  };
}
