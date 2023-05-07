import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { generatePublicUrl } from '../../urlConfig';
import { getProductsByName } from '../../actions/productAction';
import { Link } from "react-router-dom";
import "./ProductStore.css";
import { Card } from '../../Components/Card';


export const ProductStore = (props) => {

    const product = useSelector(state => state.product)
    const priceRange = Object.keys(product.productsByPrice);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsByName(props.match.params.name))
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    // console.log(priceRange.index);
                    return (
                        <Card
                            headerleft={`${props.match.params.name} mobiles ${priceRange[index]}`}
                            headerright={<button>View All</button>}
                            key={Math.random()}
                            style={{width:"98%",margin:"20px",}}
                            className='card product-block'>
                            <div className='product-details'>
                                {
                                    product.productsByPrice[key].map(product =>
                                        <Link to={`/${product.name}/${product._id}/p`} key={Math.random()} className="product-container">
                                            <div className="product-img-container">
                                                <img src={generatePublicUrl(product.pictures[0].img)} alt="Product img" />
                                            </div>
                                            <div className='product-info'>
                                                <div className='product-name'>{product.name}</div>
                                                <div>
                                                    <span>4.3</span> &nbsp;
                                                    <span>2253</span>
                                                </div>
                                                <div className="product-price">&#8377;{product.price}</div>
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>
                        </Card>
                    )
                })
            }
        </>
    )
}
