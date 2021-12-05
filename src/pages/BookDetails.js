import { useState, useEffect } from "react";
import { styled } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import RBookDetails from "../components/book/RBookDetails";
import RRatingBook from "../components/book/RRatingBook";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import callApi from "../api/index";
import { useDispatch } from "react-redux";
import { GetProductDetail } from "../actions/cart";
import { useSelector } from "react-redux";

const Container = styled("div")({});

const Wrapper = styled("div")({
  marginTop: "10px",
  padding: 10,
  flex: "1",
});

const DESCSUMARY = styled("div")({
  marginTop: "50px",
});

const PAY = styled("h1")({
  textAlign: "center",
  borderBottom: "1px solid green",
  color: "green",
});
const Info = styled("div")({});

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const BookDetails = () => {
  const [value, setValue] = useState(0);
  const { _product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const params = new URL(document.location).searchParams;

  useEffect(() => {
    callApi(`book/get-book/${params.get("id")}`, "GET", null).then((res) => {
      dispatch(GetProductDetail(res.data));
    });
  }, [_product]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Wrapper>
        <Breadcrumbs
          aria-label="breadcrumb"
          style={{ borderBottom: "1px solid green" }}
        >
          <Link underline="hover" color="inherit" href="/">
            Danh mục thể loại
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/getting-started/installation/"
          >
            Tiểu thuyết
          </Link>
          <Typography color="text.primary">{_product.title}</Typography>
        </Breadcrumbs>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 1000,
              height: 500,
              border: "1px solid green",
            },
          }}
        >
          <Paper elevation={0} style={{}}>
            <Box
              sx={{
                width: 500,
                height: 480,
                m: 1,
                direction: "column",
              }}
            >
              <img
                style={{
                  width: 500,
                  height: 480,
                }}
                alt=""
                src={`https://firebasestorage.googleapis.com/v0/b/bookshoponline-85349.appspot.com/o/book%2F${_product?.image}?alt=media`}
              />
            </Box>
            <Box
              style={{
                marginLeft: "540px",
                marginTop: "-490px",
                width: 450,
                height: 480,
              }}
            >
              <h1>{_product.title}</h1>
              <label>Tác giả:</label>{" "}
              <a style={{ fontWeight: "bold" }}>{_product.author}</a> <br />
              <label>Nhà xuất bản:</label>{" "}
              <a style={{ fontWeight: "bold" }}>{_product.publisher?.name}</a>{" "}
              <br />
              <label>Thể loại:</label>{" "}
              {_product.category?.map((item, index) => (
                <a key={index} style={{ fontWeight: "bold" }}>
                  {item}
                  {index !== _product.category?.length - 1 ? ", " : " "}
                </a>
              ))}
              <br />
              <label style={{ display: "flex" }}>
                Đánh giá:{" "}
                {_product.review?.length === 0
                  ? "Chưa có đánh giá"
                  : _product.rate}{" "}
                {_product.review?.length !== 0 && <StarBorderOutlinedIcon />}
              </label>
              <DESCSUMARY>
                {_product.summary_content?.substr(0, 300)}...{" "}
                <a href="#">Xem thêm</a>
              </DESCSUMARY>
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 300,
              height: 300,
              border: "1px solid green",
            },
          }}
        >
          <Paper
            elevation={0}
            style={{ marginLeft: "1020px", marginTop: "-509.7px" }}
          >
            <PAY>Thanh toán</PAY>
            <Info>
              <div
                style={{
                  display: "flex",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                Giá bán:{" "}
                <p
                  style={{
                    color: "red",
                    justifyContent: "flex-end",
                    display: "flex",
                    flex: 1,
                    marginRight: "10px",
                  }}
                >
                  {_product.price?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  fontWeight: "bold",
                  marginLeft: "10px",
                  marginTop: "25px",
                }}
              >
                Trạng thái:{" "}
                <p
                  style={{
                    color: "green",
                    justifyContent: "flex-end",
                    display: "flex",
                    flex: 1,
                    marginRight: "10px",
                  }}
                >
                  {_product.quantity_active === 0 ? "Hết hàng" : "Còn hàng"}
                </p>
              </div>
            </Info>

            <Button
              style={{
                backgroundColor: "green",
                color: "white",
                fontWeight: "bold",
                height: "50px",
                marginTop: "25px",
                borderRadius: "0px",
              }}
              fullWidth
            >
              Mua ngay
            </Button>
            <Button
              style={{
                backgroundColor: "#FDC92D",
                color: "black",
                fontWeight: "bold",
                height: "50px",
                borderRadius: "0px",
              }}
              fullWidth
            >
              Thêm vào giỏ hàng
              <ShoppingCartOutlined />
            </Button>
          </Paper>
        </Box>
        <Box sx={{ width: "100%", marginTop: "10px" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Chi tiết sách" {...a11yProps(0)} />
              <Tab label="Đánh giá của độc giả" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <RBookDetails props={_product} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RRatingBook props={_product.review} />
          </TabPanel>
        </Box>
      </Wrapper>
    </Container>
  );
};
export default BookDetails;
