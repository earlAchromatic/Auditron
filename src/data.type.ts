export interface data {
  url: string;
  name: string;
  file: string;
  score: number;
  detail: Detail;
}

interface Detail {
  performance: number;
  accessibility: number;
  "best-practices": number;
  seo: number;
  pwa?: number;
}
