import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@material-ui/core';
import { Divider, Avatar, Grid } from "@material-ui/core";
import Moment from "react-moment";
import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button } from "@material-ui/core";

const Title = styled('h1')(
    {
        marginLeft: '10px',
        color: 'green'
    }
)
const Rate = styled('div')(
    {
        display: 'flex',
        marginLeft: '10px',
        marginTop: '10px',
    }
)

const Content = styled('div')(
    {
        display: 'flex',
        marginLeft: '10px',
        marginTop: '20px',
    }
)
const Name = styled('div')(
    {
        display: 'flex',
        marginLeft: '10px',
        marginTop: '20px',
    }
)


const RRatingBook = ({props}) => {
    const [value, setValue] = useState({
        book_id: props.book_id,
        user_id: 0,
        created_date: new Date(),
        rate: 0,
        remark: '',
        favourite: true,
    });
    const handleChange = (e) => {
        e.preventDefault();
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }
    const handleClick = (e) => {

    }

    return (
        
        <Paper elevation={0} style={{ marginTop: '10px', width: '1015px', height: '100%' }} >
            <Title>Đánh giá của độc giả</Title>
            <Paper elevation={0} style={{ marginTop: '10px', width: '400px', height: '100%', marginLeft: '10px' }} >
                <Box style={{border:'1px solid black',height:'215px'}}>
                <Rate> Đánh giá:
                    <Box>

                        <Rating
                            name="simple-controlled"
                            value={value.rate}
                            onChange={handleChange}
                            style={{ marginLeft: '10px', }}
                        />

                    </Box>
                </Rate>
                {/* <Name>Tên: <input style={{ marginLeft: '50px', width: '70%' }} value={values.user_id.name} onChange={(e) => { setNameUser(e.target.value) }}></input></Name> */}
                <Content>Nội dung: <input style={{ marginLeft: '15px', height: '50px', width: '70%' }} value={value.remark} onChange={handleChange}></input></Content>
                <Button style={{ backgroundColor: 'green', color: 'white', marginLeft: '150px', marginTop: '10px' }} onClick={handleClick}> Gửi đánh giá</Button>
            </Box>
                <div style={{ padding: 14 }} className="App">
                    <Title>Comments</Title>
                    {props.map((item) => (
                        <Paper style={{ padding: "40px 20px", width: '1000px',height:'100%' }} >
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item>
                                    <Avatar alt="Remy Sharp" src={`https://firebasestorage.googleapis.com/v0/b/bookshoponline-85349.appspot.com/o/user%2F${props.user?.avatar}?alt=media`} />
                                </Grid>
                                <Grid justifyContent="left" item xs zeroMinWidth>
                                    <h4 style={{ margin: 0, textAlign: "left" }}>{item.user.fullname}</h4>
                                    <p style={{ textAlign: "left" }}>
                                        {item.remark}
                                    </p>
                                    <p style={{ textAlign: "left", color: "gray" }}>
                                        <Moment fromNow>{item.created_date * 1000}</Moment>
                                    </p>
                                </Grid>
                            </Grid>
                            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />

                        </Paper>
                    ))}
                    <Stack spacing={2}>
                        <Pagination count={10} size="small" style={{ marginTop: '20px' }} />
                    </Stack>
                </div>
            </Paper>

        </Paper>

    )
}
export default RRatingBook;