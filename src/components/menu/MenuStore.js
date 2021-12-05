import React from "react";
import { styled } from "@material-ui/core";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { MenuList } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";

import { GridList, GridListTile } from "@material-ui/core";
import { AspectRatio } from "@material-ui/icons";
import { display, height } from "@mui/system";

const Container = styled("div")({
  height: 60,
});
const Wrapper = styled("div")({
  padding: 10,
  flex: 1,
  justifyContent: "space-between",
});

const Right = styled("div")({
  justifyContent: "flex-end",
  display: "flex",
  flex: 1,
});

const cate = [
  "Tiểu thuyết",
  "Trinh thám",
  "Blockchain",
  "Sách mới",
  "Lập trình",
  "Hài hước",
  "Ngôn tình",
  "Truyện Kiều",
  "Tiểu thuyết",
  "Trinh thám",
  "Blockchain",
  "Sách mới",
  "Lập trình",
  "Hài hước",
  "Ngôn tình",
];
const itemData = [
  {
    id: 1,
    img: "https://www.vinabook.com/images/thumbnails/promo/802x480/363488_final1511.jpg",
    title: "Bed",
    cols: 4,
  },
  {
    id: 2,
    img: "https://www.vinabook.com/images/thumbnails/promo/802x480/363107_05.jpg",
    title: "Books",
    cols: 2,
  },
  {
    id: 3,
    img: "https://www.vinabook.com/images/thumbnails/promo/802x480/363109_04.jpg",
    title: "Sink",
    cols: 2,
  },
  {
    id: 4,
    img: "https://www.vinabook.com/images/thumbnails/promo/802x480/363107_05.jpg",
    title: "Books",
    cols: 2,
  },
  {
    id: 5,
    img: "https://www.vinabook.com/images/thumbnails/promo/802x480/363109_04.jpg",
    title: "Sink",
    cols: 2,
  },
];
const itemData2 = [
  {
    id: 1,
    img: "https://www.vinabook.com/images/thumbnails/promo/802x480/363488_final1511.jpg",
    title: "Bed",
  },
  {
    id: 2,
    img: "https://www.vinabook.com/images/thumbnails/promo/802x480/363107_05.jpg",
    title: "Books",
  },
  {
    id: 3,
    img: "https://www.vinabook.com/images/thumbnails/promo/802x480/363109_04.jpg",
    title: "Sink",
  },
];
const MenuStore = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Container>
      <Wrapper>
        <AppBar
          position="static"
          style={{
            backgroundColor: "green",
            maxHeight: 50,
            justifyContent: "center",
            border: 0,
          }}
        >
          <Toolbar style={{}}>
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={!open ? "true" : undefined}
              aria-haspopup="true"
              style={{ color: "white" }}
              onClick={handleToggle}
            >
              <MenuIcon />&nbsp;
              Danh mục thể loại
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              // disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    borderRadius: "0px",
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                        style={{ marginTop: "1ch" }}
                      >
                        {cate.map((option, index) => (
                          <MenuItem
                            key={index}
                            style={{ width: "22ch", justifyContent: "center" }}
                            onClick={handleClose}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <Right>
              <Tooltip
                title="Tổng đài chăm sóc và Hỗ trợ Khách hàng hoạt động suốt 7 ngày trong tuần
                                        Thứ 2 - 7: hoạt động từ 7:30 - 20:00
                                        Chủ nhật: hoạt động từ 8:00 - 17:00"
                style={{ color: "white" }}
                arrow
              >
                <Button>Hotline:1234</Button>
              </Tooltip>
            </Right>
          </Toolbar>
        </AppBar>
      </Wrapper>
    </Container>
  );
};
export default MenuStore;
