import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductPage } from '../../actions/productAction';
import utility from '../../utility/getParams';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./ProductPage.css"
import { Card } from '../../Components/Card';


export const ProductPage = (props) => {
    const dispatch=useDispatch();
    const product=useSelector(state=>state.product);
    const {page}=product;
    useEffect(()=>{
        const params=utility(props.location.search)
        const payload={
            params
        }
        dispatch(getProductPage(payload))
        // eslint-disable-next-line
    },[])
  return (
    <>
    <div className='content'>
    <h1>{page.title}</h1>
    <Carousel renderThumbs={()=>{}}>
      {
        page.banners && page.banners.map((banner,index)=>
        <a className='carousel1' href={banner.navigateTo} key={index}>
          <img src={banner.img} alt="banner-img" />
        </a>
        )
      }
    </Carousel>
    <div className='products' >
      {
        page.products && page.products.map((products,index)=>
          <Card className='product-card' key={index}>
            <img src={products.img} alt="product-img" height="100%" width="100%" />
          </Card>
        )
      }
    </div>
    </div>

    </>
  )
}
