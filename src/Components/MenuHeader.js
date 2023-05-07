import React from "react";
import {useSelector } from "react-redux";
import "./MenuHeader.css";
// import { getAllCategory } from "../actions/categoryAction";

export const MenuHeader = () => {
  const category = useSelector((state) => state.category);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllCategory());  //Unlimited times it is being called , so i have called it in app.js instead.
  // });

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <>  
        {/* The upper fragment needs a key  */}
          <li key={category.name} >
            {
              category.parentId ? <a href={`/${category.name}?cid=${category._id}&type=${category.type}`}>{category.name}</a> : <span>{category.name}</span>
            }
            {category.children.length > 0 ? (
              <ul >{renderCategories(category.children)}</ul>
            ) : null}
          </li>
        </>
      );
    }
    return myCategories;
  };

  return (
    <>
      <div className="menu-header">
        <ul >
          {category.categories.length > 0 ? renderCategories(category.categories) : null} 
        </ul>
      </div>
    </>
  );
};
