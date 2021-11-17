import  RBookDetails  from "../components/book/RBookDetails"
import  RRatingBook  from "../components/book/RRatingBook"


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