import React, { useEffect }  from "react";
import { styled } from "@material-ui/core";
import callApi from "../../api";
import { Grid } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { AddCart, GetAllProductBest } from "../../actions/cart";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const RelatedBook = () => {
    const { _productBestList} = useSelector((state) => state.product);
    const dispatch = useDispatch();
    useEffect(() => {
      callApi("book/list-best-book", "GET", null).then((res) => {
        dispatch(GetAllProductBest(res.data));
      });
    }, []);
  
    const handleAddToCart = (item) => {
      dispatch(AddCart(item));
    };
    return (
        <Grid container spacing={2} direction="row" sx={{ width: "auto" }}>
        {_productBestList.map((item, key) => (
          <Grid key={item._id} item xs={6} md={3} style={{ padding: 40 }}>
            <Card
              sx={{
                marginTop: 1,
                width: "100%",
                borderBottomColor: "red",
              }}
            >
              <CardMedia
                component="img"
                height="270"
                src={`https://firebasestorage.googleapis.com/v0/b/bookshoponline-85349.appspot.com/o/book%2F${item.image}?alt=media`}
                alt="green iguana"
              />
              <CardContent sx={{ textAlign: "center", height: "40px" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{ alignItems: "center", fontSize: "15px" }}
                >
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    to={`/book?id=${item._id}`}
                  >
                    <h4>{item.title}</h4>
                  </Link>
                </Typography>
              </CardContent>

              <CardActions
                sx={{
                  justifyContent: "center",
                  height: "110px",
                  width: "100%",
                }}
              >
                <Button
                  sx={{
                    background: "green",
                    color: "white",
                    "&:hover": {
                      background: "green",
                    },
                  }}
                  onClick={() => handleAddToCart(item)}
                >
                  Thêm vào giỏ <ShoppingCartOutlined />
                </Button>
                <span style={{ color: "red", marginLeft: "20px" }}>
                  <h4>
                    {item.price?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </h4>
                </span>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
};
export default RelatedBook;
