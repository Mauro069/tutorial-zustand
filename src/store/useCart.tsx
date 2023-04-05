import create from "zustand";
import { Product, initProducts } from "./products";
import { CartItem } from "../components/CartItem";

type State = {
  products: Product[];
  cartItems: CartItem[];
  totalPrice: number;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
};

export const useCart = create<State>((set, get) => ({
  products: initProducts,
  cartItems: [],
  totalPrice: 0,
  addToCart: (productId: string) =>
    // @ts-ignore
    set(() => {
      const product = get().products.find((item) => item.id === productId);

      if (product) {
        const cartItem = get().cartItems.find(
          (carItem) => carItem.id === productId
        );

        if (cartItem) {
          return {
            cartItems: get().cartItems.map((cartItem) =>
              cartItem.id === productId
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            ),
            totalPrice: get().totalPrice + product.price,
          };
        } else {
          return {
            cartItems: [...get().cartItems, { ...product, quantity: 1 }],
            totalPrice: get().totalPrice + product.price,
          };
        }
      }
    }),
  removeFromCart: (productId: string) =>
    set((state) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === productId
      );

      if (itemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        const itemToRemove = updatedCartItems[itemIndex];

        if (itemToRemove.quantity > 1) {
          updatedCartItems[itemIndex] = {
            ...itemToRemove,
            quantity: itemToRemove.quantity - 1,
          };

          return {
            cartItems: updatedCartItems,
            totalPrice: state.totalPrice - itemToRemove.price,
          };
        } else {
          updatedCartItems.splice(itemIndex, 1);

          return {
            cartItems: updatedCartItems,
            totalPrice: state.totalPrice - itemToRemove.price,
          };
        }
      }

      return state;
    }),
}));
