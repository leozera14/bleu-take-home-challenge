interface IMintRow {
  id: string;
  to: string;
  tokenId: string;
  createdAt: number;
}

interface IStakeRow {
  id: string;
  staker: string;
  tokenId: string;
  createdAt: number;
}

interface IUnstakeRow {
  id: string;
  staker: string;
  tokenId: string;
  createdAt: number;
}

export interface IGetTransactionsQuery {
  mints: {
    items: IMintRow[];
  };
  stakes: {
    items: IStakeRow[];
  };
  unstakes: {
    items: IUnstakeRow[];
  };
}
