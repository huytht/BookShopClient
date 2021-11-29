import React,{createContext, useState } from "react";

export const CommentContext = createContext({
    data: '',
    setData: () => { },
    // nameUser: '',
    // setNameUser: () => { },
    // commentUser: '',
    // setCommentUser: () => { }
});
const ListComment = [
    {
        id:1,
        nameUser:'Anh Kha',
        commentUser:'Hay quá'
    },
    {
        id:2,
        nameUser:'Tường Huy',
        commentUser:'Vote 5sao'
    },
    {
        id:3,
        nameUser:'Thiên Phú',
        commentUser:'Nhân viên nhiệt tình'
    },
    {
        id:4,
        nameUser:'Admin',
        commentUser:'Cảm ơn độc giảCảm ơn độc giảCảm ơn độc giảCảm ơn độc giảCảm ơn độc giảCảm ơn độc giảCảm ơn độc giảCảm ơn độc giảCảm ơn độc giảCảm ơn độc giả'
    },
    {
        id:5,
        nameUser:'Admin',
        commentUser:'Sách đã được cập nhật'
    },

]

export const CommentContextProvider = ({ children }) => {
    const [myData, setMyData] = useState(ListComment);
    const [myName, setMyName] = useState('');
    const [myComment, setMyComment] = useState('')
    return (
        <CommentContext.Provider value={{
            data:myData,
            setData:setMyData,
            nameUser:myName,
            setNameUser:setMyName,
            commentUser:myComment,
            setCommentUser:setMyComment       
        }}>
            {children}
        </CommentContext.Provider>
    )
};