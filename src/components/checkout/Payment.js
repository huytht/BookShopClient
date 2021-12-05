import React, { useState } from "react";
import {
  Grid,
  CardHeader,
  CardContent,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import TextField from "@mui/material/TextField";

export const Payment = () => {
  return (
    <>
      <CardHeader title="Địa chỉ thanh toán" />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox name="agreenemt" color="primary" />}
              label="Địa chỉ giao hàng giống địa chỉ thanh toán"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tỉnh/thành"
              name="province_city"
              select
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Quận/huyện"
              name="town_district"
              select
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Địa chỉ (đường, phường, xã, ...)"
              name="street"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Zip/Postal code"
              name="zip_code"
              placeholder="70000"
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardHeader title="Thông tin thẻ" />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Loại thẻ"
              name="payment_id"
              select
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Số thẻ"
              name="card_number"
              placeholder="xxxx-xxxx-xxxx-xxxx"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Ngày hết hạn"
              name="expiry date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Mã bảo vệ"
              name="security_code"
              placeholder="xxx"
            />
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
};
