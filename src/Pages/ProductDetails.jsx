import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { RotatingTriangles } from 'react-loader-spinner';

const ProductDetails = () => {
  const [prodDetails,setProdDetails]=useState([]);
  const [loading,setLoading]=useState(true)
  const {id}=useParams();

  const getDetails=async()=>{
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    setProdDetails(res?.data)
    setLoading(false)
  }

   console.log('proddetails', prodDetails);
  useEffect(()=>{
    setTimeout(()=>{
        getDetails();
    },1500)
  },[])

  if (loading) {
    return (
      <RotatingTriangles
        visible={true}
        height="80"
        width="80"
        ariaLabel="rotating-triangels-loading"
        wrapperStyle={{}}
        wrapperClass="rotating-triangels-wrapper"
      />
    );
  }
 
  return (
    <>
      <div>
        <h5>Id: {prodDetails.id}</h5>
      </div>
      <div>
        <h5>Title: {prodDetails.title}</h5>
      </div>
      <div>
        <h5>category: {prodDetails.category}</h5>
      </div>
      <div>
        <h5>Description: {prodDetails.description}</h5>
      </div>
      <div>
        <h5>Price: {prodDetails.price}</h5>
      </div>
      <div>
        <h5>rate: {prodDetails?.rating?.rate}</h5>
      </div>
      <div>
        <h5>Count: {prodDetails?.rating?.count}</h5>
      </div>
    </>
  );
}

export default ProductDetails