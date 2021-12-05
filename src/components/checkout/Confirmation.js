import React, { useContext } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  CardHeader,
  Divider,
  CardContent,
  Typography,
} from "@mui/material";

export const Confirmation = () => {
  return (
    <>
      <CardHeader title="Thông tin giao hàng" />
      <Divider />

      <CardContent>
        <Typography variant="subtitle1">Địa chỉ giao hàng:</Typography>
        <Typography variant="overline">Họ và tên:</Typography>
        <br />
        <Typography variant="overline">Địa chỉ:</Typography>
        <br />
        <Typography variant="overline">
          Tỉnh/thành, Quận/huyện, Zip code:
        </Typography>
        <br />
      </CardContent>
      <CardContent>
        <Typography variant="subtitle1">
          Phương thức giao hàng:{" "}
          <Typography variant="overline"> Miễn phí </Typography>
        </Typography>
      </CardContent>
      <CardHeader title="Thông tin thanh toán" />
      <Divider />
      <CardContent>
        <Typography variant="subtitle1">Địa chỉ thanh toán: </Typography>
        <Typography variant="overline"> Địa chỉ thanh toán: </Typography>
      </CardContent>
    </>
  );
};
