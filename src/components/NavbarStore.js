import React from "react";
import { Button, IconButton, styled } from "@material-ui/core";
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Link, Switch, Route, BrowserRouter as Router, useNavigate } from "react-router-dom";


import Cart from "./cart/Cart";

const Container = styled('div')(
    {
        height: 75,

    }
);

const Wrapper = styled('div')(
    {
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
);

const Left = styled('div')(
    {
        flex: 1,
        display: 'flex'

    }
)
const SearchContainer = styled('div')(
    {
        border: '0.5px solid lightgray',
        color: 'green',
        fontSize: '14px',
        display: 'flex',
        marginRight: '25px'
    }
)

const Input = styled('input')(
    {
        border: 'none'
    }
)

const Center = styled('div')(
    {
        flex: 1,
        textAlign: 'center'
    }
)

const Logo = styled('h1')(
    {
        fontWeight: 'Bold',
        color: 'green',
    }
)

const Right = styled('div')(
    {
        flex: 1,
        display: 'flex',

        justifyContent: 'flex-end'
    }
)

const MenuItem = styled('div')(
    {
        frontSize: '14px',
        display: 'flex',
        marginLeft: '25px'
    }
)

const NavbarStore = () => {
    // const navigate = useNavigate()
    // const handleClick = () => {
    //     navigate("/cart")
    // }
    return (
        <Container>
            <Wrapper>
                <Left>
                    <SearchContainer>
                        <Input />
                        <Button><Search /></Button>

                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>
                        BOOKSTORE
                    </Logo>
                </Center>
                <Right>
                    <MenuItem>
                        {/* <IconButton
                            onClick={handleClick}
                        >
                            <Badge badgeContent="4" color="primary" style={{ justifyContent: 'flex-end' }}>
                                <ShoppingCartOutlined style={{ fontSize: '35px' }} />
                            </Badge>
                        </IconButton>
                       */}
                        

                            <Link to="/cart">
                                <Badge badgeContent="4" color="primary" style={{ justifyContent: 'flex-end' }}>
                                    <ShoppingCartOutlined style={{ fontSize: '35px' }} />
                                </Badge>
                            </Link>
                           

                        <Button>Đăng nhập</Button>
                        <Button>Đăng kí</Button>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    );

}
export default NavbarStore;