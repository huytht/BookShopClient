import React,{useState,useEffect} from "react";
import { styled } from "@material-ui/core";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import callApi from "../api";
import { AddCart, GetAllProduct } from "../actions/index";

const Container = styled('div')(
    {
        display: 'flex',
    }
)
const Wrapper = styled('div')(
    {
        padding: 10,
        flex: 1,
    }
);
const Title = styled('h1')(
    {
        paddingLeft: '10px',
        margin: '20px',
        marginLeft: '40px',
        color: 'green',
        width: 'auto',
        display: 'flex',
        flex: 1,

    }
)

const ViewMore = styled('div')(
    {
        justifyContent: 'flex-end',
        display: 'flex',
        flex: 1,
        marginTop: '-55px',
        marginLeft: '70px'

    }
)


const BookList = () => {
    const { _products } = useSelector((state) => state._todoProduct);
    const dispatch = useDispatch();
    useEffect(() => {
        callApi('/products', 'GET', null).then(res => {         
            dispatch(GetAllProduct(res.data));
        });
       
    }, [])

    const handleAddToCart = (item) => {
        dispatch(AddCart(item));
    }
    
    return (
        <Container>

            <Wrapper>
                <Title>Sách Hay</Title>
                <ViewMore><Button sx={{
                    background: 'green', color: 'white', '&:hover': {
                        background: "green",
                    },
                }}>Xem Thêm</Button></ViewMore>

                <Grid container spacing={2} direction="row" sx={{ width: 'auto' }} >

                    {_products.map((item) => (
                        <Grid item xs={6} md={3} style={{ padding: 40 }}>
                            <Card sx={{
                                marginTop: 1,
                                width: '100%',
                                borderBottomColor:'red'

                            }}>
                                <CardMedia
                                    component="img"
                                    height="270"
                                    src={item.image}
                                    alt="green iguana"
                                />
                                <CardContent sx={{ textAlign: 'center', height: '40px' }}>
                                    <Typography gutterBottom variant="h5" style={{ alignItems: 'center', fontSize:'15px' }}>
                                        <Link
                                            style={{    
                                                textDecoration:'none'
                                            }}
                                            to="/book"
                                        ><h1>{item.name}</h1></Link>

                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center',height:'110px',width:'100%' }}>
                                    <Button sx={{
                                        background: 'green', color: 'white', '&:hover': {
                                            background: "green",
                                        },
                                    }} onClick={() => handleAddToCart(item)}>Thêm vào giỏ <ShoppingCartOutlined/></Button>
                                    <span style={{ color: 'red', marginLeft: '20px' }}><h4>{item.price}</h4></span>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Title >Sách Mới Cập Nhật</Title>
                <ViewMore>
                    <Button sx={{
                        background: 'green', color: 'white', '&:hover': {
                            background: "green",
                        },
                    }} >Xem Thêm</Button>
                </ViewMore>
                <Grid container spacing={2} direction="row" sx={{ width: 'auto' }}   >

                    {_products.map((item) => (
                        <Grid item xs={6} md={3} style={{ padding: 40 }}>
                            <Card sx={{
                                marginTop: 1,
                                width: '100%',
                            }}>
                                <CardMedia
                                    component="img"
                                    height="270"
                                    src={item.image}
                                    alt="green iguana"
                                />
                                <CardContent sx={{ textAlign: 'center', height: '40px', }}>
                                   
                                    <Typography gutterBottom variant="h5" style={{ alignItems: 'center', fontSize:'15px', }} >
                                        <Link
                                            style={{
                                                textDecoration:'none'
                                            }}
                                            to="/book"
                                            
                                        ><h1>{item.name}</h1></Link>

                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center',height:'110px',width:'100%' }}>
                                    <Button sx={{
                                        background: 'green', color: 'white', '&:hover': {
                                            background: "green",
                                        },
                                    }} onClick={() => handleAddToCart(item)}>Thêm vào giỏ <ShoppingCartOutlined/></Button>
                                    <span style={{ color: 'red', marginLeft: '20px' }}><h4>{item.price}</h4></span>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Wrapper >
        </Container>
    )
}
export default BookList;