import type { IMintRecord } from './IMintRecord';

export interface IGetYourMintsResponse {
  bleuNFTMints: {
    items: IMintRecord[];
    totalCount: number;
  };
}
