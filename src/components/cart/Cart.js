import React from "react";
import { Button, Container, IconButton, styled } from "@material-ui/core";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useSelector, useDispatch } from "react-redux";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { IncreaseQuantity, DecreaseQuantity, DeleteCart } from '../actions/index';

const Title = styled('h1')(
    {
        paddingLeft: '10px',
        margin: '20px',
        marginRight: '40px',
        color: 'green',
        width: 'auto',
        display: 'flex',
        flex: 1,
        justifyContent: 'center'
    }
)

// const TAX_RATE = 0.07;

// function ccyFormat(num) {
//     return `${num.toFixed(2)}`;
// }

// function priceRow(sl, gia) {
//     return sl * gia;
// }

// const img = "https://d1j8r0kxyu9tj8.cloudfront.net/images/1567492611Rj5siYiYrkqcvX8.jpg";

// function createRow(desc, img, sl, gia) {
//     const price = priceRow(sl, gia);
//     return { desc, img, sl, gia, price };
// }

// function subtotal(items) {
//     return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
// }

// const rows = [
//     createRow('Nhà giả kim', img, 100, 1.15),
//     createRow('Nhà giả kim', img, 10, 45.99),
//     createRow('Nhà giả kim', img, 2, 17.99),
// ];

// const invoiceSubtotal = subtotal(rows);

// const invoiceTotal = invoiceSubtotal;


const Cart = () => {
    const items = useSelector(state => state._todoProduct)
    const dispatch = useDispatch();
    let ListCart = [];
    let TotalCart = 0;
    Object.keys(items.Carts).forEach(function (item) {
        TotalCart += items.Carts[item].quantity * items.Carts[item].price;
        ListCart.push(items.Carts[item]);
    });

    function TotalPrice(price, tonggia) {
        return Number(price * tonggia).toLocaleString('vi-VN');
    }

    const handleIncreaseQuantity = (index) => {
        dispatch(IncreaseQuantity(index));
    }

    const handleDecreaseQuantity = (index) => {
        dispatch(DecreaseQuantity(index));
    }

    const handleDeleteCart = (index) => {
        dispatch(DeleteCart(index));
    }
    return (

        <Container>
            <Title>Giỏ Hàng</Title>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={5}>
                                Mô tả
                            </TableCell>
                            <TableCell align="center">Giá</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tên sách</TableCell>
                            <TableCell align="center">Hình ảnh</TableCell>
                            <TableCell align="center">Số lượng</TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">Giá</TableCell>
                            <TableCell align="center">Tạm tính</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ListCart.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell align="center"   ><img alt="" src={`https://firebasestorage.googleapis.com/v0/b/bookshoponline-85349.appspot.com/o/book%2F${item.image}?alt=media`} style={{ width: '100px', height: '80px' }} /></TableCell>
                                <TableCell align="center">
                                    <Button 
                                    // style={{
                                    //     borderRadius: 0,
                                    //     backgroundColor: 'green',
                                    //     color: 'white',
                                    //     padding: "5px 5px",
                                    //     fontSize: "15px",
                                    //     margin: '2px'
                                    // }}
                                    //     variant="outlined"
                                    >
                                    <IconButton onClick={()=>handleIncreaseQuantity(index)}>
                                        <ControlPointIcon />
                                    </IconButton>    
                                    </Button><div >{item.quantity}</div>
                                    <Button
                                        // style={{
                                        //     borderRadius: 0,
                                        //     backgroundColor: 'green',
                                        //     color: 'white',
                                        //     padding: "5px 5px",
                                        //     fontSize: "15px",
                                        //     margin: '2px'

                                        // }}
                                        // variant="outlined"
                                    >
                                    <IconButton onClick={()=>handleDecreaseQuantity(index)}>
                                        <IndeterminateCheckBoxIcon />
                                    </IconButton>      
                                    </Button></TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={()=>handleDeleteCart(index)}>
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">{item.price}</TableCell>
                                <TableCell align="center">{TotalPrice(item.price,item.quantity)} $</TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell rowSpan={5} />
                            <TableCell colSpan={4}>Thành tiền</TableCell>
                            <TableCell align="center">{Number(TotalCart).toLocaleString('en-US')} $</TableCell>
                        </TableRow>
                        <TableRow >

                            <TableCell>Phí vận chuyển</TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center" >Miễn phí</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4}>Tổng cộng</TableCell>
                            <TableCell align="center">{Number(TotalCart).toLocaleString('en-US')} $</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container >
    )
}

export default Cart;