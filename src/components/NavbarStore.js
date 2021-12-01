import { useState, useEffect } from "react";
import { Button, styled, Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { LoginForm } from "./../pages/LoginForm";
import { RegisterForm } from "./../pages/RegisterForm";
import { logout } from "../actions/auth";
import { history } from './../helpers/history';
import { clearMessage } from '../actions/message';
import EventBus from '../common/EventBus';

const Container = styled("div")({
  height: 75,
});

const Wrapper = styled("div")({
  padding: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Left = styled("div")({
  flex: 1,
  display: "flex",
});
const SearchContainer = styled("div")({
  border: "0.5px solid lightgray",
  color: "green",
  fontSize: "14px",
  display: "flex",
  marginRight: "25px",
});

const Input = styled("input")({
  border: "none",
});

const Center = styled("div")({
  flex: 1,
  textAlign: "center",
});

const Logo = styled("h1")({
  fontWeight: "Bold",
  color: "green",
});

const Right = styled("div")({
  flex: 1,
  display: "flex",

  justifyContent: "flex-end",
});

const MenuItem = styled("div")({
  frontSize: "14px",
  display: "flex",
  marginLeft: "25px",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NavbarStore = () => {
  const { numberCart } = useSelector((state) => state.product);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  const handleOpenRegisterForm = () => setOpenRegisterForm(true);
  const handleCloseRegisterForm = () => setOpenRegisterForm(false);

  history.listen((location) => {
    dispatch(clearMessage()); // clear message when changing location
  });

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      // setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
    }

    EventBus.on('logout', () => {
      this.logOut();
    });
    return () => {
      EventBus.remove('logout');
    };
  }, [user]);

  const logOut = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (isLoggedIn) setOpen(false);
  }, [isLoggedIn]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input />
            <Button>
              <Search />
            </Button>
          </SearchContainer>
        </Left>
        <Center>
          <Link style={{ textDecoration: "none" }} to="/">
            <Logo>BOOKSTORE</Logo>
          </Link>
        </Center>
        <Right>
          <MenuItem>
            <Link to="/cart">
              <Badge
                badgeContent={numberCart}
                color="primary"
                style={{ justifyContent: "flex-end" }}
              >
                <ShoppingCartOutlined style={{ fontSize: "35px" }} />
              </Badge>
            </Link>
            {!isLoggedIn ? (
              <>
                <Button onClick={handleOpen}>Đăng nhập</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <LoginForm />
                  </Box>
                </Modal>
                <Button onClick={handleOpenRegisterForm}>Đăng kí</Button>
                <Modal
                  open={openRegisterForm}
                  onClose={handleCloseRegisterForm}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <RegisterForm />
                  </Box>
                </Modal>
              </>
            ) : (
              <>
                <Button onClick={logOut}>Đăng xuất</Button>
              </>
            )}
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};
export default NavbarStore;
