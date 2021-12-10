/* eslint-disable react-hooks/exhaustive-deps */
import { useState, Fragment, useEffect } from "react";
import { ShippingAddress } from "./ShippingAddress";
import { Payment } from "./Payment";
import { Confirmation } from "./Confirmation";
import {
  Card,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import callApi from "../../api";
import EventBus from "../../common/EventBus";
import { useSelector } from "react-redux";
import Success from "./Success";
import { Order } from "../order/Order";

const steps = ["Thông tin giao hàng", "Thông tin thanh toán", "Xác nhận"];

export const CheckoutForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [listBookDetail, setListBookDetail] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [provinceCity, setProvinceCity] = useState([{}]);
  const [townDistrict, setTownDistrict] = useState([{}]);
  const [payment, setPayment] = useState([{}]);
  const { user } = useSelector((state) => state.auth);
  const { numberCart, Carts } = useSelector((state) => state.product);

  // place order
  const [provinceCitySADetail, setProvinceCitySADetail] = useState({});
  const [townDistrictSADetail, setTownDistrictSADetail] = useState({});
  const [provinceCityBADetail, setProvinceCityBADetail] = useState({});
  const [townDistrictBADetail, setTownDistrictBADetail] = useState({});
  const [userOrder, setUserOrder] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [paymentOrder, setPaymentOrder] = useState({});
  const [sameShippingAddress, setSameShippingAddress] = useState(false);

  // item from inserted
  const [shippingAddressInserted, setShippingAddressInserted] = useState({});
  const [billingAddressInserted, setBillingAddressInserted] = useState({});
  const [orderInserted, setOrderInserted] = useState({});
  const [orderDetailInserted, setOrderDetailInserted] = useState([{}]);

  useEffect(() => {
    if (activeStep === 2) {
      setUserOrder(JSON.parse(localStorage.getItem("userOrder")));
      // const carts = JSON.parse(localStorage.getItem("carts")).Carts;
      setShippingAddress(JSON.parse(localStorage.getItem("shippingAddress")));
      setBillingAddress(JSON.parse(localStorage.getItem("billingAddress")));
      setPaymentOrder(JSON.parse(localStorage.getItem("payment")));
      setSameShippingAddress(
        JSON.parse(localStorage.getItem("sameShippingAddress"))
      );
    }
  }, [activeStep]);

  useEffect(() => {
    if (activeStep === 2) {
      callApi(
        `province-city/get-province-city/${shippingAddress.province_city.toString()}`
      ).then((res) => {
        setProvinceCitySADetail(res.data);
        if (sameShippingAddress === true) setProvinceCityBADetail(res.data);
      });
      callApi(
        `town-district/get-town-district/${shippingAddress.town_district.toString()}`
      ).then((res) => {
        setTownDistrictSADetail(res.data);
        if (sameShippingAddress === true) setTownDistrictBADetail(res.data);
      });
      if (sameShippingAddress === false) {
        callApi(
          `province-city/get-province-city/${billingAddress.province_city.toString()}`
        ).then((res) => setProvinceCityBADetail(res.data));
        callApi(
          `town-district/get-town-district/${billingAddress.town_district.toString()}`
        ).then((res) => setTownDistrictBADetail(res.data));
      }
    }
  }, [shippingAddress]);

  let totalCart = 0;
  Object.keys(Carts).forEach(function (item) {
    totalCart += Carts[item].quantity * Carts[item].price;
  });

  // const getBookDetailList = (id, quantity) => {
  //   callApi(`book/get-list-book-detail/${id}/${quantity}`, "GET", null).then(
  //     (res) => setListBookDetail(res.data)
  //   );
  // };

  const handleCreateAddress = () => {
    console.log(provinceCitySADetail);
    console.log(townDistrictSADetail);
    callApi("address/create-address/", "POST", {
      province_city: provinceCitySADetail.name,
      town_district: townDistrictSADetail.name_with_type,
      street: shippingAddress.street,
      zip_code: shippingAddress.zip_code,
    }).then((res) => setShippingAddressInserted(res.data));
    if (sameShippingAddress === false) {
      callApi("address/create-address/", "POST", {
        province_city: provinceCityBADetail.name,
        town_district: townDistrictBADetail.name_with_type,
        street: billingAddress.street,
        zip_code: billingAddress.zip_code,
      }).then((res) => setBillingAddressInserted(res.data));
    }
  };

  const handleCreateOrder = () => {
    console.log(shippingAddressInserted);
    callApi("order/create-order/", "POST", {
      user_id: user.id,
      total_money: parseInt(totalCart),
      payment_id: paymentOrder.payment_id,
      created_date: Math.floor(new Date().getTime() / 1000),
      billing_address_id:
        JSON.stringify(billingAddressInserted) === "{}"
          ? shippingAddressInserted._id
          : billingAddressInserted._id,
      shipping_address_id: shippingAddressInserted._id,
      status: "Complete",
      total_quantity: parseInt(numberCart),
    }).then((res) => setOrderInserted(res.data));
  };
  const handleCreateOrderDetail = () => {
    Carts.map((book) => {
      // getBookDetailList(book._id, book.quantity);
      callApi(`book/get-list-book-detail/${book._id}/${book.quantity}`, "GET", null).then(
        (res) => {
          res.data.map((bookDetailId) => {
            callApi("order-detail/create-order-detail/", "POST", {
              price: book.price,
              order_id: orderInserted._id,
              book_detail_id: bookDetailId,
            }).then((response) =>
              setOrderDetailInserted(...orderDetailInserted, response.data)
            );
          });
        }
      );
      
    });
    if (
      JSON.stringify(orderInserted) !== "{}" &&
      JSON.stringify(orderDetailInserted) !== "{}"
    ) {
      handleNext();
    }
  };

  const handlePlaceOrder = () => {
    handleCreateAddress();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    console.log(shippingAddressInserted);
    if (JSON.stringify(shippingAddressInserted) !== "{}") handleCreateOrder();
  }, [shippingAddressInserted]);

  useEffect(() => {
    if (JSON.stringify(orderInserted) !== "{}") handleCreateOrderDetail();
  }, [orderInserted]);

  useEffect(() => {
    callApi(`province-city`, "GET", null).then((res) =>
      setProvinceCity(res.data)
    );
  }, []);

  useEffect(() => {
    callApi(`town-district`, "GET", null).then((res) =>
      setTownDistrict(res.data)
    );
  }, []);

  useEffect(() => {
    callApi(`payment`, "GET", null).then((res) => setPayment(res.data));
  }, []);

  useEffect(() => {
    callApi(`user/get-user/${user.id}`, "GET", null).then((res) =>
      setUserInfo(res.data)
    );
  }, [user]);

  const handleChangeStep = (activeStep) => {
    switch (activeStep) {
      case 0:
        return (
          <ShippingAddress
            user={userInfo}
            provinceCityList={provinceCity}
            townDistrictList={townDistrict}
          />
        );
      case 1:
        return (
          <Payment
            provinceCityList={provinceCity}
            townDistrictList={townDistrict}
            paymentList={payment}
          />
        );
      case 2:
        return <Confirmation />;
      case 3:
        return (
          <Order
            userOrder={userOrder}
            shippingAddress={shippingAddressInserted._id}
            orderItems={Carts}
            order={orderInserted}
          />
        );

      default:
    }
  };

  return (
    <Box m="auto" sx={{ width: "80%", height: "100%", mt: "30px" }}>
      <Stepper sx={{ mb: "20px" }} activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Card>
        <Fragment>
          {handleChangeStep(activeStep)}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2, mb: 2 }}>
            {activeStep !== 3 && (
              <>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ ml: 2 }}
                  variant="outlined"
                >
                  Quay lại
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {activeStep === steps.length - 1 ? (
                  <Button
                    onClick={handlePlaceOrder}
                    variant="outlined"
                    sx={{ mr: 2 }}
                  >
                    Đặt hàng
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    variant="outlined"
                    sx={{ mr: 2 }}
                  >
                    Tiếp theo
                  </Button>
                )}
              </>
            )}
          </Box>
        </Fragment>
      </Card>
    </Box>
  );
};
