import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import Swal from 'sweetalert2';
const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLame] = useState("");
  const [email, setEmail] = useState("");
  const onLoginTextClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);
  function onSignUpContainerClick(){
    if(!username || !password || !cpassword || !email || !lname || !fname) {
      Swal.fire({
        title: 'Please fill all fields',
        icon: 'error',
        confirmButtonColor: '#008000',
        background: '#ffffff',
        customClass: {
          confirmButton: 'swal-confirm-btn',
          popup: 'swal-popup',
          title: 'swal-title'
        },
      });
    }
    else if (!email.includes('@') || !email.includes('.')) {
      Swal.fire({
        title: 'Invalid Email',
        text: 'Please check your email',
        icon: 'error',
        confirmButtonColor: '#4BB543',
        background: '#ffffff',
        customClass: {
          confirmButton: 'swal-confirm-btn',
          popup: 'swal-popup',
        },
      });
    }
    else if(password != cpassword)
    {
      Swal.fire({
        title: 'Please check your password',
        icon: 'error',
        confirmButtonColor: '#008000',
        background: '#ffffff',
        customClass: {
          confirmButton: 'swal-confirm-btn',
          popup: 'swal-popup',
          title: 'swal-title'
        },
      });
    }    
    else
    {
    const fetchdata = async () => {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            mutation($input: UserInput!) {
              createUser(input: $input) {
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
      if (!result.errors) {
        navigate("/login");
        console.log("yes done")
      } 
      else {
        // Display "username already in use" message
        Swal.fire({
          title: 'Username already in use',
          icon: 'info',
          confirmButtonColor: '#4BB543',
          background: '#ffffff',
          customClass: {
            confirmButton: 'swal-confirm-btn',
            popup: 'swal-popup',
          },
        });
      }
      
    };
    fetchdata();
  }
}
  return (
    <div className={styles.register}>
      <div className={styles.leftsection}>
        <div className={styles.leftbackground} />
        <img className={styles.imageIcon} alt="" src="/image1.svg" />
        <b className={styles.titletext}>
          Connect with a diverse pool of the best skilled workers in the market
        </b>
        <div className={styles.subtext}>
          Join a growing community of blue collar workers and employers,
          dedicated to quality work, grit and determination
        </div>
      </div>
      <div className={styles.signupform}>
        <input className={styles.enterEmailId}
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }} />
        {console.log(email)}
        <input className={styles.enterUsername}
          type="text"
          value={username}
          onChange={(e) => { setUsername(e.target.value) }} />
        <input className={styles.enterFirstName}
          type="text"
          value={fname}
          onChange={(e) => { setFname(e.target.value) }} />
        <input className={styles.enterLastName}
          type="text"
          value={lname}
          onChange={(e) => { setLame(e.target.value) }} />
        <input className={styles.enterPassword}
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }} />
        <input className={styles.confirmpassword}
          type="password"
          value={cpassword}
          onChange={(e) => { setCpassword(e.target.value) }} />
        <div className={styles.emailId} >Email ID</div>
        <div className={styles.username}>Username</div>
        <div className={styles.firstName}>First Name</div>
        <div className={styles.lastName}>Last Name</div>
        <b className={styles.signUp}>Sign Up</b>
        <div className={styles.password}>Password</div>
        <div className={styles.confirmPassword}>Confirm Password</div>
        <div className={styles.alreadyAUser}>Already a user?</div>
        <div className={styles.login} onClick={onLoginTextClick}>
          Login
        </div>
        <div className={styles.signup} onClick={onSignUpContainerClick}>
          <div className={styles.signupbutton} />
          <div className={styles.signUp1}>Sign Up</div>
        </div>
      </div>
    </div>
  );
};

export default Register;
