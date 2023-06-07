import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const onLoginContainerClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onSignUpContainerClick = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  const onGetStartedContainerClick = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <div className={styles.landingPage}>
      <div className={styles.login} onClick={onLoginContainerClick}>
        <div className={styles.loginChild} />
        <div className={styles.login1}>Login</div>
      </div>
      <div className={styles.signup} onClick={onSignUpContainerClick}>
        <div className={styles.signupChild} />
        <div className={styles.signUp}>Sign Up</div>
      </div>
      <div className={styles.getStarted} onClick={onGetStartedContainerClick}>
        <div className={styles.getStartedChild} />
        <div className={styles.idLikeTo}>I’d like to get started</div>
      </div>
      <div className={styles.landingPageChild} />
      <div className={styles.weFindWeContainer}>
        <p className={styles.weFind}>We Find</p>
        <p className={styles.weFind}>We Connect</p>
      </div>
      <div className={styles.companyName}>Company&nbsp;Name</div>
      <div className={styles.weTakeTheContainer}>
        <p className={styles.weFind}>
          We take the hassle out of finding the perfect worker for your needs
        </p>
      </div>
      <img className={styles.icon} alt="" src="/3789958-1@2x.png" />
      <img className={styles.icon1} alt="" src="/3789958-2@2x.png" />
      <div className={styles.howWeWork}>How we Work?</div>
      <div className={styles.lookingToFillContainer}>
        <p className={styles.weFind}>
          Looking to fill a job vacancy? Let us help you find the perfect
          candidate!
        </p>
        <p className={styles.weFind}>&nbsp;</p>
        <p className={styles.weFind}>&nbsp;</p>
        <p
          className={styles.weFind}
        >{`With our streamlined process, you can easily post your job vacancy and receive a list of qualified responses in no time. `}</p>
        <p className={styles.weFind}>&nbsp;</p>
        <p className={styles.weFind}>&nbsp;</p>
        <p className={styles.weFind}>
          From there, you have the freedom to choose the best fit for your
          company and hire with confidence.
        </p>
        <p className={styles.weFind}>&nbsp;</p>
        <p className={styles.weFind}>&nbsp;</p>
        <p
          className={styles.weFind}
        >{`Say goodbye to the stress and hassle of traditional hiring methods and let us help you find your next superstar employee. `}</p>
        <p className={styles.weFind}>&nbsp;</p>
        <p className={styles.weFind}>&nbsp;</p>
        <p className={styles.weFind}>
          Get started today and take the first step towards building a strong,
          successful team!
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
