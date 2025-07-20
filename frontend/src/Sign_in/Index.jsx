import React, { useState, useRef, useEffect } from "react";
import { APP_NAME } from "../strings/s1";
import "./style.css";
import Visibility from "../component/svg/visibility";
import Visibility_off from "../component/svg/visibility_off";
import Dark_theme from "../component/svg/dark_theme";
import Light_theme from "../component/svg/white_theme";
import { loginWithFacebook ,loginWithGitHub, loginWithGoogle } from "../auth";
import facebook from "../assets/facebook.png"
import github from "../assets/github.png"
import google from "../assets/google.png"

const Index = () => {
  const [usernameF, setUsernameF] = useState(false);
  const [passwordF, setPasswordF] = useState(false);
  const [pVisibility, setPVisibility] = useState(false);
  const username = useRef();
  const themebtn = useRef();
  const lightTheme = useRef(null);
  const darkTheme = useRef(null);
  const [usernameFocus ,setUsernameFocus] = useState(false);
  const [passwordFocus ,setPasswordFocus] = useState(false);
  const [theme,setTheme] = useState(false)

  useEffect(() => {
    if (username.current) {
      username.current.focus();
    }
  }, []);
  const handleCheckInputFill = (e) => {
    if (e.target.id === "username") {
      if (e.target.value === "") {
        setUsernameF(false);
      } else {
        setUsernameF(true);
      }
    } else {
      if (e.target.value === "") {
        setPasswordF(false);
      } else {
        setPasswordF(true);
      }
    }
  };

  const handlePasswordVisibility = () => {
    if (pVisibility === false) {
      setPVisibility(true);
    } else {
      setPVisibility(false);
    }
  };
  const handleTheme = () =>{
      setTheme(!theme)
          themebtn.current.disabled = true
          const themeName = theme ? "white" : "dark"
          document. documentElement.setAttribute('data-theme',themeName)
      setTimeout(()=>{
          themebtn.current.disabled = false
      },400)
  }
  return (
    <section className="hero">
      <button className="web-theme" ref={themebtn} onClick={handleTheme}><Dark_theme ref={darkTheme} className={`dark_icon ${ theme ? "dark_icon2" : "dark_icon1"}`}/><Light_theme ref={lightTheme} className={`white_icon ${ theme ? "white_icon2" : "white_icon1"}`}/></button>
      <section className="sign_in_page">
        <div className="text-sec">
            <div className="heading">Connect, Share & Grow with <span>Yogtech</span></div>
            <div className="subheading">Join a vibrant community of creators, friends, and thinkers. Share your moments, discover new connections, and express yourself—freely and securely.</div>
        </div>
        <div className="log_in_sec">
          <div className="sign_in">
            <div className="app_name">{APP_NAME}</div>
            <form className="input_sec">
              <div
                className={`input_field ${
                  usernameFocus
                    ? "secondary-border-color"
                    : ""
                }`}>
                <label htmlFor="username">
                  <span className={usernameF ? "label2" : "label1"}>
                    Phone number, username or email id
                  </span>
                  <input
                    type="text"
                    id="username"
                    ref={username}
                    onFocus={() => {setUsernameF(true) ; setUsernameFocus(true)}}
                    onBlur={(e) => {
                      setUsernameF(false);
                      handleCheckInputFill(e);
                      setUsernameFocus(false)
                    }}
                  />
                </label>
              </div>

               <div
                className={`input_field ${
                  passwordFocus
                    ? "secondary-border-color"
                    : ""
                }`}>
                <label htmlFor="password">
                  <span className={passwordF ? "label2" : "label1"}>
                    Password
                  </span>
                  <input
                    id="password"
                    type={pVisibility ? "text" : "password"}
                    onFocus={() => {setPasswordF(true); setPasswordFocus(true)}}
                    onBlur={(e) => {
                      setPasswordF(false);
                      handleCheckInputFill(e);
                      setPasswordFocus(false)
                    }}
                  />
                </label>
                <button
                  type="button"
                  className="passwordV"
                  onClick={() => {
                    handlePasswordVisibility();
                  }}>
                  {pVisibility ? (
                    <Visibility size="20" className="icon" />
                  ) : (
                    <Visibility_off size="20" className="icon" />
                  )}
                </button>
              </div>
              <button type="button" className="submit">
                Log In <div className="loader"></div>
              </button>
            </form>
          </div>
          <div className="bar">
            <div className="hseperator"></div>
            OR
            <div className="hseperator"></div>
          </div>
          <div className="authLogin">
            <button type="button" onClick={loginWithGoogle}><img src={google} alt="" /> Google <div></div></button>
            <button type="button" onClick={loginWithFacebook}><img src={facebook} alt="" />Facebook <div></div></button>
            <button type="button" onClick={loginWithGitHub}><img src={github} alt="" />Git Hub <div></div></button>
          </div>
          <div className="forgetPassword">Forget password?</div>
          <div className="error"></div>
          <div className="dontHaveAccount">Don't have an account? <button>Sign up</button></div>
        </div>
      </section>
    </section>
  );
};

export default Index;
