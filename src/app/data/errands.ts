export type Errand = {
  id: number;
  requester: string;
  avatar: string;
  distance: string;
  item: string;
  store: string;
  cost: string;
  tip: string;
  tag: string;
  rating: number;
  trips: number;
};

export const initialErrands: Errand[] = [
  {
    id: 1,
    requester: "Maria Santos",
    avatar: "MS",
    distance: "0.3 km",
    item: "Nescafe 3-in-1 x 12",
    store: "7-Eleven Katipunan",
    cost: "85.00",
    tip: "30.00",
    tag: "Groceries",
    rating: 4.9,
    trips: 22,
  },
  {
    id: 2,
    requester: "Jun dela Cruz",
    avatar: "JD",
    distance: "0.6 km",
    item: "Biogesic 500mg x 10",
    store: "Rose Pharmacy Xavierville",
    cost: "52.00",
    tip: "50.00",
    tag: "Medicine",
    rating: 4.7,
    trips: 11,
  },
  {
    id: 3,
    requester: "Carina Reyes",
    avatar: "CR",
    distance: "1.1 km",
    item: "Buko Pandan Cake 6-inch",
    store: "Red Ribbon Cubao",
    cost: "499.00",
    tip: "80.00",
    tag: "Food",
    rating: 5.0,
    trips: 47,
  },
];
