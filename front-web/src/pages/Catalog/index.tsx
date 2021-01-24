import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import makeRequest from '../../core/utils/reques';
import ProductCard from './components/ProductCard';
import './styles.scss';

const Catalog = () =>{

    useEffect( () =>{
        const params={
            page:0,
            linesPerPage:12
        }
        makeRequest({url:'/api/1.0/product', params})
        .then(response => console.log(response));
    },[]);

    return(
        <div className="catalog-container">
            <h1 className="catalog-title">Catálogo de produtos</h1>
            <div className="catalog-products">
                <Link to="/products/1"><ProductCard /></Link>
            </div>
        </div>
    );
}

export default Catalog;


