import React from "react";
import { Button, Container, styled } from "@material-ui/core";
import NavbarStore from "../NavbarStore";
import MenuStore from "../menu/MenuStore";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { routes } from "../../config/routes";

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

const TAX_RATE = 0.07;

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(sl, gia) {
    return sl * gia;
}

const img = "https://d1j8r0kxyu9tj8.cloudfront.net/images/1567492611Rj5siYiYrkqcvX8.jpg";

function createRow(desc, img, sl, gia) {
    const price = priceRow(sl, gia);
    return { desc, img, sl, gia, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
    createRow('Nhà giả kim', img, 100, 1.15),
    createRow('Nhà giả kim', img, 10, 45.99),
    createRow('Nhà giả kim', img, 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);

const invoiceTotal = invoiceSubtotal;

const Cart = () => {
    return (
        <Container>
            <NavbarStore />
            <MenuStore />
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
                        {rows.map((row) => (
                            <TableRow key={row.desc}>
                                <TableCell>{row.desc}</TableCell>
                                <TableCell align="center"   ><img alt="" src={row.img} style={{ width: '100px', height: '80px' }} /></TableCell>
                                <TableCell align="center">
                                <Button style={{
                                    borderRadius: 0,
                                    backgroundColor:'green',
                                    color:'white',
                                    padding: "5px 5px",
                                    fontSize: "15px",
                                    margin:'2px'
                                }}
                                    variant="outlined"
                                 >+</Button><div >{row.sl}</div>
                                 <Button
                                    style={{
                                        borderRadius: 0,
                                        backgroundColor:'green',
                                        color:'white',
                                        padding: "5px 5px",
                                        fontSize: "15px",
                                        margin:'2px'

                                    }}
                                        variant="outlined"
                                 >-</Button></TableCell>
                                <TableCell align="center"><DeleteOutlineOutlinedIcon /></TableCell>
                                <TableCell align="center">{row.gia}</TableCell>
                                <TableCell align="center">{ccyFormat(row.price)}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell rowSpan={5} />
                            <TableCell colSpan={4}>Thành tiền</TableCell>
                            <TableCell align="center">{ccyFormat(invoiceSubtotal)}</TableCell>
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
                            <TableCell align="center">{ccyFormat(invoiceTotal)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container >
    )
}

export default Cart;