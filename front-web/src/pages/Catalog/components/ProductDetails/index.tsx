import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles.scss';
import {ReactComponent as ArrowIcon} from '../../../../core/assets/images/arrow.svg';
import {ReactComponent as ProductImage} from '../../../../core/assets/images/product.svg';
import ProductPrice from '../../../../core/components/ProductPrice';
import makeRequest from '../../../../core/utils/reques';
import { Product } from '../../../../core/types/Product';
import ProductInfoLoader from '../Loaders/ProductInfoLoader';
import ProductDescriptionLoader from '../Loaders/ProductDescriptionLoader';

type ParamsType={
    productId :string;
}

const ProductDetails = () =>{
    const {productId} = useParams<ParamsType>();
    const [product, setProduct] = useState<Product>();
    const [isLoading, setLoading] = useState(false);
    
    useEffect( () =>{
        setLoading(true);
        makeRequest({url:`/api/1.0/products/${productId}`})
        .then(response => setProduct(response.data))
        .finally(()=> setLoading(false));
    },[productId]);

    return(
        <>
            
                <div className="product-details-container">
                    <div className="card-base border-radius-20 product-details">
                        <Link className="product-details-goback"  to="/products">
                            <ArrowIcon  className="icon-goback"/>
                            <h1 className="text-goback">Voltar</h1>
                        </Link>
                        <div className="row">
                            <div className="col-6 pr-5">
                                {isLoading ? <ProductInfoLoader/> :
                                    <>
                                        <div className="product-details-card text-center">
                                            <img src={product?.imgUrl} alt={product?.name} className="product-details-image"/>
                                        </div>
                                        <h1 className="product-details-name">
                                            {product?.name}
                                        </h1>
                                        {product?.price && <ProductPrice  price={product.price}/>}
                                    </>
                                }
                            </div>
                            <div className="col-6 product-details-card">
                                {isLoading ? <ProductDescriptionLoader/> :
                                    <>
                                        <h1 className="product-description-title">
                                            Decrição do Produto
                                        </h1>
                                        <p className="product-description-text">
                                            {product?.description}
                                        </p>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            
        </>
    )
}

export default ProductDetails;
