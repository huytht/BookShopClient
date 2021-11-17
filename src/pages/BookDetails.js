import React from "react";
import { styled } from "@material-ui/core";
import NavbarStore from "../components/NavbarStore";
import MenuStore from "../components/menu/MenuStore";
import Footer from "../components/footer/Footer";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Rating from '@mui/material/Rating';
import ReactDOM from "react-dom";
import { Divider, Avatar, Grid } from "@material-ui/core";
import Moment from "react-moment";
import RBookDetails from "../components/book/RBookDetails";
import RRatingBook from "../components/book/RRatingBook";
import { MenuNgang } from "../components/book/MenuNgang";
import { BrowserRouter, Routes } from "react-router-dom";

import { routes } from "../config/routes";
import { MyRoute } from "../components/book/MyRoute";
import { CommentContext, CommentContextProvider } from "../context/CommentContext";

import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
const Container = styled('div')(
    {


    }
)

const Wrapper = styled('div')(
    {
        marginTop: '10px',
        padding: 10,
        flex: '1'
    }
)

const DESCSUMARY = styled('div')(
    {
        marginTop: '50px',
    }
)

const DESC = styled('div')(
    {
        marginLeft: '10px'
    }
)

const Title = styled('h1')(
    {
        marginLeft: '10px',
        color: 'green'
    }
)
const PAY = styled('h1')(
    {
        textAlign: 'center',
        borderBottom: '1px solid green',
        color: 'green'

    }
)
const Info = styled('div')(
    {

    }
)

const Rate = styled('div')(
    {
        display: 'flex',
        marginLeft: '10px',
        marginTop: '10px',
    }
)


const Content = styled('div')(
    {
        display: 'flex',
        marginLeft: '10px',
        marginTop: '20px',
    }
)
const Name = styled('div')(
    {
        display: 'flex',
        marginLeft: '10px',
        marginTop: '20px',
    }
)

const BookDetails = () => {
    const [value, setValue] = React.useState(0);

    return (
        <Container>
            <NavbarStore />
            <MenuStore />
            <Wrapper>
                <Breadcrumbs aria-label="breadcrumb" style={{ borderBottom: '1px solid green' }} >
                    <Link underline="hover" color="inherit" href="/">
                        Danh mục thể loại
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/getting-started/installation/"
                    >
                        Tiểu thuyết
                    </Link>
                    <Typography color="text.primary">Nhà Giả Kim</Typography>
                </Breadcrumbs>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 1000,
                            height: 500,
                            border: '1px solid green'
                        },
                    }}
                >

                    <Paper elevation={0} style={{}} >
                        <Box sx={{
                            width: 500,
                            height: 480, m: 1,
                            direction: "column",

                        }}>
                            <img style={{
                                width: 500,
                                height: 480,
                            }}
                                src="https://d1j8r0kxyu9tj8.cloudfront.net/images/1567492611Rj5siYiYrkqcvX8.jpg" />
                        </Box>
                        <Box
                            style={{
                                marginLeft: '540px',
                                marginTop: '-490px',
                                width: 450,
                                height: 480,

                            }}
                        >
                            <h1>Nhà Giả Kim</h1>
                            <label>Tác giả: </label><a style={{ fontWeight: 'bold' }}>Tố Hữu</a> <br />
                            <label>Nhà xuất bản: </label><a style={{ fontWeight: 'bold' }}>Kim Đồng</a> <br />
                            <label>Ngày xuất bản: </label><a>22/1/2021</a><br/>
                            <label style={{display:'flex'}}>Đánh giá: 4/5 <StarBorderOutlinedIcon /></label>
                            <DESCSUMARY>Cuốn sách Nhà Giả Kim của Paulo Coelho là cuốn sách rất hay mà mình từng đọc.
                                Nội dung cuốn sách xoay quanh câu chuyện cậu bé chăn cừu Santiago và cuộc hành trình đi tìm kho báu của cậu.
                                Cuộc hành trình đó đã dạy cho cậu rất nhiều bài học về cuộc sống  giúp cho cậu nhận ra được mục đích và ý nghĩa của cuộc đời mình.
                                Và thông quá câu chuyện đó chúng ta sẽ nhận ra rất nhiều chân lý và bài học quý giá về cuộc sống...  </DESCSUMARY><a href="#">Xem thêm</a>
                        </Box>
                    </Paper>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 300,
                            height: 300,
                            border: '1px solid green',
                        },

                    }}
                >

                    <Paper elevation={0} style={{ marginLeft: '1020px', marginTop: '-509.7px', }} >
                        <PAY>Thanh toán</PAY>
                        <Info>
                            <div style={{
                                display: 'flex',
                                fontWeight: 'bold',
                                marginLeft: '10px'

                            }}>
                                Giá bán: <a style={{
                                    color: 'red', justifyContent: 'flex-end', display: 'flex',
                                    flex: 1, marginRight: '10px'

                                }}>30.000Đ</a>
                            </div>

                            <div style={{
                                display: 'flex',
                                fontWeight: 'bold',
                                marginLeft: '10px',
                                marginTop: '25px'

                            }}>
                                Trạng thái: <a style={{
                                    color: 'green', justifyContent: 'flex-end', display: 'flex',
                                    flex: 1, marginRight: '10px'

                                }}>Còn hàng</a>
                            </div>
                        </Info>

                        <Button style={{ backgroundColor: 'green', color: 'white', height: '50px', marginTop: '25px', borderRadius: '0px' }} fullWidth >Mua ngay</Button>
                        <Button style={{ backgroundColor: 'green', color: 'white', height: '50px', borderRadius: '0px' }} fullWidth >Thêm vào giỏ hàng<ShoppingCartOutlined /></Button>
                    </Paper>
                </Box>
                
                <CommentContextProvider>
                    <BrowserRouter>

                        {/* <!-- Menu ngang --> */}
                        <MenuNgang />
                        {/* Định tuyến */}
                        <Routes>
                            {routes.map((item, index) => {
                                return (
                                    <MyRoute key={index} path={item.path} element={item.element} />
                                )
                            })}
                        </Routes>

                    </BrowserRouter>

                </CommentContextProvider>
            </Wrapper>

        </Container>


    )
}
export default BookDetails