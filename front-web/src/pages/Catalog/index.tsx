import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import './styles.scss';

const Catalog = () =>{

    useEffect( () =>{
        fetch('http://localhost:3000/api/1.0/product')
        .then(response => response.json())
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


