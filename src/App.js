import Home from "./pages/Home"
import BookDetails from "./pages/BookDetails"
import Cart from "./components/cart/Cart";
import NavbarStore from "./components/NavbarStore";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MenuStore from "./components/menu/MenuStore";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavbarStore />
        <MenuStore/>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/book" exact element={<BookDetails />} />
          <Route path="/cart" exact element={<Cart />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
