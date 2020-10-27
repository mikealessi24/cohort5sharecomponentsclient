import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as ReachRouterLink } from "@reach/router";
import { Auth } from "aws-amplify";
import { navigate } from "@reach/router";
import { useDispatch } from "react-redux";
import SignInPic from "../assets/Screen Shot 2020-10-27 at 9.39.02 AM.png";

import SnackBarAlert from "../components/SnackBarAlert";
import { Snackbar } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    display: "flex",
    alignItems: "center",
    backgroundImage: `url(${SignInPic})`,
    backgroundRepeat: "no-repeat",
    // backgroundColor:
    //   theme.palette.type === "light"
    //     ? theme.palette.grey[50]
    //     : theme.palette.grey[900],
    backgroundColor: "black",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide({ setSignedIn }) {
  const [status, setStatus] = React.useState(undefined);
  const classes = useStyles();
  // const dispatch = useDispatch();
  // const [backgroundImage, setBackgroundImage] = React.useState(undefined)
  //   React.useEffect(() => {
  //     function importAll(r) {
  //       let images = {};
  //       r.keys().map((item, index) => {
  //         images[item.replace("./", "")] = r(item);
  //       });
  //       return images;
  //     }
  //     const images = importAll(
  //       require.context("../assets", false, /\.(png|jpe?g|svg)$/)
  //     );
  //     console.log(images)
  //   setBackgroundImage(images["Screen Shot 2020-10-27 at 9.39.02 AM.png"])},[]);

  // console.log("this is the background image", backgroundImage)
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <img src={SignInPic} width="100%"></img>{" "}
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              const username = e.target.elements.username.value;
              const password = e.target.elements.password.value;
              (async function () {
                try {
                  const user = await Auth.signIn(username, password);
                  console.log(user);
                  console.log(user.signInUserSession.idToken.jwtToken);
                  //   dispatch(setSignedIn(user));

                  setSignedIn(user);
                  navigate("/home");
                } catch (error) {
                  console.log(error);
                  setStatus({ message: "error sigining in", type: "error" });
                }
              })();
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            /> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {status ? (
              <SnackBarAlert status={status} setStatus={setStatus} />
            ) : null}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <ReachRouterLink to="/signup">
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </ReachRouterLink>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
