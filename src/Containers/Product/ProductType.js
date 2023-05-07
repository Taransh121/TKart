import React from 'react'
import { Layout } from '../../Components/Layout';
import utility from '../../utility/getParams';
import "./ProductType.css"
import { ProductPage } from './ProductPage';
import { ProductStore } from './ProductStore';
import { Clothing } from './Clothing/Clothing';

export const ProductType = (props) => {

  const renderProducts=()=>{
    // console.log(props);
    const params=utility(props.location.search);
    let content=null;
    switch(params.type){
      case "store":
        content =  <ProductStore {...props}/>
        break;
      case "page" : 
        content = <ProductPage {...props}/>
        break;
      default :
        content = <Clothing {...props}/>
        break;
    }
    return content;
  }

  return (
    <>
      <Layout>
        {renderProducts()}
      </Layout>
    </>
  )
}

