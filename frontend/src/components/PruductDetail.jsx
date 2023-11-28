import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../context/product-context';

function ProductDetail() {
    const { productId } = useParams();
    const {productList} = useProduct();
    const serverhost = import.meta.env.VITE_SERVERHOST;
    const product = productList.find(p=>p.id==productId)

    return (
        <div className="product-detail">
            <h1>{product.product}</h1>
            <img src={`${serverhost}/${product.img}`} alt={product.product} />
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Size:</strong> {product.size}</p>
            <p><strong>Color:</strong> {product.color}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Inventory:</strong> {product.inventory}</p>
        </div>
    );
    
}

export default ProductDetail;
