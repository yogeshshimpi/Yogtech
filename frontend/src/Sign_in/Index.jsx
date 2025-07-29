import React, { useState, useRef, useEffect } from "react";
import { APP_NAME } from "../strings/s1";
import styles from "./style.module.css";
import Visibility from "../component/svg/visibility";
import Visibility_off from "../component/svg/visibility_off";
import Dark_theme from "../component/svg/dark_theme";
import Light_theme from "../component/svg/white_theme";
import { loginWithGitHub, loginWithGoogle } from "../auth";
import GithubIcon from "../component/svg/GithubIcon";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [usernameF, setUsernameF] = useState(false);
  const [passwordF, setPasswordF] = useState(false);
  const [pVisibility, setPVisibility] = useState(false);
  const username = useRef();
  const themebtn = useRef();
  const lightTheme = useRef(null);
  const darkTheme = useRef(null);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    if (username.current) {
      username.current.focus();
    }
  }, []);

  const handleCheckInputFill = (e) => {
    if (e.target.id === "username") {
      setUsernameF(e.target.value !== "");
    } else {
      setPasswordF(e.target.value !== "");
    }
  };

  const handlePasswordVisibility = () => {
    setPVisibility(!pVisibility);
  };

  const handleTheme = () => {
    setTheme(!theme);
    themebtn.current.disabled = true;
    const themeName = theme ? "white" : "dark";
    document.documentElement.setAttribute("data-theme", themeName);
    setTimeout(() => {
      themebtn.current.disabled = false;
    }, 400);
  };

  const handleRedirectSignup = () => {
    navigate("/sign_up");
  };

  return (
    <section className={styles.hero}>
      <button
        className={styles.webTheme}
        ref={themebtn}
        onClick={handleTheme}
      >
        <Dark_theme
          ref={darkTheme}
          className={`${styles.dark_icon} ${theme ? styles.dark_icon2 : styles.dark_icon1}`}
        />
        <Light_theme
          ref={lightTheme}
          className={`${styles.white_icon} ${theme ? styles.white_icon2 : styles.white_icon1}`}
        />
      </button>

      <section className={styles.sign_in_page}>
        <div className={styles.text_sec}>
          <div className={styles.heading}>
            Connect, Share & Grow with <span>{APP_NAME}</span>
          </div>
          <div className={styles.subheading}>
            Join a vibrant community of creators, friends, and thinkers. Share your moments,
            discover new connections, and express yourself—freely and securely.
          </div>
        </div>

        <div className={styles.log_in_sec}>
          <div className={styles.sign_in}>
            <div className={styles.app_name}>{APP_NAME}</div>
            <form className={styles.input_sec}>
              <div
                className={`${styles.input_field} ${
                  usernameFocus ? "secondary_border_color" : ""
                }`}
              >
                <label htmlFor="username">
                  <span className={usernameF ? styles.label2 : styles.label1}>
                    Phone number, username or email id
                  </span>
                  <input autuComplete = "off" 
                    type="text"
                    id="username"
                    ref={username}
                    onFocus={() => {
                      setUsernameF(true);
                      setUsernameFocus(true);
                    }}
                    onBlur={(e) => {
                      setUsernameF(false);
                      handleCheckInputFill(e);
                      setUsernameFocus(false);
                    }}
                  />
                </label>
              </div>

              <div
                className={`${styles.input_field} ${
                  passwordFocus ? "secondary_border_color" : ""
                }`}
              >
                <label htmlFor="password">
                  <span className={passwordF ? styles.label2 : styles.label1}>
                    Password
                  </span>
                  <input 
                    id="password"
                    type={pVisibility ? "text" : "password"}
                    onFocus={() => {
                      setPasswordF(true);
                      setPasswordFocus(true);
                    }}
                    onBlur={(e) => {
                      setPasswordF(false);
                      handleCheckInputFill(e);
                      setPasswordFocus(false);
                    }}
                  />
                </label>
                <button
                  type="button"
                  className={styles.passwordV}
                  onClick={handlePasswordVisibility}
                >
                  {pVisibility ? (
                    <Visibility size="20" className={styles.icon} />
                  ) : (
                    <Visibility_off size="20" className={styles.icon} />
                  )}
                </button>
              </div>

              <button type="button" className={styles.submit}>
                Log In <div className={styles.loader}></div>
              </button>
            </form>
          </div>

          <div className={styles.bar}>
            <div className={styles.hseperator}></div>
            OR
            <div className={styles.hseperator}></div>
          </div>

          <div className={styles.authLogin}>
            <button type="button" onClick={loginWithGoogle}>
              <img src={google} alt="" /> Google <div></div>
            </button>
            <button type="button" onClick={loginWithGitHub}>
        <GithubIcon className={styles.img}/>              Git Hub <div></div>
            </button>
          </div>

          <div className={styles.forgetPassword}>Forget password?</div>
          <div className={styles.error}></div>
          <div className={styles.dontHaveAccount}>
            Don't have an account?{" "}
            <button onClick={handleRedirectSignup}>Sign up</button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Index;
