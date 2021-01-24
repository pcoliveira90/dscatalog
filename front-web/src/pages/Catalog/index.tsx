import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from '../../core/types/ProductsResponse';
import makeRequest from '../../core/utils/reques';
import ProductCard from './components/ProductCard';
import ProductCardLoader from './components/ProductCardLoader';
import './styles.scss';

const Catalog = () =>{
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setLoading] = useState(false);

    useEffect( () =>{
        const params={
            page:0,
            linesPerPage:12
        }
        setLoading(true);
        makeRequest({url:'/api/1.0/products', params})
        .then(response => setProductsResponse(response.data))
        .finally(() => setLoading(false));
    },[]);

    return(
        <div className="catalog-container">
            <h1 className="catalog-title">Catálogo de produtos</h1>
            <div className="catalog-products">
                {isLoading ? <ProductCardLoader />:( productsResponse?.content.map(product => (<Link to={`/products/${product.id}`} key={product.id}><ProductCard product={product} /></Link>)))}
            </div>
        </div>
    );
}

export default Catalog;


