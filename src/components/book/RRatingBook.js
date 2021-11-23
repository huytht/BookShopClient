import React, { useContext } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@material-ui/core';
import { Divider, Avatar, Grid } from "@material-ui/core";
import Moment from "react-moment";
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';
import { ListComment } from '../../data';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button } from "@material-ui/core";
import { CommentContext } from '../../context/CommentContext';

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


const RRatingBook = () => {
    const { data, setData, nameUser, setNameUser, commentUser, setCommentUser } = useContext(CommentContext)
    const handleClick = (e) => {
        e.preventDefault();
        const newComment = {
            id: data.length + 1,
            nameUser: nameUser,
            commentUser: commentUser,

        };
        setData([...data, newComment]);
        setNameUser('');
        setCommentUser('');
    }
    const [value, setValue] = React.useState(0);
    const imgLink =
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

    return (
        
        <Paper elevation={0} style={{ marginTop: '10px', width: '1015px', height: '100%' }} >
            <Title>Đánh giá của độc giả</Title>
            <Paper elevation={0} style={{ marginTop: '10px', width: '400px', height: '100%', marginLeft: '10px' }} >
                <Box style={{border:'1px solid black',height:'215px'}}>
                <Rate> Đánh giá:
                    <Box>

                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            style={{ marginLeft: '10px', }}
                        />

                    </Box>
                </Rate>
                <Name>Tên: <input style={{ marginLeft: '50px', width: '70%' }} value={nameUser} onChange={(e) => { setNameUser(e.target.value) }}></input></Name>
                <Content>Nội dung: <input style={{ marginLeft: '15px', height: '50px', width: '70%' }} value={commentUser} onChange={(e) => { setCommentUser(e.target.value) }}></input></Content>
                <Button style={{ backgroundColor: 'green', color: 'white', marginLeft: '150px', marginTop: '10px' }} onClick={handleClick}> Gửi đánh giá</Button>
            </Box>
                <div style={{ padding: 14 }} className="App">
                    <Title>Comments</Title>
                    {data.map((item) => (
                        <Paper style={{ padding: "40px 20px", width: '1000px',height:'100%' }} >
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item>
                                    <Avatar alt="Remy Sharp" src={imgLink} />
                                </Grid>
                                <Grid justifyContent="left" item xs zeroMinWidth>
                                    <h4 style={{ margin: 0, textAlign: "left" }}>{item.nameUser}</h4>
                                    <p style={{ textAlign: "left" }}>
                                        {item.commentUser}
                                    </p>
                                    <p style={{ textAlign: "left", color: "gray" }}>
                                        <Moment fromNow>2021-11-16T20:15</Moment>
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