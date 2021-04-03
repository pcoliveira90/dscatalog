import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from 'core/types/ProductsResponse';
import makeRequest from 'core/utils/reques';
import ProductCard from './components/ProductCard';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';
import './styles.scss';

const Catalog = () =>{
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    useEffect( () =>{
        const params={
            page:activePage,
            linesPerPage:12
        }
        setLoading(true);
        makeRequest({url:'/api/1.0/products', params})
        .then(response => setProductsResponse(response.data))
        .finally(() => setLoading(false));
    },[activePage]);

    return(
        <div className="catalog-container">
            <h1 className="catalog-title">Catálogo de produtos</h1>
            <div className="catalog-products">
                {isLoading ? <ProductCardLoader amount={3}/>:( productsResponse?.content.map(product => (<Link to={`/products/${product.id}`} key={product.id}><ProductCard product={product} /></Link>)))}
            </div>
            {productsResponse && <Pagination totalPages={productsResponse.totalPages} activePage={activePage} onChange={page => setActivePage(page)}></Pagination> }
        </div>
    );
}

export default Catalog;


