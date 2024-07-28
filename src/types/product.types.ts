export interface TAuthorReview {
  _id: string;
  name: string;
  image: string;
  comment: string;
  rating: number;
}

export interface TReview {
  _id: string;
  totalCounts: number;
  counts: [
    {
      rating: 1;
      count: number;
    },
    {
      rating: 2;
      count: number;
    },
    {
      rating: 3;
      count: number;
    },
    {
      rating: 4;
      count: number;
    },
    {
      rating: 5;
      count: number;
    }
  ];
  featured: TAuthorReview[];
}

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export interface TProduct {
  _id: string;
  title: string;
  images: string[];
  price: number;
  description: string;
  category: string;
  stock: number;
  averageRating?: number;
  brand: string;
  reviews?: TReview[];
  inStock?: boolean;
  sizes?: ["XS", "S", "M", "L", "XL", "XXL"];
  colors?: [
    {
      name: string;
      hex: string;
    }
  ];
}
