import { useCart } from "../../store/useCart";
import { ProductCard } from "../ProductCard";

import styles from "./styles.module.scss";

export const ProductList = () => {
  const { products } = useCart();

  return (
    <div className={styles.productListContainer}>
      <h2>Productos</h2>
      <div className={styles.products}>
        {products.map((product) => (
          <ProductCard {...product} />
        ))}
      </div>
    </div>
  );
};
