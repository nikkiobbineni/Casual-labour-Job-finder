import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PostedJobs.module.css";
import { Link } from 'react-router-dom';

const PostedJobs = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [poc, setPOC] = useState("");
  const [count, setCount] = useState(0);
  const [description, setDescription] = useState("");
  const [phonenumber, setPhonenumber] = useState("-1");
  const [wages, setWages] = useState("-1");
  const [startdate, setStartdate] = useState("-1");
  const [enddate, setEnddate] = useState("-1");
  const [location, setLocation] = useState("-1");
  const [responsesCount, setResponsesCount] = useState([]);
  const [area, setArea] = useState("-1");
  const [tags, setTags] = useState([]);
  const [vacancies, setVacancies] = useState("-1");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("-1");
  const username = localStorage.getItem('username');
  const [jobs, setJobs] = useState([]);
  const [temptag, setTemptag] = useState("");
  // const [username, setUsername] = useState("");
  const onEditProfileContainerClick = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  const onRecentResponsesTextClick = useCallback(() => {
    navigate("/recent-responses");
  }, [navigate]);
  useEffect(() => {
    const fetchData = async () => {
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
        const { fname, lname } = result.data.getProfile;
        setName(`${fname} ${lname}`);
      } else {
        // console.log(result.errors);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // console.log("kjwqlidu");
    const fetchData = async () => {
      // console.log("you came")
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
      // console.log(result);

      if (!result.errors) {
        const jobs = result.data.jobs;
        jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const recentJobs = [];
        jobs.forEach(job => {
          if (job.username === localStorage.getItem("username")) {
            recentJobs.push(job);
          }
        });
        setJobs(recentJobs.slice(0, 3));
      } else {
        // console.log(result.errors);
      }
    };
    fetchData();
  }, []);
  function addTags() {
    setTags([...tags, temptag])
    setTemptag('')
  }
  function addTags2() {
    const updatedTags = [...tags, temptag];
    setTags(updatedTags);
    setTemptag('');
    onPostContainerClick(updatedTags);
  }

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

  const onProfileImage1Click = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  const onLogoutTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);
  // setUsername("local.storage('username')")
  function onPostContainerClick(updatedTags) {
    // console.log("shxhjsd")
    // console.log(updatedTags)
    const fetchdata = async () => {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
          mutation($input: JobsInput!) {
            createJobPartOne(input: $input) {
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
              title: title,
              poc: poc,
              description: description,
              tags: updatedTags,
              username: username,
              phonenumber: phonenumber,
              email: email,
              wages: wages,
              vacancies: vacancies,
              startdate: startdate,
              enddate: enddate,
              area: area,
              location: location,
              createdAt: new Date().toISOString()

            }
          }
        })

      });
      const result = await response.json();
      // console.log(result)
      // console.log(new Date().toISOString())
      if (!result.errors) {
        const jobId = result.data.createJobPartOne.id; // Define jobId here
        // console.log(jobId); // Check the value of jobId
        navigate(`/new-jobpage2/${jobId}`); // Use jobId here
      }
      else {
        // console.log("ejxBWD")
      }
    }
    fetchdata();

  }
  const onViewAllJobsContainerClick = useCallback(() => {
    navigate("/all-jobs");
  }, [navigate]);

  return (
    <div className={styles.postedJobs}>
      {console.log(responsesCount)}
      <div className={styles.postedJobsChild} />
      <div className={styles.profile}>
        <div className={styles.profileContainer}>
          <div className={styles.profile1} />
          <div className={styles.profileDetailsContainer}>
            <img
              className={styles.profileImageIcon}
              alt=""
              src="/profile-image@2x.png"
            />
            <br />
            <div className={styles.emmaPoole}>{name}</div>
            <div
              className={styles.editprofile}
              onClick={onEditProfileContainerClick}
            >
              <div className={styles.editProfileRectangle} />
              <div className={styles.editProfile}>Edit Profile</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.lefttaskbar}>
        <div className={styles.rectangleParent}>
          <div className={styles.groupChild} />
          <div className={styles.groupItem} />
          <div className={styles.recentlyPosted}>Recently Posted</div>
          <div
            className={styles.recentResponses}
            onClick={onRecentResponsesTextClick}
          >
            Recent Responses
          </div>
        </div>
      </div>
      <div className={styles.searchbar}>
        <div className={styles.searchbarChild} />
        <img className={styles.searchbarItem} alt="" src="/ellipse-1.svg" />
        <img className={styles.search1Icon} alt="" src="/search-1@2x.png" />
      </div>
      <div className={styles.navbar}>
        <div className={styles.navbar1} />
        <img
          className={styles.profileImageIcon1}
          alt=""
          src="/profile-image1@2x.png"
          onClick={onProfileImage1Click}
        />
        <div className={styles.faqParent}>
          <div className={styles.faq}>FAQ</div>
          <div className={styles.home}>Home</div>
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
                  <div style={{ marginTop: "2.5em", paddingLeft: "2em" }}>
                    <span style={{ backgroundColor: "lightgrey", borderRadius: "5em", padding: "0.5em 1em", marginRight: "1em", color: "black" }}>#{job.tags[0]}</span>
                    <span style={{ backgroundColor: "lightgrey", borderRadius: "5em", padding: "0.5em 1em", marginRight: "1em", color: "black" }}>#{job.tags[1]}</span>
                    <span style={{ backgroundColor: "lightgrey", borderRadius: "5em", padding: "0.5em 1em", marginRight: "1em", color: "black" }}>#{job.tags[2]}</span>
                  </div>
                  <div>
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
      <div className={styles.centerpiece}>
        <div className={styles.center} />
        <div className={styles.newVacanyStart}>
          New vacany? Start your hiring right now!
        </div>
        <div className={styles.newjobform}>
          <input className={styles.enterEmailId}
            type="text"
            value={temptag}
            onChange={(e) => { setTemptag(e.target.value) }}
          />
          <input className={styles.enterUsername}
            type="text"
            value={description}
            onChange={(e) => { setDescription(e.target.value) }} />
          <input className={styles.enterUsername1} />
          <input className={styles.enterFirstName}
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value) }} />
          <input className={styles.enterLastName}
            type="text"
            value={poc}
            onChange={(e) => { setPOC(e.target.value) }} />
          <div className={styles.jobTags}>Job Tags</div>
          <div className={styles.jobDescription}>Job Description</div>
          <div className={styles.jobTitle3}>Job Title</div>
          <div className={styles.jobPoc}>Job POC</div>
          <b className={styles.getStartedBy}>
            Get started by filling out these basics details
          </b>
          <div className={styles.post} onClick={addTags2}>
            <div className={styles.postbutton} />
            <div className={styles.post1}>Next</div>
          </div>
          <div className={styles.cutomTags}>
            <div />
            <button className={styles.addCustomTags} onClick={addTags}>Add Custom Tags</button>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.dropdownTagsChild} />
        {/* <img className={styles.dropdownTagsItem} alt="" src="/polygon-1.svg" /> */}
      </div>
      <div className={styles.viewalljobs} onClick={onViewAllJobsContainerClick}>
        <div className={styles.viewalljobsChild} />
        <div className={styles.viewAllPosted}>View All Posted Jobs</div>
      </div>
    </div>
  );
};

export default PostedJobs;