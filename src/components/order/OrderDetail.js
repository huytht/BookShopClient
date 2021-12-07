import React from "react";
import { IconButton, styled } from "@material-ui/core";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Container = styled('div')(
    {
        padding: "10px"
    }
)
const Title = styled('h1')(
    {
        textAlign: 'center',
        color: 'rgba(86, 141, 229, 1)'
    }
)
function createData(id, date, quantity,sum, delivery_address, type_pay,status) {
    return {id, date, quantity,sum, delivery_address, type_pay,status };
}
const rows = [
    createData('1', '7/12/2021', 6, 24, 'ABC', 'ATM','Giao'),
    createData('1', '7/12/2021', 6, 24, 'ABC', 'ATM','Giao'),
    createData('1', '7/12/2021', 6, 24, 'ABC', 'ATM','Giao'),
    createData('1', '7/12/2021', 6, 24, 'ABC', 'ATM','Giao'),
];
const OrderDetail = () => {
    return (
        <Container>
            <Title>Đơn hàng của tôi</Title>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', border: "2px solid rgba(86, 141, 229, 1)" }}>
                <div>

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >

                        <TextField
                            id="date"
                            type="date"

                            InputLabelProps={{
                                shrink: true
                            }}

                            label="Ngày"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                            id="id_order"
                            InputLabelProps={{
                                shrink: true
                            }}
                            type="text"
                            label="Mã đơn hàng"
                        />

                    </FormControl>

                </div>
                <IconButton style={{ color: "rgba(86, 141, 229, 1)", marginTop: '70px', marginLeft: '15px', }}>
                    <SearchIcon />
                </IconButton>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Mã đơn hàng</TableCell>
                                <TableCell align="center">Ngày tạo</TableCell>
                                <TableCell align="center">Số lượng </TableCell>
                                <TableCell align="center">Tổng cộng</TableCell>
                                <TableCell align="center">Địa chỉ giao hàng</TableCell>
                                <TableCell align="center">Loại thanh toán</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.date}</TableCell>
                                    <TableCell align="center">{row.quantity}</TableCell>
                                    <TableCell align="center">{row.sum}</TableCell>
                                    <TableCell align="center">{row.delivery_address}</TableCell>
                                    <TableCell align="center">{row.type_pay}</TableCell>
                                    <TableCell align="center">{row.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    )
}
export default OrderDetail;