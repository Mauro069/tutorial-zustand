import { useCart } from "../../store/useCart";
import { CartItem } from "../CartItem";

import styles from "./styles.module.scss";

export const Cart = () => {
  const { cartItems, totalPrice } = useCart();

  return (
    <div className={styles.cartContainer}>
      <h2>Carrito | Total: ${totalPrice}</h2>
      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <CartItem {...item} />
        ))}
      </div>
    </div>
  );
};
