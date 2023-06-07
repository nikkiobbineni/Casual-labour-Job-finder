import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [hires, setHires] = useState("");
  const [responses, setResponses] = useState("");
  const [postedjobs, setPostedjobs] = useState("");
  // const [username1, setUsername1] = useState(profile.username);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [password, setPassword] = useState(profile.password);
  const [fname, setFname] = useState("");
  const [id,setId] = useState("");
  const [lname, setLname] = useState(profile.lname);
  const [email, setEmail] = useState(profile.email);
  // const username = localStorage.getItem('username');
  const [edit, setEdit] = useState(false);
  const onHomeTextClick = useCallback(() => {
    navigate("/posted-jobs");
  }, [navigate]);

  const onLogoutTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);
  useEffect(() => {
    console.log("kjwqlidu");
    const fetchData = async () => {
      console.log(username)
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
          mutation($input: UserInput) {
            getProfile(input: $input) {
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
              username: username,
            }
          }
        })

      });
      const result = await response.json();
      console.log(result);
      if (!result.errors) {
        console.log("You got")
        setProfile(result.data.getProfile);
        setId(result.data.getProfile.id);
        setFname(result.data.getProfile.fname);
      } else {
        console.log(result.errors);
      }
    };
    fetchData();
  }, []);
  function handleEditClick() {
    console.log("you camw to edit")
    setEdit(true);
  }
  function handleSave() {
    console.log(profile.id)
    const fetchData = async () => {
      console.log(username)
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
          mutation($input: UserInput) {
            updateProfile(input: $input) {
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
              id : id,
              username: username,
              fname : fname,
              lname : lname,
              email : email,
              password : password

            }
          }
        })
      });
      const result = await response.json();
      console.log(result);
      if (!result.errors) {
        console.log("You got")
        setProfile(result.data.updateProfile);
        setUsername(result.data.updateProfile.username);
        localStorage.setItem('username', result.data.updateProfile.username );
        console.log(username)
      } else {
        console.log(result.errors);
      }
    };
    fetchData();
    setEdit(false);
  }
  function handleDeleteClick() {
    console.log("kjwqlidu");
    const fetchData = async () => {
      console.log(username)
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
          mutation($input: UserInput) {
            deleteUser(input: $input) {
              id       
            }
          }
          `,
          variables: {
            input: {
              username: username,
            }
          }
        })

      });
      const result = await response.json();
      console.log(result);

      if (!result.errors) {
        console.log("You got")
        onLogoutTextClick()
      } else {
        console.log(result.errors);
      }
    };
    fetchData();
    // navigate("/login")
  }
  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log("username", username);
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            query {
              jobs {
                title
                poc
                description
                phonenumber
                email
                wages
                vacancies
                startdate
                enddate
                area
                location
                tags
                username
                id
                createdAt
              }
            }
          `,
        })
      });
      const result = await response.json();
      console.log(result);

      if (!result.errors) {
        const jobs = result.data.jobs;
        const filteredJobs = jobs.filter((job) => job.username === username);
        const count = filteredJobs.length;
        setPostedjobs(count)
        console.log(count);
      } else {
        console.log(result.errors);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log("username", username);
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            query {
              responses {
                id
                date
                name
                previoushires
                status
                phonenumber
                jobid 
                username
              }
            }
          `,
        })
      });
      const result = await response.json();
      console.log(result);

      if (!result.errors) {
        const responses = result.data.responses;
        const filteredResponses = responses.filter((response) => response.username === username);
        const count = filteredResponses.length;
        setResponses(count)
        const count_hired = filteredResponses.filter((response) => response.status === "hired");
        setHires(count_hired.length)
        console.log(count, count_hired.length);
      } else {
        console.log(result.errors);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.navbar}>
        <div className={styles.navbar1} />
        <img
          className={styles.profileImageIcon}
          alt=""
          src="/profile-image1@2x.png"
        />
        <div className={styles.faqParent}>
          <div className={styles.faq}>FAQ</div>
          <div className={styles.home} onClick={onHomeTextClick}>
            Home
          </div>
          <div className={styles.contactUs}>Contact Us</div>
          <div className={styles.jobsResponses}>{`Jobs & Responses`}</div>
        </div>
        <div className={styles.companyName}>Company&nbsp;Name</div>
        <div className={styles.logout} onClick={onLogoutTextClick}>
          Logout
        </div>
      </div>
      <div className={styles.profile1}>
        <div className={styles.profileChild} />
        <img className={styles.profileItem} alt="" src="/ellipse-2.svg" />
        <img className={styles.profileInner} alt="" src="/ellipse-2.svg" />
        <img className={styles.ellipseIcon} alt="" src="/ellipse-2.svg" />
        <div className={styles.div}>{postedjobs}</div>
        <div className={styles.div1}>{responses}</div>
        <div className={styles.div2}>{hires}</div>
        <img className={styles.icon} alt="" src="/160352-1@2x.png" />
        <img
          className={styles.profileImageIcon1}
          alt=""
          src="/profile-image2@2x.png"
        />
        <b className={styles.emmaPoole}>{profile.fname + "   " + profile.lname}</b>
        <div className={styles.emmapoole}>@{profile.username}</div>
        <div className={styles.totalJobsPosted}>Total Jobs Posted</div>
        <div className={styles.responsesReceived}>Responses Received</div>
        <div className={styles.totalPeopleHired}>Total People Hired</div>
      </div>
      <div className={styles.editprofile}>
        <div className={styles.editprofileChild} />
        <div className={styles.username} />
        <div className={styles.firstname} />
        <div className={styles.lastname} />
        <div className={styles.emailid} />
        <div className={styles.password} />
        <b className={styles.username1}>Username</b>
        <b className={styles.name}>Name</b>
        <div className={styles.emmapoole1}>@{profile.username}</div>
        <div className={styles.emma}>{profile.fname}</div>
        <div className={styles.poole}>{profile.lname}</div>
        <div className={styles.emmapoolegmailcom}>{profile.email}</div>
        <div className={styles.div3}>*********</div>
        {edit &&
          <div>
            <div>
              <input className={styles.inputUser +" " + styles.emmapoole1} 
                type="text"
                value={username}
                onChange={(e) => {setUsername(e.target.value)}} /></div>
            <div>
              <input className={styles.inputUser2 +" " +styles.emma}
                type="text"
                value={fname}
                onChange={(e) => { setFname(e.target.value) }} /></div>
            <div>
              <input className={styles.inputUser2 +" " +styles.poole}
                type="text"
                value={lname}
                onChange={(e) => { setLname(e.target.value) }} />
            </div>
            <div>
              <input className={styles.inputUser +" " +styles.emmapoolegmailcom}
                type="text"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }} /> </div>
            <div>
              <input className={styles.inputUser +" " +styles.div3}
                type="text"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }} /></div>
          </div>}
        <b className={styles.emailId}>Email ID</b>
        <b className={styles.password1}>Password</b>
        <button> <div className={styles.edit}>
          <div className={styles.editChild} />
          <div className={styles.edit1} onClick={handleEditClick}>Edit</div>
        </div></button>
        {edit &&
          <button> <div className={styles.edit}>
            <div className={styles.editChild} />
            <div className={styles.edit1} onClick={handleSave}>Save</div>
          </div></button>
        }
        <button>
          <div className={styles.delete}>
            <div className={styles.deleteChild} />
            <div className={styles.delete1} onClick={handleDeleteClick}>Delete</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Profile;
