import  RBookDetails  from "../components/book/RBookDetails"
import  RRatingBook  from "../components/book/RRatingBook"
import Cart from "../components/cart/Cart"

export const routes = [
    {
        path: "/bookdetail",
        element: <RBookDetails/>,
        label: "Giới thiệu sách"
    },
    {
        path: "/ratingbook",
        element: <RRatingBook/>,
        label: "Đánh giá sách"
    },
     
]
export const routesCart = [
    {
        path: "/cart",
        element: <Cart/>,
        label: "Giỏ hàng"
    },
    
]
