import React from "react";
import { Container, IconButton, styled } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useSelector, useDispatch } from "react-redux";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import {
  IncreaseQuantity,
  DecreaseQuantity,
  DeleteCart,
} from "../../actions/cart";

const Title = styled("h1")({
  paddingLeft: "10px",
  margin: "20px",
  marginRight: "40px",
  color: "green",
  width: "auto",
  display: "flex",
  flex: 1,
  justifyContent: "center",
});

const Cart = () => {
  const items = useSelector((state) => state.product);
  const dispatch = useDispatch();
  let ListCart = [];
  let TotalCart = 0;
  Object.keys(items.Carts).forEach(function (item) {
    TotalCart += items.Carts[item].quantity * items.Carts[item].price;
    ListCart.push(items.Carts[item]);
  });

  function TotalPrice(price, tonggia) {
    return Number(price * tonggia).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  const handleIncreaseQuantity = (index) => {
    dispatch(IncreaseQuantity(index));
  };

  const handleDecreaseQuantity = (index) => {
    dispatch(DecreaseQuantity(index));
  };

  const handleDeleteCart = (index) => {
    dispatch(DeleteCart(index));
  };
  return (
    <Container>
      <Title>Giỏ Hàng</Title>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
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
                <TableCell align="center">
                  <img
                    alt=""
                    src={`https://firebasestorage.googleapis.com/v0/b/bookshoponline-85349.appspot.com/o/book%2F${item.image}?alt=media`}
                    style={{ width: "100px", height: "100px" }}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleIncreaseQuantity(index)}>
                    <AddBoxOutlinedIcon  />
                  </IconButton>
                  {item.quantity}
                  <IconButton color="primary" onClick={() => handleDecreaseQuantity(index)}>
                    <IndeterminateCheckBoxOutlinedIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton color="secondary" onClick={() => handleDeleteCart(index)}>
                    <DeleteOutlineOutlinedIcon  />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  {item.price?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </TableCell>
                <TableCell align="center">
                  {TotalPrice(item.price, item.quantity)}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={5} />
              <TableCell colSpan={4}>Thành tiền</TableCell>
              <TableCell align="center">
                {Number(TotalCart).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phí vận chuyển</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Miễn phí</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}>Tổng cộng</TableCell>
              <TableCell align="center">
                {Number(TotalCart).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Cart;
