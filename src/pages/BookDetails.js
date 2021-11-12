import React from "react";
import { Container, styled } from "@material-ui/core";
import NavbarStore from "../components/NavbarStore";
import MenuStore from "../components/menu/MenuStore";
import Footer from "../components/footer/Footer"

const BookDetails =()=>{
    return (
        <Container>
            <NavbarStore/>
            <MenuStore/>
            <Footer/>
        </Container>
        
    )
}
export default BookDetails