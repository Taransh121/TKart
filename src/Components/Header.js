import React, { useEffect, useState } from 'react';
import './Header.css';
import flipkartLogo from '../images/logo/flipkart.png';
// import flip from "../images/flip.webp"
import goldenStar from '../images/logo/golden-star.png';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import { Modal, MaterialInput, MaterialButton, DropdownMenu } from './MaterialUI/material';
import { useDispatch, useSelector } from 'react-redux';
import { login, signout } from '../actions/authActions';

export const Header = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const userLogin = () => {
    const user = { email, password }
    dispatch(login(user));
    setLoginModal(false);
  }

  const logout = () => {
    dispatch(signout());
  }

  useEffect(() => {
    if (auth.authenticate) {

    }
  }, [auth.authenticate])

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a className='fullname' href='#'>
            {auth.user.firstName}
          </a>
        }
        menus={[
          { label: 'My Profile', href: '', icon: null },
          { label: 'SuperCoin Zone', href: '', icon: null },
          { label: 'Flipkart Plus Zone', href: '', icon: null },
          { label: 'Orders', href: '/account/orders', icon: null },
          { label: 'Wishlist', href: '', icon: null },
          { label: 'My Chats', href: '', icon: null },
          { label: 'Coupons', href: '', icon: null },
          { label: 'Rewards', href: '', icon: null },
          { label: 'Notifications', href: '', icon: null },
          { label: 'Gift Cards', href: '', icon: null },
          { label: 'Logout', onClick: logout, href: '', icon: null },
        ]}
      // firstMenu={
      //   <div className="firstmenu">
      //     <span>New Customer?</span>
      //     <a style={{ color: '#2874f0', cursor: "pointer" }} href='#' >Sign Up</a>
      //   </div>
      // }
      />
    )

  }

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a href='#' className="loginButton" onClick={() => setLoginModal(true)}>
            Login
          </a>
        }
        menus={[
          { label: 'My Profile', href: '', icon: null },
          { label: 'Flipkart Plus Zone', href: '', icon: null },
          { label: 'Orders', href: '/account/orders', icon: null,onClick:()=>{!auth.authenticate && setLoginModal(true) } },
          { label: 'Wishlist', href: '', icon: null },
          { label: 'Rewards', href: '', icon: null },
          { label: 'Gift Cards', href: '', icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a style={{ color: '#2874f0', cursor: "pointer" }} href='#' >Sign Up</a>
          </div>
        }
      />
    )

  }

  return (
    <div className="header">
      <Modal
        visible={loginModal}
        onClose={() => setLoginModal(false)}
      >
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <br />
              <div className="loginInputContainer">
                <MaterialInput
                  type="text"
                  label="Enter Email/Enter Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />

                <MaterialInput
                  type="password"
                  label="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rightElement={<a href='#'>Forgot?</a>}
                />
                <MaterialButton
                  title="Login"
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{ margin: "40px 0 20px 0", }}
                  onClick={userLogin}
                />
                <p style={{ textAlign: "center" }}>OR</p>
                <MaterialButton
                  title="Request OTP"
                  bgColor="white"
                  textColor="#2874f0"
                  style={{ margin: "20px 0", }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        {/* logo start */}
        <div className="logo">
          <a href='#'>
            {/* <img src={flipkartLogo} className="logoimage" alt="" /> */}
            <span style={{ fontSize: "20px" }}> <em>Flipkart</em></span>
          </a>
          <a style={{ marginTop: '-5px' }} href='#'>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        {/* logo end */}
        <div style={{
          padding: '0 10px'
        }}>
          {/* search component start  */}
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={'Search for Products, Brands and more'}
            />
            <div className="searchIconContainer">
              <IoIosSearch style={{
                color: '#2874f0'
              }} />
            </div>
          </div>
        </div>
        {/* search component end  */}
        {/* right side menu starts  */}
        <div className="rightMenu">
          {
            auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()
          }
          <DropdownMenu
            menu={
              <a href='#' className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: 'Notification Preference', href: '', icon: null },
              { label: 'Sell on flipkart', href: '', icon: null },
              { label: '24x7 Customer Care', href: '', icon: null },
              { label: 'Advertise', href: '', icon: null },
              { label: 'Download App', href: '', icon: null }
            ]}
          />
          <div>
            <a href='/cart' className="cart">
              <IoIosCart />
              <span style={{ margin: '0 10px' }}>Cart</span>
            </a>
          </div>
        </div>
        {/* right side menu ends  */}
      </div>
    </div>
  )

}

