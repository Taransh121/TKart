import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Clothing.css";
import { Card } from "../../../Components/Card";
import { getProductsByName } from "../../../actions/productAction";
import { generatePublicUrl } from "../../../urlConfig";


export const Clothing = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsByName(props.match.params.name))
    // eslint-disable-next-line
}, [])

  return (
    <div style={{ padding: "10px" }}>
      <Card
        style={{
          boxSizing: "border-box",
          padding: "10px",
          display: "flex",
        }}
      >
        {product.products.map((product) => (
          <div key={Math.random()} className="caContainer">
            <Link
              className="caImgContainer"
              to={`/${product.slug}/${product._id}/p`}
            >
              <img src={generatePublicUrl(product.pictures[0].img)} />
            </Link>
            <div>
              <div className="caProductName">{product.name}</div>
              <div className="caProductPrice">
                <BiRupee />
                {product.price}
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};
