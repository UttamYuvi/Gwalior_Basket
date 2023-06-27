import React, { useEffect,createRef, useState } from "react";
import Slider from "react-slick";
import { ServerURL } from "../../Services/ServerServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Grid, useMediaQuery, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import { getData } from "../../Services/ServerServices";
import { useDispatch } from "react-redux";

export default function Trending() {

  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [refresh,setRefresh]=useState(false)

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    arrow: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
        },
      },

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  var slider = createRef();
  
  function handleLeftClick() {
    slider.current.slickNext();
  }
  function handleRightClick() {
    slider.current.slickPrev();
  }

  const [trendingProduct,setTrendingProduct]=useState([])

  const handleClick=(pid)=>{
    // navigate(`/ProductsList`, { state: { productid: pid, page:'Trending' } })
  }

  const fetchProducts = async () => {
    var result = await getData("userinterface/fetch_all_productstrending");
    // alert(JSON.stringify(result.data))
    setTrendingProduct(result.data)

  };
  useEffect(function () {
    fetchProducts();
  }, []);

  const handleCart=(item)=>{

    dispatch({type:'ADD_CART',payload:[item.productid,item]})
    setRefresh(!refresh)
}

  

  function playImages() {
    return trendingProduct.map((item) => {
      return (
        <div  >
          <Paper onClick={()=>handleClick(item.productid)} elevation={3} style={{ width: 180, height: 235, margin: 10, borderRadius: 10 }}>
            <div style={{ padding: 10 }}>
              <div
                style={{
                  width: 160,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`${ServerURL}/images/${item.image}`}
                  style={{ width: 75, height: 75 }}
                />
              </div>

              <div
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                <p>{item.productname}</p>
              </div>
              <div style={{ color: "#888", fontWeight: 400, marginTop: 9, fontSize: 14, margin: 5 }}>
                <p>{item.qty}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 160,


                }}
              >
                <div style={{ display: "flex", flexDirection: "column", fontSize: 14, margin: '0px 0px 0px 5px' }}>
                  <div>
                    <s>&#8377;{item.actualprice}</s>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 0, fontSize: 15, margin: '0px 0px 0px 0px' }}>

                    <a>&#8377;{item.offerprice}</a>
                  </div>
                </div>

                <Button
                  style={{
                    borderColor: "#ff3f34",
                    color: "#ff3f34",
                    width: 70,
                    height: 37,
                    boxShadow: '0px 0px 50px Gray97'
                  }}
                  variant="outlined"
                  onClick={()=>handleCart(item)}
                >
                  ADD
                </Button>
              </div>
            </div>
          </Paper>
        </div>
      );
    }); 
  }

  return (
    <div style={{ position: "relative", background:'#f7f7f7', borderRadius:10 }}>
      {matches ? (
        <></>
      ) : (
        <div
          style={{
            background: "#FFF",
            width: 36,
            height: 36,
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            position: "absolute",
            left: "1%",
            top: "50%",
            zIndex: 1,
            opacity: 0.7,
          }}
        >
          <KeyboardArrowLeftIcon
            onClick={handleLeftClick}
            style={{ fontSize: 34 }}
          />
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', fontSize: 22, color:'#000' }} >
        <h3>Now trending</h3>
      </div>
      <Slider ref={slider} {...settings}>
        {playImages()}
      </Slider>

      {matches ? (
        <></>
      ) : (
        <div
          style={{
            background: "#FFF",
            width: 36,
            height: 36,
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            position: "absolute",
            right: "1%",
            top: "50%",
            zIndex: 1,
            opacity: 0.7,
          }}
        >
          <KeyboardArrowRightIcon
            onClick={handleRightClick}
            style={{ fontSize: 34 }}
          />
        </div>
      )}
    </div>
  );
}
