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

const steps = ["Thông tin giao hàng", "Thông tin thanh toán", "Xác nhận"];

export const CheckoutForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [provinceCity, setProvinceCity] = useState([{}]);
  const [townDistrict, setTownDistrict] = useState([{}]);
  const [payment, setPayment] = useState([{}]);
  const { user } = useSelector((state) => state.auth);

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
    callApi(`payment`, "GET", null).then((res) =>
      setPayment(res.data)
    );
  }, []);

  useEffect(() => {
    if (user) {
      callApi(`user/get-user/${user.id}`, "GET", null).then((res) =>
        setUserInfo(res.data)
      );
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
    return () => {
      EventBus.remove("logout");
    };
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
        {activeStep === steps.length ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            {handleChangeStep(activeStep)}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2, mb: 2 }}>
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
              <Button onClick={handleNext} variant="outlined" sx={{ mr: 2 }}>
                {activeStep === steps.length - 1 ? "Hoàn thành" : "Tiếp theo"}
              </Button>
            </Box>
          </Fragment>
        )}
      </Card>
    </Box>
  );
};
