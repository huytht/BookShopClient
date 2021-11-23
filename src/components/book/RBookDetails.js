import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@material-ui/core';

const Title = styled('h1')(
    {
        marginLeft: '10px',
        color: 'green'
    }
)
const DESC = styled('div')(
    {
        marginLeft: '10px'
    }
)

const RBookDetails = () => {
    return (
        <Paper elevation={0} style={{ marginTop: '10px', width: '1015px' }} >
            <Title>Nhà Giả Kim</Title>
            <DESC>
                Cuốn sách là câu chuyện kể về anh chàng chăn cừu Santiago, người Tây Ban Nha. Cậu đã được kỳ vọng để trở thành một linh mục, trở thành niềm tự hào của gia đình. Nhưng cậu đã từ bỏ mong muốn ấy để trở thành một anh chàng chăn cừu. Đó là cách duy nhất để cậu có thể “nay đây mai đó” vì cậu cũng muốn biết về phụ nữ và đất nước của những vị khách lạ kia. Santiago cũng xem đó là ước mơ của mình với mong muốn có thể biết thêm nhiều điều.

                Cậu đã nói chuyện về mong muốn của mình với bố. Bố cậu cũng không nói gì nhiều, chỉ đưa cho cậu ba đồng tiền vàng cổ Tây Ban Nha, số tiền mà lẽ ra để Santiago được nhận vào một nhà thờ. Santiago nhìn thấy trong mắt ông những ước mơ được phiêu du, nhưng dường như nó đã bị lãng quên bởi cái ăn, cái uống, bởi chốn nương thân hàng ngày.

                Người cha tích góp số tiền đó vì mong con có thể làm điều mình mong muốn, được đi đây đó, gặp gỡ nhiều người. Đó là một tình yêu vĩ đại mà cao cả, là tình yêu vô điều kiện của gia đình. Còn gì vui hơn khi thấy con cháu được sống với con người, ước mơ của chúng.
            </DESC>
        </Paper>
    )
}

export default RBookDetails;