import Home from "./pages/Home"
import BookDetails from "./pages/BookDetails"
import Cart from "./components/cart/Cart";
import NavbarStore from "./components/NavbarStore";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MenuStore from "./components/menu/MenuStore";
import Footer from "./components/footer/Footer";
import { UserProfile } from './pages/UserProfile';
import { CheckoutForm } from "./components/checkout/CheckoutForm";
import BookCategory from "./components/categories/BookCategory";
import BookSearchList from "./components/book/BookSearchList";
import OrderDetail from "./components/order/OrderDetail";
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
          <Route path="/bookcate" exact element={<BookCategory />} />
          <Route path="/search" exact element={<BookSearchList/>} />
          <Route path="/order" exact element={<OrderDetail />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
