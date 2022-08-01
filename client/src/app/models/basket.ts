export interface BasketItem {
    productId: number;
    name: string;
    price: number;
    pictureurl: string;
    brand: string;
    type: string;
    quantity: number;
}
export interface Basket{
    id: number;
    buyerId: string;
    items: BasketItem[];
}