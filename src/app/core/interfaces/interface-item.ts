export interface IItem {
  id: number;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  stock: number;
  sold: number;
  createdAt: Date;
}
