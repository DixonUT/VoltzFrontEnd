import ProductItem from "./ProductItem";
import { useCart } from '../context/cart-context'; 
import { useProduct } from '../context/product-context'

export default function ProductGrid() {
    const { addToCart } = useCart(); 

    const {productList} = useProduct()


    return (
        <section className="product-grid">
            {productList.map(product => (
                <ProductItem 
                    key={product.id}
                    product={product}
                
                    addToCart={addToCart}
                />
            ))}
        </section>
    );
}
