export interface PhotoData {
  id: string;
  urls: { small: string; regular: string };
  alternative_slugs: { en: string };
}

export interface FetchedData {
  results: PhotoData[];
  total: number;
  total_pages: number;
}
