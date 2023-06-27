import React,{useEffect,useState} from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { postData,ServerURL } from "../../Services/ServerServices";

var productImage = {
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, 
    autoplaySpeed: 2000,
    focusOnSelect:true,
    
}


export default function ProductImageComponent({productid}) {
    // var data = JSON.parse(props.data)

    // alert(props.productid)

    const [images,setImages]=useState([])

    const fetchAllProductImages=async()=>{
        var result = await postData('userinterface/fetchallpictures',{productid:productid})
        console.log('qwerty',result.data[0].images)
        setImages(JSON.parse(result.data[0].images))
        
    }

    useEffect(function(){
        fetchAllProductImages()
    },[])

    const setImageSlider = () => {
        console.log('ioiooi',images)
        alert(JSON.stringify(images))
        return images.map((item) => {
            return (
            <div style={{ display: 'flex', justifyContent:'center',width:'50%'}}>
                <img src={`${ServerURL}/images/${item}`} alt="xx" style={{ display: 'flex', justifyContent:'center',width: '50%',paddingLeft:'25%'}} />
            </div>
            )
        })

    }

    return (<div>
        <div style={{ display: 'flex', justifyContent:'center' }}>
            <div style={{ width: '100%',border:'1px solid #b2bec3', borderRadius:'7px',margin:'10px 5px 5px 40px' }}>
                
                <Slider {...productImage}>
                    {setImageSlider()}
                </Slider>
            </div>

            
        </div>
    </div>)
}