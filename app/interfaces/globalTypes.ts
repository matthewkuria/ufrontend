export interface IProduct {
    id:       number;
    image:    IImage;
    name:     string;
    category: string;
    price:    number;
    quantity: number;
}

export interface IImage {
    thumbnail: string;
    mobile:    string;
    tablet:    string;
    desktop:   string;
}

export interface IProductContext {
    products: IProduct[];
    cart:     IProduct[];
    addToCart:         (product: IProduct) => void;
    removeFromCart:    (id: number) => void;
    emptyCart:         () => void;
    incrementQuantity: (id: number) => void;
    decrementQuantity: (id: number) => void;
}

export interface ICartProps {
    isConfirmedOrder?: boolean
}

export enum Breakpoints {
    mobile = '640px',
    tablet = '768px',
    desktop = '1024px',
}