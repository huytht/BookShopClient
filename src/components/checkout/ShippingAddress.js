import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  CardContent,
  CardHeader,
  Divider,
  Radio,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import moment from "moment";

export const ShippingAddress = ({
  user,
  provinceCityList,
  TownDistrictList,
}) => {
  const [values, setValues] = useState({});
  const [shippingAddress, setShippingAddress] = useState({})

  const handleChange = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setValues({
      firstName: user.fullname?.split(" ").slice(-1).join(" "),
      lastName: user.fullname?.split(" ").slice(0, -1).join(" "),
      username: user.username,
      date_of_birth: moment.unix(user.date_of_birth).format("yyyy-MM-DD"),
      email: user.email,
      phone: user.phone,
    });
  }, [user]);

  return (
    <>
      <CardHeader title="Thông tin khách hàng" />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              label="Tên"
              name="firstName"
              onChange={handleChange}
              value={values.firstName}
              placeholder="Nhập tên của bạn"
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              label="Họ và tên đệm"
              name="lastName"
              placeholder="Nhập họ và tên đệm của bạn"
              onChange={handleChange}
              value={values.lastName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              value={values.date_of_birth}
              label="Date of birth"
              name="date"
              type="date"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              label="Phone number"
              name="phone"
              placeholder="09xxxxxx"
              onChange={handleChange}
              value={values.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              label="Email"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardHeader title="Phương thức giao hàng" />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              value="free"
              control={<Radio />}
              label="Miễn phí"
              checked="true"
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardHeader title="Địa chỉ giao hàng" />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel id="province_city">Tỉnh/thành</InputLabel>
            <Select
              fullWidth
              // labelId="province_city"
              name="province_city"
              label="Tỉnh/thành"
              select
              MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
            >
              {provinceCityList.map((option) => (
                <MenuItem key={option?.code} value={option?.code}>
                  {option?.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              label="Quận/huyện"
              name="town_district"
              select
            />
          </Grid> */}
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
    </>
  );
};