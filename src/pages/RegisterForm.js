import { Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import Typography from '@mui/material/Typography';

export const RegisterForm = () => {
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 20 }
    return (
        <Grid>
            <Grid align='center'>
                <Avatar style={avatarStyle} />
                <h2 style={headerStyle}>ĐĂNG KÝ</h2>
                <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
            </Grid>
            <form>
                <TextField fullWidth label='Name' placeholder="Enter your name" />
                <TextField fullWidth label='Email' placeholder="Enter your email" />
                <FormControl component="fieldset" style={marginTop}>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                </FormControl>
                <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" />
                <TextField fullWidth label='Password' placeholder="Enter your password"/>
                <TextField fullWidth label='Confirm Password' placeholder="Confirm your password"/>
                <FormControlLabel
                    control={<Checkbox name="checkedA" />}
                    label="I accept the terms and conditions."
                />
                <Button type='submit' variant='contained' color='primary'>ĐĂNG KÝ</Button>
            </form>
        </Grid>
    );
}