import { useState, useEffect, useRef } from "react";
import {
  Button,
  styled,
  Badge,
  Avatar,
  Paper,
  Divider,
  IconButton,
} from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { LoginForm } from "./../pages/LoginForm";
import { RegisterForm } from "./../pages/RegisterForm";
import { logout } from "../actions/auth";
import { history } from "./../helpers/history";
import { clearMessage } from "../actions/message";
import EventBus from "../common/EventBus";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import callApi from "./../api/index";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

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

const MenuItemHandle = styled("div")({
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
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userInfo, setUserInfo] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  const handleOpenRegisterForm = () => setOpenRegisterForm(true);
  const handleCloseRegisterForm = () => setOpenRegisterForm(false);

  const [openSetting, setOpenSetting] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpenSetting((prevOpen) => !prevOpen);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const handleCloseSetting = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenSetting(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(openSetting);
  useEffect(() => {
    if (prevOpen.current === true && openSetting === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openSetting;
  }, [openSetting]);

  history.listen((location) => {
    dispatch(clearMessage()); // clear message when changing location
  });

  useEffect(() => {
    if (user) {
      callApi(`user/get-user/${user.id}`, "GET", null).then((res) =>
        setUserInfo(res.data)
      );
      setCurrentUser(user);
      // setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
    return () => {
      EventBus.remove("logout");
    };
  }, [user]);

  const logOut = () => {
    dispatch(logout());
    navigate("/");
  };

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
          <MenuItemHandle>
            <IconButton>
              <Link to="/cart">
                <Badge
                  badgeContent={numberCart}
                  color="primary"
                  style={{ justifyContent: "flex-end" }}
                >
                  <ShoppingCartOutlined style={{ fontSize: "35px" }} />
                </Badge>
              </Link>
            </IconButton>

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
                <Button
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={openSetting ? "composition-menu" : undefined}
                  aria-expanded={!openSetting ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={`https://firebasestorage.googleapis.com/v0/b/bookshoponline-85349.appspot.com/o/user%2F${userInfo?.avatar}?alt=media`}
                  />
                  &nbsp;&nbsp;{userInfo?.username}
                </Button>
                <Popper
                  open={openSetting}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        borderRadius: "0px",
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleCloseSetting}>
                          <List
                            // autoFocusItem={openSetting}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                            style={{ marginTop: "1ch" }}
                          >
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar
                                  alt="Remy Sharp"
                                  src={`https://firebasestorage.googleapis.com/v0/b/bookshoponline-85349.appspot.com/o/user%2F${userInfo?.avatar}?alt=media`}
                                />
                              </ListItemAvatar>
                              <Link
                                style={{ textDecoration: "none" }}
                                onClick={handleCloseSetting}
                                to="/user-profile"
                              >
                                <ListItemText
                                  primary={userInfo?.fullname}
                                  secondary="Xem thông tin cá nhân của bạn"
                                />
                              </Link>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem>
                              <ListItemAvatar>
                                <LogoutOutlinedIcon />
                              </ListItemAvatar>
                              <Button onClick={logOut}>Đăng xuất</Button>
                            </ListItem>
                          </List>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </>
            )}
          </MenuItemHandle>
        </Right>
      </Wrapper>
    </Container>
  );
};
export default NavbarStore;
