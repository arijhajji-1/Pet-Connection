import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
function TestCart() {
    const userFromLocalStorageString = localStorage.getItem('user');
    const user = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
    const cart = useSelector(state => state.cart);
    const [product, setProduct] = useState("");
    const { id } = useParams();
    useEffect(() => {
  const fetchComment = async () => {
    try {
      const response = await fetch(`http://localhost:3000/product/get/${id}`);
      const data = await response.json();
      setProduct(data); 
      console.log("20");
      console.log(product);
      console.log("21");
    } catch (error) {
      console.error(error);   
    }
  };
  
  console.log("30");
  fetchComment();
  console.log("31");
}, [product]);

    return (

        <div>

        </div>
      );
}

export default TestCart;