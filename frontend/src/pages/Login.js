import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLame] = useState("");
  const [email, setEmail] = useState("");
  const onSignUpTextClick = useCallback(() => {
    navigate("/register");
  }, [navigate]);
  function onLoginClick() {
    const fetchdata = async () => {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            mutation($input: UserInput!) {
              checkCredentials(input: $input) {
                id
                fname
                lname
                username
                email
                password
              }
            }
          `,
          variables: {
            input: {
              fname: fname,
              lname: lname,
              username: username,
              email: email,
              password: password
            }
          }
        })
      });
      const result = await response.json();
      console.log(result)
      if (result.errors) {
        console.log("jskc")
        Swal.fire({
          title: 'Invalid Credentials',
          text: 'Please check your username or password',
          icon: 'error',
          confirmButtonColor: '#4BB543',
          background: '#ffffff',
          customClass: {
            confirmButton: 'swal-confirm-btn',
            popup: 'swal-popup',
          },
        });
      }
      else if (result.data.checkCredentials.id) {
        localStorage.setItem('username', username);
        navigate("/posted-jobs");
      }
    }
    fetchdata();
  }
  return (
    <div className={styles.login}>
      <div className={styles.leftsectionWrapper}>
        <div className={styles.leftsection}>
          <img className={styles.imageIcon} alt="" src="/image.svg" />
          <div className={styles.subtext}>
            Find the perfect fit for your blue collar business
          </div>
          <b className={styles.titletext}>
            Blue Collar Workers, just a few clicks away
          </b>
        </div>
      </div>
      <div className={styles.loginform}>
        <input className={styles.enterEmailUsername}
          type="text"
          value={username}
          onChange={(e) => { setUsername(e.target.value) }} />
        <input className={styles.enterpassword}
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }} />
        <div className={styles.emailId}>Username</div>
        <b className={styles.login1}>Login</b>
        <div className={styles.password}>Password</div>
        <div className={styles.dontHaveAn}>Don’t have an account?</div>
        <div className={styles.signUp} onClick={onSignUpTextClick}>
          Sign Up
        </div>
        <button className={styles.login2} onClick={onLoginClick}>
          <div className={styles.login3}>Login</div>
        </button>
      </div>
    </div>
  );
};

export default Login;
