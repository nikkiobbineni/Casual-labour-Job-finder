import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./JobResponses.module.css";
import { useParams } from "react-router-dom";

const JobResponses = () => {
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState("");
  const [responses, setResponses] = useState([]);
  const onProfileImageClick = useCallback(() => {
    navigate("/profile");
  }, [navigate]);
  const { jobID } = useParams();
  console.log(jobID)
  const onHomeTextClick = useCallback(() => {
    navigate("/posted-jobs");
  }, [navigate]);

  const onLogoutTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onGroupContainer3Click = useCallback(() => {
    navigate(`/job-details/${jobID}`);
  }, [navigate]);

  const onAllJobsContainerClick = useCallback(() => {
    navigate("/all-jobs");
  }, [navigate]);
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
        // console.log("You got")
        setJobDetails(result.data.getJobDetails);
      } else {
        console.log(result.errors);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    // console.log("kjwqlidu");
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
        const recentResponses = [];
        responses.forEach(job => {
          if (job.jobid === jobID) {
            recentResponses.push(job);
          }
        });
        setResponses(recentResponses);
        console.log(responses)
      } else {
        // console.log(result.errors);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.jobResponses}>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.pending}>
          <span className={styles.pendingTxt}>
            <span className={styles.span}>{`  `}</span>
            <span className={styles.pending1}>Pending</span>
          </span>
        </div>
        <div className={styles.filterSort}>{`Filter & Sort`}</div>
        <div className={styles.filter}> Filter :</div>
        <div className={styles.completed}>
          <span className={styles.pendingTxt}>
            <span>{`  `}</span>
            <span className={styles.completed1}>Completed</span>
          </span>
        </div>
        <div className={styles.status}>
          <span className={styles.pendingTxt}>
            <span className={styles.span}>{`  `}</span>
            <span className={styles.pending1}>Status</span>
          </span>
        </div>
        <div className={styles.sort}>
          <span className={styles.pendingTxt}>
            <span>{`  `}</span>
            <span className={styles.sort1}>{`Sort : `}</span>
          </span>
        </div>
        <div className={styles.dateTime}>{`Date & Time`}</div>
        <div className={styles.previousHire}>Previous Hire</div>
        <div className={styles.vacancies}> Vacancies</div>
        <div className={styles.rectangleGroup}>
          <div className={styles.groupItem} />
          <div className={styles.apply}> Apply</div>
        </div>
        <div className={styles.groupInner} />
        <div className={styles.rectangleDiv} />
        <div className={styles.groupChild1} />
      </div>
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
      <div className={styles.jobResponsesChild} />
      <b className={styles.allResponses}>All Responses</b>
      <div className={styles.youHaveReceived}>
        You have received a total of {responses.length} responses for this job
      </div>
      {/* <div style={{display: "absolute"}}>
        <table style={{ width: "100%", backgroundColor: 'var(--color-mediumseagreen)', height: "50px", borderRadius: "0.5em 0.5em 0 0", color: "white", textAlign: "center"}}>
          <tr>
            <th>Name</th>
            <th>Phone</th>
          </tr>
        </table>
        {responses.map((response) => (
          <>
            <div className={styles.allresponsesChild} style={{marginRight: "0", width: "100%", padding: "0.5em 0", textAlign: "center"}}>
              <table style={{ width: "100%", display: "relative" }}>
                <tr key={response._id}>
                  <td style={{width: "50%"}}>{response.name}</td>
                  <td>{response.phonenumber}</td>
                </tr>
              </table>
            </div>
          </>
        ))} */}
      {/* </div> */}
      <div
        className={styles.rectangleContainer}
        onClick={onGroupContainer3Click}
      >
        <div className={styles.groupChild5} />
        <img className={styles.teamwork3Icon} alt="" src="/teamwork-3@2x.png" />
        <div className={styles.jobTitle}>{jobDetails.title}</div>
        <div className={styles.jobTags}>Job Tags</div>
        <div className={styles.descriptionLongEstablished}>
          Description :{jobDetails.description}
        </div>
        <div className={styles.groupChild6} />
        <div className={styles.groupChild7} />
        <div className={styles.groupChild8} />
        <div className={styles.groupChild9} />
        {jobDetails.tags && jobDetails.tags.length > 0 &&
        <div>
          <div className={styles.jobTag1}>#{jobDetails.tags[0]}</div>
          {jobDetails.tags.length > 1 &&
            <div className={styles.jobTag2}>#{jobDetails.tags[1]}</div>
          }
          {jobDetails.tags.length > 2 &&
            <div className={styles.jobTag3}>#{jobDetails.tags[2]}</div>
          }
           {jobDetails.tags.length > 3 &&
            <div className={styles.jobTag4}>#{jobDetails.tags[3]}</div>
          }
        </div>
      }
      </div>
      <div className={styles.alljobs} onClick={onAllJobsContainerClick}>
        <div className={styles.alljobsChild} />
        <div className={styles.allJobs}>All Jobs</div>
      </div>
      <div className={styles.jobResponsesItem} />
      <div className={styles.jobResponsesInner} />
      <div className={styles.jobResponsesChild1} />
      <div className={styles.jobResponsesChild2} />
      <div className={styles.jobResponsesChild3} />
      <div className={styles.jobResponsesChild4} />
      <div className={styles.jobResponsesChild5} />
      <div className={styles.jobResponsesChild6} />
      <div className={styles.name}>Name</div>
      <div className={styles.date}>Date</div>
      <div className={styles.phoneNo}>Phone No</div>
      <div className={styles.status2}>Status</div>
      <div className={styles.previousHires}>Previous Hires</div>

      {responses.map((response) => (
        <>
          <div className={styles.ramu}  styles={{position: "relative", display: "block"}}>{response.name}</div>
          {/* <br></br> */}
          <div className={styles.pm18022023} styles={{position: "relative", display: "block"}}>{response.date}</div>
          {/* <br></br> */}
          <div className={styles.div} styles={{position: "relative", display: "block"}}>{response.phonenumber}</div>
          {/* <br></br> */}
          <div className={styles.completed2} styles={{position: "relative", display: "block"}}>{response.status}</div>
          {/* <br></br> */}
          <div className={styles.div7} styles={{position: "relative", display: "block"}}>{response.previoushires}</div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

        </>
      ))}

      
      {/* <div className={styles.ramu1}>Ramu</div>
      <div className={styles.ramu2}>Ramu</div>
      <div className={styles.ramu3}>Ramu</div> */}
      {/* <div className={styles.shambhu}>Shambhu</div>
      <div className={styles.shambhu1}>Shambhu</div>
      <div className={styles.shambhu2}>Shambhu</div> */}
      {/* <div className={styles.pm180220231}>6:05 PM 18/02/2023</div>
      <div className={styles.pm180220232}>6:05 PM 18/02/2023</div>
      <div className={styles.pm180220233}>6:05 PM 18/02/2023</div>
      <div className={styles.pm180220234}>6:05 PM 18/02/2023</div>
      <div className={styles.pm180220235}>6:05 PM 18/02/2023</div>
      <div className={styles.pm180220236}>6:05 PM 18/02/2023</div> */}
      {/* <div className={styles.div1}>1234567891</div>
      <div className={styles.div2}>1234567891</div>
      <div className={styles.div3}>1234567891</div>
      <div className={styles.div4}>1234567891</div>
      <div className={styles.div5}>1234567891</div>
      <div className={styles.div6}>1234567891</div> */}
      {/* <div className={styles.completed3}>Completed</div>
      <div className={styles.pending2}>Pending</div>
      <div className={styles.pending3}>Pending</div>
      <div className={styles.pending4}>Pending</div>
      <div className={styles.completed4}>Completed</div>
      <div className={styles.completed5}>Completed</div> */}
      {/* <div className={styles.div8}>4</div>
      <div className={styles.div9}>4</div>
      <div className={styles.div10}>4</div>
      <div className={styles.div11}>4</div>
      <div className={styles.div12}>4</div>
      <div className={styles.div13}>4</div> */}
    </div>
  );
};

export default JobResponses;



