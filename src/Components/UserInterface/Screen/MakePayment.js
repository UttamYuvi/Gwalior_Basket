import { useCallback, useEffect } from "react";
import useRazorpay from "react-razorpay";
import { ServerURL } from "../../Services/ServerServices";
import { useSelector,useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MakePayment() {

  const navigate=useNavigate()
  const dispatch = useDispatch()
  const Razorpay = useRazorpay();

  var user = useSelector((state) => state.user)
  var userdata = Object.values(user)[0]
  const products = useSelector((state) => state.cart);
  const productList = Object.values(products)
  let total = productList.reduce((a, b) => {
    // console.log('makepymntt..',a+b.offerprice*b.qty)
    return a+b.offerprice*b.qty;
  }, 0);

  const handlePayment = () => {

    const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH",
      amount: total*1000,
      currency: "INR",
      name: "Gwalior Basket",
      description: "Test Transaction",
      image: `https://${ServerURL}/images/1.jpg`,

      handler: (res) => {
        console.log(res);
        navigate("/home")
        dispatch({type:"CLEAR_CART"})
      },
      prefill: {
        name: userdata[0].fullname,
        email: "youremail@example.com",
        contact: userdata[0].mobileno,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  };

  useEffect(function(){
   var timeout=setTimeout(handlePayment,1000)
  },[])

  return (
    <div className="App">
     
    </div>
  );
}