import React, { useState, useEffect } from "react";
import {
  Grid,
  CardHeader,
  CardContent,
  Divider,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import callApi from "../../api";

const initShippingAddress = {
  province_city: 26,
  town_district: "",
  street: "",
  zip_code: 0,
}

export const Payment = ({ provinceCityList, townDistrictList, paymentList }) => {
  const [sameShippingAddress, setSameShippingAddress] = useState(localStorage.getItem("sameShippingAddress") !== undefined ? localStorage.getItem("sameShippingAddress") : false);

  const handleCheckBoxChange = (event) => {
    localStorage.setItem("sameShippingAddress", !sameShippingAddress);
    setSameShippingAddress(!sameShippingAddress);
  };

  const [townDistrict, setTownDistrict] = useState([{}]);
  const [payment, setPayment] = useState({})
  const [billingAddress, setBillingAddress] = useState(initShippingAddress);

  const handleChange = (event) => {
    event.preventDefault();
    setBillingAddress({
      ...billingAddress,
      [event.target.name]: event.target.value,
    });
    setPayment({
      ...payment,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (sameShippingAddress) {
      setBillingAddress(JSON.parse(localStorage.getItem("shippingAddress")));
    } else {
      setBillingAddress(initShippingAddress);
    }
  }, [sameShippingAddress])

  useEffect(() => {
    if (billingAddress.province_city !== "") {
      callApi(
        `province-city/get-town-district-by-province-city/${billingAddress.province_city}`,
        "GET",
        null
      ).then((res) => setTownDistrict(res.data));
    }
    localStorage.setItem("billingAddress", JSON.stringify(billingAddress));
  }, [billingAddress]);

  return (
    <>
      <CardHeader title="Địa chỉ thanh toán" />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckBoxChange}
                  checked={sameShippingAddress}
                  inputProps={{ "aria-label": "controlled" }}
                  color="primary"
                />
              }
              label="Địa chỉ giao hàng giống địa chỉ thanh toán"
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="province_city">Tỉnh/thành</InputLabel>
            <Select
              fullWidth
              name="province_city"
              label="Tỉnh/thành"
              onChange={handleChange}
              select
              value={billingAddress.province_city}
              MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
            >
              {provinceCityList.map((option) => (
                <MenuItem key={option?.code} value={option?.code}>
                  {option?.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="town_district">Quận/huyện</InputLabel>
            <Select
              fullWidth
              name="town_district"
              label="Quận/huyện"
              onChange={handleChange}
              select
              value={billingAddress.town_district}
              MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
            >
              {townDistrict.map((option) => (
                <MenuItem key={option?.code} value={option?.code}>
                  {option?.name_with_type}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Địa chỉ (đường, phường, xã, ...)"
              name="street"
              value={billingAddress.street}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Zip/Postal code"
              name="zip_code"
              placeholder="70000"
              value={billingAddress.zip_code}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardHeader title="Thông tin thẻ" />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel id="payment_id">Loại thẻ</InputLabel>
            <Select
              fullWidth
              name="payment_id"
              label="Loại thẻ"
              onChange={handleChange}
              select
              value={payment.id}
              MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
            >
              {paymentList.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
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
