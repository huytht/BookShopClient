import { Checkbox, FormControlLabel, Grid, TextField } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useRef, useState } from "react";
import { login } from "../actions/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "bootstrap/dist/css/bootstrap.min.css";
import { clearMessage } from "../actions/message";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export const LoginForm = () => {
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  
  const { message } = useSelector((state) => state.message);
  let form = useRef();
  let checkBtn = useRef();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [value, setValue] = useState({
    username: "",
    password: "",
    loading: false,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setValue({
      ...value,
      loading: true,
    });

    form.validateAll();
    dispatch(clearMessage());

    if (checkBtn.context._errors.length === 0) {
      dispatch(login(value.username, value.password))
        .then(() => {
          // navigate("/");
        })
        .catch(() => {
          setValue({
            ...value,
            loading: false,
          });
        });
    } else {
      setValue({
        ...value,
        loading: false,
      });
    }
  };

  return (
    <Grid>
      <Grid align="center">
        <Avatar style={avatarStyle} />
        <h2>ĐĂNG NHẬP</h2>
      </Grid>
      <Form onSubmit={handleLogin} ref={(f) => (form = f)}>
        <label style={{ fontWeight: "bold" }} htmlFor="username">
          Tài khoản
        </label>
        <Input
          placeholder="Nhập tài khoản"
          className="form-control"
          onChange={handleChange}
          value={value.username}
          variant="outlined"
          name="username"
          validations={[required]}
          style={{ width: "100%" }}
        />
        <label style={{ fontWeight: "bold" }} htmlFor="password">
          Mật khẩu
        </label>
        <Input
          placeholder="Nhập mật khẩu"
          type="password"
          onChange={handleChange}
          className="form-control"
          variant="outlined"
          name="password"
          value={value.password}
          validations={[required]}
          style={{ width: "100%" }}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          disabled={value.loading}
        >
          {value.loading && (
            <span className="spinner-border spinner-border-sm" />
          )}
          ĐĂNG NHẬP
        </Button>
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <CheckButton
          style={{ display: "none" }}
          ref={(c) => {
            checkBtn = c;
          }}
          name="checkBtn"
        />
      </Form>
    </Grid>
  );
};
