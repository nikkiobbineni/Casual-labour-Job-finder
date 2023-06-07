import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecentResponses.module.css";

const RecentResponses = () => {
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
  const [jobsids, setJobsids] = useState([]);
  const [recentResponses, setRecentResponses] = useState([]);
  const [temptag, setTemptag] = useState("");
  const [titles, setTitles] = useState([]);
  const [title2, setTitle2] = useState("");
  const [title3, setTitle3] = useState("");
  const [title4, setTitle4] = useState("");

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
  const onProfileImageClick = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  const onEditProfileContainerClick = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  const onRecentlyPostedTextClick = useCallback(() => {
    navigate("/posted-jobs");
  }, [navigate]);

  // const onGroupContainer1Click = useCallback(() => {
  //   // console.log(jobsids[0])
  //   navigate(`/job-responses/${jobsids[0]}`);
  // }, [navigate]);
  function TitleSet(key) {
    console.log("entered title")
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
        mutation($input: JobsInput) {
          getJobDetails(input: $input) {
            title
          }
        }
        `,
          variables: {
            input: {
              id: key
            }
          }
        })

      });
      const result = await response.json();
      console.log(result);
      console.log(key);
      if (!result.errors) {
        setTitles(prevTitles => [...prevTitles, result.data.getJobDetails.title]);
      } else {
        console.log(result.errors);
      }
    };
    fetchData();
  }
  function onGroupContainer2Click() {
    navigate(`/job-responses/${jobsids[1]}`);
  }
  function onGroupContainer1Click() {
    navigate(`/job-responses/${jobsids[0]}`);
  }
  function onGroupContainer3Click() {
    navigate(`/job-responses/${jobsids[3]}`);
  }
  function onGroupContainer4Click() {
    navigate(`/job-responses/${jobsids[2]}`);
  }
  const onLogoutTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onPostButtonClick = useCallback(() => {
    navigate("/new-jobpage2");
  }, [navigate]);

  const onGroupContainer5Click = useCallback(() => {
    navigate("/all-responses");
  }, [navigate]);
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
              createdAt
              }
            }
          `,
        })
      });
      const result = await response.json();
      // console.log(result);
      if (!result.errors) {
        console.log(result);
        const responses = result.data.responses;
        let sortedResponses = [];
        if (responses.length === 1) {
          sortedResponses.push(responses[0]);
        } else {
          sortedResponses = responses
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .filter((response) => response.username === localStorage.getItem("username"));
        }
                console.log(sortedResponses)
        const jobIds = [];
        const recent = [];
        for (let i = 0; i < sortedResponses.length && jobIds.length < 4; i++) {
          if (!jobIds.includes(sortedResponses[i].jobid)) {
            jobIds.push(sortedResponses[i].jobid);
            recent.push(sortedResponses[i].createdAt);
          }
        }
        console.log(jobIds)
        for (let i = 0; i < jobIds.length; i++) {
          setTimeout(() => {
            TitleSet(jobIds[i]);
          }, i * 10); // wait i seconds before calling the function
        }
        setRecentResponses(recent);
        if (jobIds) {
          setJobsids(jobIds)
        }
      } else {
        console.log(result.errors);
      }

    };
    fetchData();
  }, []);
  return (
    <div className={styles.recentResponses}>
      <div className={styles.navbar} />
      <div className={styles.recentResponsesChild} />
      <img
        className={styles.profileImageIcon}
        alt=""
        src="/profile-image1@2x.png"
        onClick={onProfileImageClick}
      />
      <div className={styles.profile}>
        <div className={styles.profile1} />
        <img
          className={styles.profileImageIcon1}
          alt=""
          src="/profile-image@2x.png"
        />
        <div className={styles.emmaPoole}>{name}</div>
        <div
          className={styles.editprofile}
          onClick={onEditProfileContainerClick}
        >
          <div className={styles.editProfileRectangle} />
          <div className={styles.editProfile}>Edit Profile</div>
        </div>
      </div>
      <div className={styles.lefttaskbar}>
        <div className={styles.lefttaskbarChild} />
        <div className={styles.lefttaskbarItem} />
        <div
          className={styles.recentlyPosted}
          onClick={onRecentlyPostedTextClick}
        >
          Recently Posted
        </div>
        <div className={styles.recentResponses1}>Recent Responses</div>
      </div>
      <div className={styles.faqParent}>
        <div className={styles.faq}>FAQ</div>
        <div className={styles.home}>Home</div>
        <div className={styles.contactUs}>Contact Us</div>
        <div className={styles.jobsResponses}>{`Jobs & Responses`}</div>
      </div>
      <div className={styles.rectangleParent} onClick={onGroupContainer1Click}>
        {/* <div className={styles.groupChild} /> */}
        {console.log((titles))}
        {titles && titles[0] && recentResponses && recentResponses[0] && (
          <div className={styles.rectangleParent} onClick={onGroupContainer1Click}>
            <div className={styles.groupChild} />
            <div className={styles.jobTitle}>{titles[0]}</div>
            <div className={styles.mostRecentResponseContainer}>
              <span>Most Recent Response</span>
              <span className={styles.pm18012023}>:{recentResponses[0]}</span>
            </div>
            <div className={styles.viewAllResponses}>
              {" "}
              View All Responses for this Job
            </div>
            <img className={styles.teamwork2Icon} alt="" src="/teamwork-2@2x.png" />
          </div>
        )}
        {titles && titles[1] && recentResponses && recentResponses[1] && (
          <div className={styles.rectangleGroup} onClick={onGroupContainer2Click}>
            <div className={styles.groupChild} />
            <div className={styles.jobTitle}>{titles[1]}</div>
            <div className={styles.mostRecentResponseContainer}>
              <span>Most Recent Response</span>
              <span className={styles.pm18012023}>:{recentResponses[1]}</span>
            </div>
            <div className={styles.viewAllResponses}>
              {" "}
              View All Responses for this Job
            </div>
            <img className={styles.teamwork2Icon} alt="" src="/teamwork-2@2x.png" />
          </div>
        )}
        {titles && titles[3] && recentResponses && recentResponses[3] && (
          <div className={styles.rectangleContainer} onClick={onGroupContainer3Click}>
            <div className={styles.groupChild} />
            <div className={styles.jobTitle}>{titles[3]}</div>
            <div className={styles.mostRecentResponseContainer}>
              <span>Most Recent Response</span>
              <span className={styles.pm18012023}>: {recentResponses[3]}</span>
            </div>
            <div className={styles.viewAllResponses}>
              {" "}
              View All Responses for this Job
            </div>
            <img className={styles.teamwork2Icon} alt="" src="/teamwork-2@2x.png" />
          </div>
        )}
        {titles && titles[2] && recentResponses && recentResponses[2] && (
          <div className={styles.groupDiv} onClick={onGroupContainer4Click}>
            <div className={styles.groupChild} />
            <div className={styles.jobTitle}>{titles[2]}</div>
            <div className={styles.mostRecentResponseContainer}>
              <span>Most Recent Response</span>
              <span className={styles.pm18012023}>: {recentResponses[2]}</span>
            </div>
            <div className={styles.viewAllResponses}>
              {" "}
              View All Responses for this Job
            </div>
          </div>
        )}
      </div>
      <div className={styles.searchbar}>
        <div className={styles.searchbarChild} />
        <img className={styles.searchbarItem} alt="" src="/ellipse-1.svg" />
        <img className={styles.search1Icon} alt="" src="/search-1@2x.png" />
      </div>
      <div className={styles.searchbar}>
        <div className={styles.searchbarChild} />
        <img className={styles.searchbarItem} alt="" src="/ellipse-1.svg" />
        <img className={styles.search1Icon} alt="" src="/search-1@2x.png" />
      </div>
      <div className={styles.companyName}>Company&nbsp;Name</div>
      <div className={styles.logout} onClick={onLogoutTextClick}>
        Logout
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
          <div className={styles.jobTitle4}>Job Title</div>
          <div className={styles.jobPoc}>Job POC</div>
          <b className={styles.getStartedBy}>
            Get started by filling out these basics details
          </b>
          {/* <div className={styles.post}> */}
          <div className={styles.post} onClick={addTags2}>
            <div className={styles.postbutton} onClick={onPostButtonClick} />
            <div className={styles.post1}>Post</div>
          </div>
          <div className={styles.cutomTags}>
            <div className={styles.rectangle} />
            {/* <div className={styles.addCustomTags}>Add Custom Tags</div> */}
            <button className={styles.addCustomTags} onClick={addTags}>Add Custom Tags</button>
          </div>
        </div>
      </div>
      <div className={styles.rectangleParent1} onClick={onGroupContainer5Click}>
        <div className={styles.groupChild1} />
        <div className={styles.viewAllRecent}>View All Recent Responses</div>
      </div>
    </div>
  );
};

export default RecentResponses;
