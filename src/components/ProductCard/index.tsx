import { Product } from "../../store/products";
import { useCart } from "../../store/useCart";

import styles from "./styles.module.scss";

export const ProductCard = ({ id, img, price, color }: Product) => {
  const { addToCart } = useCart();

  return (
    <div className={styles.productCard}>
      <div className={styles.title} style={{ backgroundColor: color }}>
        Producto {id}
      </div>
      <div className={styles.imgContainer}>
        <img src={img} alt={id} />
        <div className={styles.buttonContainer}>
          <button onClick={() => addToCart(id)}>Agregar</button>
        </div>
      </div>
      <div className={styles.price}>${price}</div>
    </div>
  );
};
