import Home from "./pages/Home"
import BookDetails from "./pages/BookDetails"
import Cart from "./components/cart/Cart";
import NavbarStore from "./components/NavbarStore";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MenuStore from "./components/menu/MenuStore";
import Footer from "./components/footer/Footer";
import { UserProfile } from './pages/UserProfile';
import { CheckoutForm } from "./components/checkout/CheckoutForm";

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
          <Route path="/user-profile" exact element={<UserProfile />} />
          <Route path="/checkout" exact element={<CheckoutForm />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
