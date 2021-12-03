import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

//styles
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from './Icon'; // dùng thẻ svg
import useStyles from './styles';

//component
import Input from './Input.js'; // tạo duy nhất một component để tái sử dụng nhiều lần

//action
import { signin, signup } from '../../actions/auth';

// action types
import * as actionType from '../../constants/actionTypes'; 

// initial data 
const initialState = {
  firstName : '',
  lastName : '',
  email : '',
  password : '',
  confirmPassword: ''
};

const Auth = () => {
  const [ formData, setFormData ] = useState(initialState);
  const [ showPassword, setShowPassword ] = useState(false);
  const [ isSignup, setIsSignup ] = useState(false); //set trang thai dau tien la form Sign In, da co tai khoan roi
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // hien mat khau trong khi dang nhap
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  // gửi dữ liệu đăng nhập về database
  const handleSubmit = (e) => {
    e.preventDefault(); // ngan chan page reload moi khi nhan nuts submit
    console.log(formData);
    if(isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  }

  // theo doi trang thai cua du lieu nhap tu form
  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); // thuoc tinh name cua formdata giong voi thuoc tinh name tren the Input
  }

  // chuyen doi trang thai giua Sign In va Sign Up
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  }

  // xu ly su kien khi dang nhap voi google thanh cong
  const googleSuccess = async (res) => {
    const result = res?.profileObj; // ?. will not throw error: can not read property of undifined
    const token = res?.tokenId;
    console.log({ 'googleOauthResponse' : {result, token } });

    try {
      dispatch({ type: actionType.AUTH, data: { result, token } }); 

      history.push('/'); // tro ve route Home
    } catch(error) {
      console.log(error);
    }
  }

  // xy ly su kien sau khi dang nhap voi google thanh cong
  const googleError = (err) => {
    console.log(err);
    console.log("Google sign in was unsuccessfully");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}> {/*the submit button trigger handleSubmit*/}
          <Grid container spacing={2}>
            { isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            {/*this below use for register*/}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId="1045054464931-dckjbq7ng1ntir5u30s5jsmlmooi8ifm.apps.googleusercontent.com" // lay trong OAuth Consent Screen cua dich vu google cloud Api
            render={(renderProps) => (
              <Button 
                className={classes.googleButton} 
                color="primary" 
                fullWidth 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled} 
                startIcon={<Icon />} 
                variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button style={{textTransform: 'none'}} onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
