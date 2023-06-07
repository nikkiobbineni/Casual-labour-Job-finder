import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./JobDetails.module.css";
import { useParams } from "react-router-dom";
const JobDetails = () => {
  const navigate = useNavigate();
  const { jobID } = useParams();
  console.log(jobID)
  const [responses, setResponses] = useState([]);
  const [jobDetails, setJobDetails] = useState("");
  const [count, setCount] = useState("");
  const [edit, setEdit] = useState(false);
  const [phonenumber, setPhonenumber] = useState(jobDetails.phonenumber);
  const [wages, setWages] = useState(jobDetails.wages);
  const [startdate, setStartdate] = useState(jobDetails.startdate);
  const [enddate, setEnddate] = useState(jobDetails.enddate);
  const [location, setLocation] = useState(jobDetails.location);
  const [area, setArea] = useState(jobDetails.area);
  const [vacancies, setVacancies] = useState(jobDetails.vacancies);
  const [email, setEmail] = useState(jobDetails.email);
  const [poc, setPOC] = useState(jobDetails.poc);
  const username = localStorage.getItem('username');
  const [description, setDescription] = useState("");
  const onProfileImageClick = useCallback(() => {
    navigate("/profile");
  }, [navigate]);
  function handleEdit() {
    console.log("you camw to edit")
    setEdit(true);
  }
  function handleSave() {
    const fetchData = async () => {
      console.log(username)
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
          mutation($input: JobsInput) {
            updateJob(input: $input) {
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
              id: jobID,
              phonenumber: phonenumber,
              email: email,
              wages: wages,
              vacancies: vacancies,
              startdate: startdate,
              enddate: enddate,
              area: area,
              location: location,
              poc: poc,
            }
          }
        })
      });
      const result = await response.json();
      console.log(result);
      if (!result.errors) {
        console.log("You got")
        setJobDetails(result.data.updateJob);
      } else {
        console.log(result.errors);
      }
    };
    fetchData();
    setEdit(false);
  }
  const onHomeTextClick = useCallback(() => {
    navigate("/posted-jobs");
  }, [navigate]);
  function handleDelete() {
    console.log("kjwqlidu");
    const fetchData = async () => {
      // console.log(username)
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            mutation($input: JobsInput) {
              deleteJob(input: $input) {
                id       
              }
            }
            `,
          variables: {
            input: {
              id: jobID,
            }
          }
        })

      });
      const result = await response.json();
      console.log(result);

      if (!result.errors) {
        console.log("You got")
        navigate("/all-jobs");
      } else {
        console.log(result.errors);
      }
    };
    fetchData();
    // navigate("/login")
  }
  const onLogoutTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onViewAllResponsesContainerClick = useCallback(() => {
    navigate(`/job-responses/${jobID}`);
  }, [navigate]);
  useEffect(() => {
    const fetchData = async () => {
      console.log("you came")
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
              phonenumber
              name
              previoushires
              status
              jobid
              }
            }
          `,
        })
      });
      const result = await response.json();
      console.log(result);
      if (!result.errors) {
        const responses = result.data.responses;
        const jobResponses = responses.filter(response => response.jobid === jobID);
        setResponses(jobResponses);
        const responseCount = jobResponses.length;
        setCount(responseCount)
        console.log(responseCount)
      } else {
        // console.log(result.errors);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("kjwqlidu");
    const fetchData = async () => {
      console.log("you came")
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
          mutation($input: JobsInput) {
            getJobDetails(input: $input) {
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
              createdAt
            }
          }
          `,
          variables: {
            input: {
              id: jobID
            }
          }
        })

      });
      console.log(jobID)
      const result = await response.json();
      console.log(result);

      if (!result.errors) {
        setJobDetails(result.data.getJobDetails);
      } else {
        console.log(result.errors);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setPhonenumber(jobDetails.phonenumber)
    setWages(jobDetails.wages)
    setVacancies(jobDetails.vacancies)
    setStartdate(jobDetails.startdate)
    setEnddate(jobDetails.enddate)
    setArea(jobDetails.area)
    setLocation(jobDetails.location)
    setPOC(jobDetails.poc)
    setEmail(jobDetails.email)
  },[jobDetails])

  return (
    <div className={styles.jobDetails}>
      {console.log(responses)}
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
      <div className={styles.text}>{`   `}</div>
      <div className={styles.text1}>{`   `}</div>
      <div className={styles.jobDetailsChild} />
      <div className={styles.wages}>Wages</div>
      <div className={styles.jobDetailsItem} />
      <div className={styles.jobTags}>Job Tags:</div>
      <div className={styles.jobTitle}>{jobDetails.title}</div>
      <div className={styles.jobDetailsInner} />
      <div className={styles.rectangleDiv} />
      <div className={styles.jobDetailsChild1} />
      <div className={styles.jobDetailsChild2} />
      <div className={styles.jobDetailsChild3} />
      {jobDetails.tags && jobDetails.tags.length > 0 &&
        <div>
          <div className={styles.jobTag1}>#{jobDetails.tags[0]}</div>
          {jobDetails.tags.length > 1 &&
            <div className={styles.jobTag2}>#{jobDetails.tags[1]}</div>
          }
          {jobDetails.tags.length > 2 &&
            <div className={styles.jobTag3}>#{jobDetails.tags[2]}</div>
          }
        </div>
      }
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.groupItem} />
        <div className={styles.groupInner} />
        <div className={styles.groupChild1} />
        <div className={styles.groupChild2} />
        <div className={styles.groupChild3} />
        <div className={styles.groupChild4} />
        <div className={styles.groupChild5} />
        <div className={styles.groupChild6} />
        <div className={styles.groupChild7} />
        <div className={styles.groupChild8} />
        <div className={styles.groupChild9} />
        <div className={styles.startDate}>Start Date</div>
        <div className={styles.endDate}>End Date</div>
        <div className={styles.duration}>Wages</div>
        <div className={styles.emailId}>Email ID</div>
        <div className={styles.vacancies}>Vacancies</div>
        <div className={styles.phoneNo}>Phone No</div>
        <div className={styles.responsesReceived1}>Responses received</div>
        <div className={styles.location}>Location</div>
        <div className={styles.poc}>POC</div>
        <div className={styles.area}>Area</div>
        {/* <div className={styles.response}>Responses</div> */}
        {/* <div className={styles.responsesReceived1}>Responses Received</div> */}
        <div className={styles.div}>{jobDetails.startdate}</div>
        <div className={styles.div1}>{jobDetails.enddate}</div>
        <div className={styles.hours}>{jobDetails.wages}/day</div>
        <div className={styles.xyzgmailcom}>{jobDetails.email}</div>
        <div className={styles.div2}>{jobDetails.vacancies}</div>
        <div className={styles.div3}>{jobDetails.phonenumber}</div>
        <div className={styles.bakulNivasIiit}>{jobDetails.location}</div>
        <div className={styles.mrXyz}>{jobDetails.poc}</div>
        <div className={styles.gachibowli}>{jobDetails.area}</div>
        {edit &&
          <div>
            <div className={styles.div}>
              <input className={styles.groupChild1 +" "+styles.inps}
                type="text"
                value={startdate}
                onChange={(e) => { setStartdate(e.target.value) }} /></div>
            <div className={styles.div1}>
              <input className={styles.groupChild2 +" "+styles.inps}
                type="text"
                value={enddate}
                onChange={(e) => { setEnddate(e.target.value) }} />{jobDetails.enddate}</div>
            <div className={styles.hours}>{jobDetails.wages}/day
              <input className={styles.groupChild3 +" "+styles.inps}
                type="text"
                value={wages}
                onChange={(e) => { setWages(e.target.value) }} /></div>
            <div className={styles.xyzgmailcom}>
              <input className={styles.groupChild4 +" "+styles.inps}
                type="text"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }} />
            </div>
            <div className={styles.div2}>{jobDetails.vacancies}
              <input className={styles.groupChild5 +" "+styles.inps}
                type="text" style={{ marginLeft: "-60px"}}
                value={vacancies}
                onChange={(e) => { setVacancies(e.target.value) }} /></div>
            <div className={styles.div3}>{jobDetails.phonenumber}
              <input className={styles.groupChild6 +" "+styles.inps}
                type="text"
                value={phonenumber}
                onChange={(e) => { setPhonenumber(e.target.value) }} /></div>
            <div className={styles.bakulNivasIiit}>{jobDetails.location}
              <input className={styles.groupChild7 +" "+styles.inps}
                type="text" style={{ marginLeft: "-50px"}}
                value={location}
                onChange={(e) => { setLocation(e.target.value) }} /></div>
            <div className={styles.mrXyz}>{jobDetails.poc}
              <input className={styles.groupChild8 +" "+styles.inps}
                type="text" style={{ marginTop: "-50px", marginLeft:"-40px" }}
                value={poc}
                onChange={(e) => { setPOC(e.target.value) }} /></div>
            <div className={styles.gachibowli}>{jobDetails.area}
              <input className={styles.groupChild9 +" "+styles.inps}
                type="text" style={{ marginTop: "-60px", marginLeft:"-40px" }} 
                value={area}
                onChange={(e) => { setArea(e.target.value) }} /></div>
          </div>
        }
        <div style={{ display: "block" }}>Responses received</div>
        <img className={styles.ellipseIcon} alt="" src="/ellipse-5.svg" />
        <div className={styles.div4}>{count}</div>
        <div className={styles.delete} onClick={handleDelete}>Delete</div>
        {!edit && <div className={styles.edit} onClick={handleEdit}>Edit</div>}
        {edit && <div className={styles.edit} onClick={handleSave}>Save</div>}
      </div>
      <img className={styles.icon} alt="" src="/937107-1@2x.png" />
      <img className={styles.teamwork4Icon} alt="" src="/teamwork-4@2x.png" />
      <div className={styles.descriptionLongEstablished}>
        {jobDetails.description}
      </div>
      <div className={styles.allresponses}>
        <div>
          <div className={styles.responsesReceived} style={{ marginBottom: "2em", textAlign: "center" }}>Responses Received</div>
          <span className={styles.ramu9876543210TxtContainer}>
            <table style={{ width: "100%", backgroundColor: 'var(--color-mediumseagreen)', height: "50px", borderRadius: "0.5em 0.5em 0 0", color: "white", textAlign: "center" }}>
              <tr>
                <th>Name</th>
                <th>Phone</th>
              </tr>
            </table>
            {responses.map((response) => (
              <>
                <div className={styles.allresponsesChild} style={{ marginRight: "0", width: "100%", padding: "0.5em 0", textAlign: "center" }}>
                  <table style={{ width: "100%" }}>
                    <tr key={response.id}>
                      <td style={{ width: "50%" }}>{response.name}</td>
                      <td>{response.phonenumber}</td>
                    </tr>
                  </table>
                </div>
              </>
            ))}
          </span>
        </div>
      </div>
      <div
        className={styles.viewAllResponses}
        onClick={onViewAllResponsesContainerClick}
      >
        <div className={styles.viewAllResponsesChild} />
        <div className={styles.viewAllResponses1}>
          View All Responses for this Job
        </div>
      </div>
      <div className={styles.to700}>{jobDetails.wages}</div>
      <div className={styles.perDay}>per day</div>
    </div>
  );
};

export default JobDetails;