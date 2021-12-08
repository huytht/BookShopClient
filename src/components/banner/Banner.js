import React from "react";
import { Box, styled } from "@material-ui/core";
import { ImageList,ImageListItem } from "@material-ui/core";
import { Link } from "react-router-dom";
const itemData = [
    {
      id:9,
      img:'/imagebanner/Copy of Nature Welcome Church Template - Made with PosterMyWall.jpg',
      title: 'Bed',
      cols:4
    },
    {
        id:2,
      img: 'https://www.vinabook.com/images/thumbnails/promo/802x480/363107_05.jpg',
      title: 'Books',
      cols:2
    },
    {
        id:3,
      img: 'https://www.vinabook.com/images/thumbnails/promo/802x480/363109_04.jpg',
      title: 'Sink',
      cols:2
    },
    {
    id:4,
    img: 'https://www.vinabook.com/images/thumbnails/promo/802x480/363107_05.jpg',
    title: 'Books',
    cols:2
  },
  {
      id:5,
    img: 'https://www.vinabook.com/images/thumbnails/promo/802x480/363109_04.jpg',
    title: 'Sink',
    cols:2
  }
  ,
  
]
const CImage = styled('div')(
    {
        padding:10,
        marginTop:'-10px',
        marginLeft: '25.5ch',
        height: '64.7ch',

    }
)

const Banner = () => {
    return (
        <CImage >
            <ImageList rowHeight={182.5} cols={4} >
              
                {itemData.map((item, index) => (
                
                    <ImageListItem key={index} cols={item.cols || 1} style={{ loading: "lazy", }}>
                        <Link to={`/book?id=${item.id}`}>
                        <img alt="" style={{height:'100%',width:'100%',magrinLeft:'1110px'}} src={item.img} />
                        </Link>
                    </ImageListItem>
                   
                ))}
            </ImageList>
        </CImage>
    )
}
export default Banner;