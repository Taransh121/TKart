import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Layout } from '../../MenuHeaderComponents/Layout';
// import { Card } from '../../MenuHeaderComponents/Card';
import { CartItem } from './CartItem';
// import { addToCart, getCartItems } from '../../MenuHeaderactions/cartAction';
import "./CartPage.css";
import { addToCart, getCartItems } from '../../actions/cartAction';
import { MaterialButton } from '../../Components/MaterialUI/material';
import { Card } from '../../Components/Card';
import { Layout } from '../../Components/Layout';
import PriceDetails from '../../Components/PriceDetails';
// import { MaterialButton } from '../../MenuHeaderComponents/MaterialUI/material';


export const CartPage = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const auth = useSelector(state => state.auth)
    // const cartItems = cart.cartItems;
    const [cartItems, setCartItems] = useState(cart.cartItems);
    useEffect(() => {
        setCartItems(cart.cartItems)
    }, [cart.cartItems])  //Everytime cart.cartItems gets changed it will call it again

    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getCartItems())
        }
        // eslint-disable-next-line
    }, [auth.authenticate])

    const onQuantityIncrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, 1));
    }
    const onQuantityDecrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id]
        dispatch(addToCart({ _id, name, price, img }, -1));
    }

    if (props.onlyCartItems) {
        return (
          <>
            {Object.keys(cartItems).map((key, index) => (
              <CartItem
                key={index}
                cartItem={cartItems[key]}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}
              />
            ))}
          </>
        );
      }

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: "flex-start" }}>
                <Card headerleft={"My Cart"} headerright={<div>Deliver to</div>} style={{ width: "calc(100%-400px)", overflow: "hidden" }}>
                    {
                        Object.keys(cartItems).map((key, index) =>
                            <CartItem
                                key={index}
                                cartItem={cartItems[key]}
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
                            />
                        )
                    }
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            background: "#ffffff",
                            justifyContent: "flex-end",
                            boxShadow: "0 0 10px 10px #eee",
                            padding: "10px 0",
                            boxSizing: "border-box",
                        }}
                    >
                        <div style={{ width: "250px" }}>
                            <MaterialButton
                                title="PLACE ORDER"
                                onClick={() =>  props.history.push(`/checkout`)}
                            />
                        </div>
                    </div>

                </Card>
                {/* <Card style={{ width: "380px" }} headerleft="Price">
                </Card> */}
                {/* Price Component */}
                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                        return qty + cart.cartItems[key].qty;
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const { price, qty } = cart.cartItems[key];
                        return totalPrice + price * qty;
                    }, 0)}
                />
            </div>
        </Layout>
    )
}
