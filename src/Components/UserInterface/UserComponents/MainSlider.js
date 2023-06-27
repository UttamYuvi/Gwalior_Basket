import React, { createRef } from "react";
import Slider from "react-slick";
import { ServerURL } from "../../Services/ServerServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function MainSlider() {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  var settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrow: false,
  };

  var slider = createRef()
  var images = ['b1.jpg', 'b2.jpg', 'b3.jpg', 'b4.jpg', 'b5.jpg']
  function handleLeftClick() {
    slider.current.slickPrev()
  }
  function handleRightClick() {
    slider.current.slickNext()

  }
  function playImages() {
    return images.map((item) => {
      return (<img src={`${ServerURL}/images/${item}`} width={'100%'} />)
    })
  }


  return (
    <div style={{ width: '99%', position:'relative' }}>
      {matches ? <></> :
        <div style={{ background: '#FFF', width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', position: 'absolute', left: '1%', top: '40%', zIndex: 1, opacity: 0.7 }}>

          <KeyboardArrowLeftIcon onClick={() => handleLeftClick()} style={{ fontSize: 34 }} />
        </div>
      }
      <Slider {...settings} ref={slider}>
        {playImages()}
      </Slider>
      {matches ? <></> :
        <div style={{ background: '#FFF', width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', position: 'absolute', right: '1%', top: '40%', zIndex: 1, opacity: 0.7 }}>

          <KeyboardArrowRightIcon onClick={() => handleRightClick()} style={{ fontSize: 34 }} />
        </div>
      }
    </div>
  )
}