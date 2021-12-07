import React, { useEffect, useState } from "react";
import { Breadcrumbs, styled, } from "@material-ui/core";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { cate } from "../../data";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import callApi from "../../api";
import { AddCart, GetAllProduct } from "../../actions/cart";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import usePagination from "../pagination/PaginationItem";



const Container = styled('div')(
    {
        padding: "10px"
    }
)
const Left = styled('div')(
    {

        display: "flex",


    }

)
const Center = styled('div')(
    {
        flex: 1,
        display: "flex",
        marginLeft: '5px'


    }
)
const Wrapper = styled('div')(
    {
        display: 'flex',

    }
)
const Title = styled('h1')(
    {
        textAlign: 'center',
        color: 'rgba(86, 141, 229, 1)'
    }
)
const Titleh3 = styled('h3')(
    {
        textAlign: 'center',
        marginTop: '10px',

        borderBottom: "1px solid rgba(86, 141, 229, 1)",
        height: '5%',
        width: '100%',
        textAlign: 'left'
    }
)
const BookCategory = () => {
    
  

    const { _products } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    useEffect(() => {
        callApi("book", "GET", null).then((res) => {
            dispatch(GetAllProduct(res.data));
        });
    }, []);

    const handleAddToCart = (item) => {
        console.log(item);
        dispatch(AddCart(item));
    };
    const [page, setPage] = useState(1);
    const PER_PAGE = 6;

    const count = Math.ceil(_products.length / PER_PAGE);

    const _DATA = usePagination(_products, PER_PAGE);
  
    const handleChange = (e, p) => {
      setPage(p);
      _DATA.jump(p);
     console.log(_DATA)
     console.log(count)
    };

    return (
        <Container>
            <Wrapper>
                <Left>

                    <Box
                        sx={{ border: 1, borderColor: 'rgba(86, 141, 229, 1)', height: '780px' }}
                        role="presentation"

                    >
                        <Title>Danh mục</Title>
                        {/* <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List> */}
                        <Divider />
                        <List >
                            {cate.map((text, index) => (
                                <ListItem
                                    style={{ width: '220px', textAlign: 'center' }}
                                    button key={text}>

                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>

                    </Box>
                </Left>
                <Center>
                    <Box style={{ width: '100%' }}>
                        <Breadcrumbs

                            aria-label="breadcrumb"
                            // style={{ borderBottom: "1px solid rgba(86, 141, 229, 1)",height:"25px",marginTop:'33px',width:'100%' }}
                            style={{
                                marginTop: '0.5px',
                                width: '100%'

                            }}
                        >
                            <Link style={{ textDecoration: "none" }} to="/">
                                Danh mục thể loại
                            </Link>
                            <Link
                                style={{ textDecoration: 'none' }}
                                to="/"
                            >
                                Tiểu thuyết
                            </Link>

                        </Breadcrumbs>
                        <Titleh3>Tiểu thuyết</Titleh3>
                        <Grid container spacing={2} direction="row" sx={{ width: "auto"}}>
                            {_DATA.currentData().map((item, key) => (
                                <Grid key={item._id} item xs={6} md={4} style={{ padding: 25 }}>
                                    <Card
                                        sx={{
                                            marginTop: 1,


                                        }}
                                    >   <Box>
                                            <CardMedia

                                                component="img"
                                                height="270"
                                                src={`https://firebasestorage.googleapis.com/v0/b/bookshoponline-85349.appspot.com/o/book%2F${item.image}?alt=media`}
                                                alt="green iguana"
                                            /></Box>
                                        <CardContent sx={{ textAlign: "center", height: "40px" }}>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                style={{ alignItems: "center", fontSize: "15px" }}
                                            >
                                                <Link
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                    to="/book"
                                                >
                                                    <h6>{item.title}</h6>
                                                </Link>
                                            </Typography>
                                        </CardContent>
                                        <CardActions
                                            sx={{
                                                justifyContent: "center",
                                                height: "110px",
                                                width: "100%",
                                            }}
                                        >
                                            <Button
                                                sx={{
                                                    background: "green",
                                                    color: "white",
                                                    "&:hover": {
                                                        background: "green",
                                                    },
                                                }}
                                                onClick={() => handleAddToCart(item)}
                                            >
                                                Thêm vào giỏ <ShoppingCartOutlined />
                                            </Button>
                                            <span style={{ color: "red", marginLeft: "20px" }}>
                                                <h4>{item.price}</h4>
                                            </span>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Box style={{ marginBottom: '40px', }} >

                            <Stack spacing={2} >
                                <Pagination count={count} size="small" page={page} onChange={handleChange} />
                            </Stack>
                        </Box>
                    </Box>

                </Center>

            </Wrapper>
        </Container>
    )
}
export default BookCategory;