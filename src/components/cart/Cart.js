import React, { useEffect } from "react";
import { Button, Container, IconButton, Link, styled } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch } from "react-redux";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import {
  IncreaseQuantity,
  DecreaseQuantity,
  DeleteCart,
} from "../../actions/cart";
import { useNavigate } from 'react-router-dom';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let ListCart = [];
  let TotalCart = 0;
  let cartStorage = JSON.parse(localStorage.getItem("carts")).Carts;
  Object.keys(cartStorage).forEach(function (item) {
    TotalCart += cartStorage[item].quantity * cartStorage[item].price;
    ListCart.push(cartStorage[item]);
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

  const handlePageReturn = () => {
    navigate("/");
  }
  const handlePageCheckout = () => {
    navigate("/checkout");
  }
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
                  <IconButton
                    color="primary"
                    onClick={() => handleIncreaseQuantity(index)}
                  >
                    <AddBoxOutlinedIcon />
                  </IconButton>
                  {item.quantity}
                  <IconButton
                    color="primary"
                    onClick={() => handleDecreaseQuantity(index)}
                  >
                    <IndeterminateCheckBoxOutlinedIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteCart(index)}
                  >
                    <DeleteOutlineOutlinedIcon />
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
              <TableCell colSpan={4}>Phí vận chuyển</TableCell>
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
            <TableRow>
              <TableCell colSpan={3} />
              <TableCell>
                <Button
                  style={{
                    backgroundColor: "#CECDCD",
                    color: "black",
                    fontWeight: "bold",
                    height: "50px",
                    marginTop: "25px",
                    borderRadius: "0px",
                    textDecoration: "none",
                  }}
                  onClick={handlePageReturn}
                  fullWidth
                  variant="outlined"
                >
                  Quay lại
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  style={{
                    backgroundColor: "#FDC92D",
                    color: "black",
                    fontWeight: "bold",
                    height: "50px",
                    marginTop: "25px",
                    borderRadius: "0px",
                  }}
                  fullWidth
                  variant="outlined"
                  onClick={handlePageCheckout}
                >
                  Thanh toán
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Cart;
