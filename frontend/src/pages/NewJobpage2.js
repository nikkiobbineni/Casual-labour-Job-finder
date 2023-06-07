import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewJobpage2.module.css";
import { useParams } from "react-router-dom";
const NewJobpage2 = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [phonenumber, setPhonenumber] = useState("");
  const [wages, setWages] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [vacancies, setVacancies] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [poc, setPOC] = useState("");
  const [tags, setTags] = useState("");
  const username = localStorage.getItem('username');
  const [description, setDescription] = useState("");
  const onProfileImageClick = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  const onHomeTextClick = useCallback(() => {
    navigate("/posted-jobs");
  }, [navigate]);

  const onLogoutTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  function onPostButtonClick() {
   console.log("wjqs")
    const fetchdata = async () => {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            mutation($input: JobsInput!) {
              createJobPartTwo(input: $input) {
                id
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
              }
            }
          `,
          variables: {
            input: {
              id: jobId,
              phonenumber: phonenumber,
              email: email,
              wages: wages,
              vacancies: vacancies,
              startdate: startdate,
              enddate: enddate,
              area: area,
              location: location,
              title: title,
              poc: poc,
              description: description,
              tags: tags,
              username: username,
            }
          }
        })
      });
      const result = await response.json();
      console.log(result)
      if (!result.errors) {
        navigate(`/job-details/${jobId}`);
        console.log("yes done")
      } 
      else
      {
        console.log("hbsh")
      }
    };
    fetchdata();
  }

  return (
    <div className={styles.newJobpage2}>
      <div className={styles.navbar}>
        <div className={styles.navbar1} />
        <img
          className={styles.profileImageIcon}
          alt=""
          src="/profile-image1@2x.png"
          onClick={onProfileImageClick}
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
      <div className={styles.newjob2}>
        <div className={styles.center} />
        <div className={styles.newjobform}>
          <input className={styles.entervacancies}
            type="number"
            value={vacancies}
            onChange={(e) => { setVacancies(e.target.value) }} />
          <input className={styles.enterstartdate}
            type="text"
            value={startdate}
            onChange={(e) => { setStartdate(e.target.value) }} />
          <input className={styles.enterenddate}
            type="text"
            value={enddate}
            onChange={(e) => { setEnddate(e.target.value) }} />
          <input className={styles.enterarea}
            type="text"
            value={area}
            onChange={(e) => { setArea(e.target.value) }} />
          <input className={styles.enterlocation}
            type="text"
            value={location}
            onChange={(e) => { setLocation(e.target.value) }} />
          <input className={styles.enterphone}
            type="text"
            value={phonenumber}
            onChange={(e) => { setPhonenumber(e.target.value) }} />
          <input className={styles.enteremail}
            type="text"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }} />
          {/* <img
            className={styles.enterwagestypeIcon}
            alt=""
            src="/enterwagestype.svg"
          /> */}
          <input className={styles.enterwages}
            type="text"
            value={wages}
            onChange={(e) => { setWages(e.target.value) }} />
          <div className={styles.phoneNoPoc}>Phone No (POC)</div>
          <div className={styles.emailIdPoc}>Email ID (POC)</div>
          {/* <div className={styles.dropdownWages}>
            <div className={styles.dropdownWagesChild} /> */}
            {/* <img
              className={styles.dropdownWagesItem}
              alt=""
              src="/polygon-1.svg"
            /> */}
          {/* </div> */}
          <div className={styles.wages}>Wages</div>
          <div className={styles.startDate}>Start Date</div>
          <div className={styles.area}>Area</div>
          <div className={styles.vacancies}>Vacancies</div>
          <div className={styles.location}>Location</div>
          <div className={styles.endDate}>End Date</div>
          <div className={styles.post}>
            <div className={styles.postbutton} onClick={onPostButtonClick} />
            <div className={styles.post1}>Post</div>
          </div>
        </div>
        <b className={styles.justAFew}>
          Just a few more details before you begin hiring
        </b>
        <div className={styles.youreAlmostThere}>You’re almost there!</div>
      </div>
    </div>
  );
};

export default NewJobpage2;
