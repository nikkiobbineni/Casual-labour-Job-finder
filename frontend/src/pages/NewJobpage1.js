import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewJobpage1.module.css";

const NewJobpage1 = () => {
  const navigate = useNavigate();

  const onProfileImageClick = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  const onHomeTextClick = useCallback(() => {
    navigate("/posted-jobs");
  }, [navigate]);

  const onLogoutTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onNextButtonClick = useCallback(() => {
    navigate("/new-jobpage2");
  }, [navigate]);

  return (
    <div className={styles.newJobpage1}>
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
      <div className={styles.newjob1}>
        <div className={styles.center} />
        <div className={styles.newVacanyStart}>
          New vacany? Start your hiring right now!
        </div>
        <div className={styles.newjobform}>
          <img
            className={styles.nextbuttonIcon}
            alt=""
            src="/nextbutton.svg"
            onClick={onNextButtonClick}
          />
          <div className={styles.enterEmailId} />
          <div className={styles.enterUsername} />
          <div className={styles.enterUsername1} />
          <div className={styles.enterFirstName} />
          <div className={styles.enterLastName} />
          <div className={styles.jobTags}>Job Tags</div>
          <div className={styles.jobDescription}>Job Description</div>
          <div className={styles.jobTitle}>Job Title</div>
          <div className={styles.jobPoc}>Job POC</div>
          <b className={styles.getStartedBy}>
            Get started by filling out these basics details
          </b>
          <div className={styles.cutomTags}>
            <div className={styles.next}>Next</div>
            <div className={styles.enterPassword} />
            <div className={styles.addCustomTags}>Add Custom Tags</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewJobpage1;
