import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllJobs.module.css";
import { Link } from 'react-router-dom';

const AllJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [responsesCount, setResponsesCount] = useState([]);
  const onProfileImageClick = useCallback(() => {
    navigate("/profile");
  }, [navigate]);
  useEffect(() => {
    async function getResponsesCount() {
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
        const count = responses.length;
        setResponsesCount([])
        jobs.forEach(job => {
          let indcount = 0
          responses.forEach(response => {
            if (response.jobid === job.id) {
              indcount += 1
            }
          })
          setResponsesCount(responsesCount => [...responsesCount, { key: job.id, count: indcount }]);
        })
        // setResponsesCount(responsesCount => [...responsesCount, { jobid: key, count }]);
        console.log(responsesCount)
      } else {
        console.log(result.errors);
      }
    };

    // jobs.forEach(job => {
    //   getResponsesCount(job.id);
    // });
    getResponsesCount()
  }, [jobs]);
  const onHomeTextClick = useCallback(() => {
    navigate("/posted-jobs");
  }, [navigate]);

  const onLogoutTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onJobContainerClick = useCallback(() => {
    navigate("/job-details");
  }, [navigate]);

  const onJob2ContainerClick = useCallback(() => {
    navigate("/job-details");
  }, [navigate]);

  const onJob3ContainerClick = useCallback(() => {
    navigate("/job-details");
  }, [navigate]);

  const onJob4ContainerClick = useCallback(() => {
    navigate("/job-details");
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
          query($location: String!, $tag: String!) {
            jobsByLocationAndTag(location: $location, tag: $tag) {
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
          variables: {
            location: "Hyderabad",
            tag: "painting"
          }
        })
      });
      const result = await response.json();
      console.log(result);
    };
    fetchData()
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
        jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const recentJobs = [];
        jobs.forEach(job => {
          if (job.username === localStorage.getItem("username")) {
            recentJobs.push(job);
          }
        });
        console.log(recentJobs)
        setJobs(recentJobs);
      } else {
        console.log(result.errors);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={styles.allJobs}>
      <div className={styles.navbar}>
        {console.log(jobs)}
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
      <div className={styles.cardWrapper}>
        <div className={styles.cardContainer} style={{ marginBottom: "2em" }}>
          {jobs.map((job) => (
            <Link to={`/job-details/${job.id}`} key={job.id}>
              <div className={styles.card} key={job.id}>
                {console.log("jwshnh")}
                <div className={styles.cardHeader}>
                  <table style={{ width: "100%" }}>
                    <tr>
                      <td style={{ width: "22%" }}>
                        <img
                          className={styles.teamwork1Icon}
                          alt=""
                          src="/teamwork-1@2x.png"
                        />
                      </td>
                      <td style={{}}>
                        <div className={styles.jobTitle} style={{ marginLeft: "0", color: "black" }}>{job.title}</div>
                        <div style={{ color: "black", textDecoration: "none" }}>
                          Description: {job.description}
                        </div>
                      </td>
                    </tr>
                  </table>
                  <img
                    style={{
                      position: "absolute",
                      top: "0.5em",
                      right: "0.5em",
                      width: "1.5em",
                      height: "auto"
                    }}
                    alt=""
                    src="/edit-1@2x.png"
                  />
                  <div style={{ marginTop: "2em", paddingLeft: "2em" }}>
                    <span style={{ backgroundColor: "lightgrey", borderRadius: "5em", padding: "0.5em 1em", marginRight: "1em", color: "black" }}>#{job.tags[0]}</span>
                    <span style={{ backgroundColor: "lightgrey", borderRadius: "5em", padding: "0.5em 1em", marginRight: "1em", color: "black" }}>#{job.tags[1]}</span>
                    <span style={{ backgroundColor: "lightgrey", borderRadius: "5em", padding: "0.5em 1em", marginRight: "1em", color: "black" }}>#{job.tags[2]}</span>
                  </div>
                </div>
                <div className={styles.jobDetailsFlex}>
                  <span>Responses: {responsesCount.find(responses => responses.key === job.id)?.count || 0}</span>
                  <div >                  {`Wages `}
                    <span>: {job.wages}</span>
                  </div>
                  <div >
                    {`Vacancies `}
                    <span>: {job.vacancies}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* <div className={styles.allJobsChild} /> */}
      {/* <img className={styles.allJobsItem} alt="" src="/rectangle-30.svg" /> */}
      <div className={styles.text}>{`   `}</div>
      <div className={styles.text1}>{`   `}</div>
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
        <div className={styles.groupItem} />
        <div className={styles.category}>
          <span className={styles.pendingTxt}>
            <span className={styles.span}>{`  `}</span>
            <span className={styles.pending1}>Category</span>
          </span>
        </div>
        <div className={styles.sort}>
          <span className={styles.pendingTxt}>
            <span>{`  `}</span>
            <span className={styles.sort1}>{`Sort : `}</span>
          </span>
        </div>
        <div className={styles.date}> Date</div>
        <div className={styles.responses}> Responses</div>
        <div className={styles.vacancies}> Vacancies</div>
        <div className={styles.apply}> Apply</div>
        <div className={styles.groupInner} />
        <div className={styles.groupChild1} />
        <div className={styles.groupChild2} />
        <div className={styles.groupChild3} />
        <div className={styles.groupChild4} />
        <div className={styles.groupChild5} />
      </div>
      <div className={styles.youHavePostedContainer}>
        <span className={styles.pendingTxt}>
          <p className={styles.youHavePosted}>
            You have posted the following jobs:
          </p>
          <p className={styles.clickOnA}>
            Click on a job to know more and edit
          </p>
        </span>
      </div>
    </div>
  );
};

export default AllJobs;
