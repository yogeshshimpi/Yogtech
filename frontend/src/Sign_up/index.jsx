import React, { useState, useRef, useEffect } from "react";
import BackwardIcon from "../component/svg/backward_arrow";
import "./style.css";
import { APP_NAME } from "../strings/s1";
import OtpIcon from "../component/svg/otpIcon";
import PasswordIcon from "../component/svg/passwordIcon";
import UserIcon from "../component/svg/userIcon";

const Index = () => {
  const [inputF, setInputF] = useState({
    username: false,
    firstName: false,
    lastName: false,
    emailOrPhone: false,
    password: false,
    confirmPassword: false,
  });

  const inputField = useRef({});

  const [inputFocus, setInputFocus] = useState({
    username: false,
    firstName: false,
    lastName: false,
    emailOrPhone: false,
    password: false,
    confirmPassword: false,
  });

  const pageStage = useRef({});

  const [pageControl, setPageControl] = useState({
    1: "frontSideStage",
    2: "rightSideStage",
    3: "rightSideStage",
  });

  const activeStage = useRef(1);

  const otpField = useRef({});

  const btnField = useRef({})

  useEffect(() => {
    if (inputField.current["username"]) {
      inputField.current["username"].focus();
    }
  }, []);

  const handleCheckInputFill = (e) => {
    updateInputF(e.target.id, e.target.value !== "");
  };

  const updateInputF = (key, value) => {
    setInputF((prev) => ({ ...prev, [key]: value }));
  };
  const updateInputFocus = (key, value) => {
    setInputFocus((prev) => ({ ...prev, [key]: value }));
  };
  const updatePageControl = (key, value) => {
    setPageControl((prev) => ({ ...prev, [key]: value }));
  };

  const handleNextPage = (input) => {
     Object.values(btnField.current).forEach((ref) => {
  if (ref) ref.disabled = true;
});
    if (input) {
      activeStage.current += 1;
      if (activeStage.current > Object.keys(pageStage.current).length) {
        activeStage.current = Object.keys(pageStage.current).length;
      }
    } else {
      activeStage.current -= 1;
      if (activeStage.current <= 0) {
        activeStage.current = 1;
      }
    }


    if (activeStage.current === 1) {
      updatePageControl(activeStage.current, "frontPageSide");
      for (let key in pageStage.current) {
        if (key >= 2) {
          updatePageControl(key, "rightSideStage");
        }
      }
    } else if (activeStage.current === Object.keys(pageStage.current).length) {
      for (
        let key = Object.keys(pageStage.current).length - 1;
        key >= 1;
        key--
      ) {
        if (key < Object.keys(pageStage.current).length) {
          updatePageControl(key, "leftSideStage");
        }
      }
      updatePageControl(activeStage.current, "frontSidePage");

     
    } else {
      // for (let key in pageStage.current) {
      for (
        let key = Object.keys(pageStage.current).length - 1;
        key >= 1;
        key--
      ) {
        if (key < activeStage.current) {
          updatePageControl(key, "leftSideStage");
        }
      }
      updatePageControl(activeStage.current, "frontSidePage");
      

      const totalStages = Object.keys(pageStage.current).length;

      for (let key = 1; key <= totalStages; key++) {
        if (key > activeStage.current) {
          updatePageControl(key, "rightSideStage");
        }
      }
    }
   setTimeout(()=>{
    Object.values(btnField.current).forEach((ref) => {
  if (ref) ref.disabled = false;
});
 if (activeStage.current === 3) {
        otpField.current[1].focus();
      }
      if (activeStage.current === 2) {
  inputField.current['password'].focus();
}
if (activeStage.current === 1) {
  inputField.current['username'].focus();
}
   },200)
  };

  const handleOtpField = (e) => {
    // const value = e.target.value
    const Index = parseInt(e.target.id);
    if (isNaN(otpField.current[Index].value)) {
      otpField.current[Index].value = "";
    } else {
      otpField.current[Index + 1]?.focus();
    }
  };

  const handleOtpBack = (key, otp_Field) => {
    const Index = parseInt(otp_Field.id);
    if (key === "Backspace") {
      const currentInput = otpField.current[Index];
      if (otpField.current[Index].value === "") {
        const prevInput = otpField.current[Index - 1];
        if (prevInput) {
          prevInput.focus();
          prevInput.value = "";
        }
      } else {
        currentInput.value = "";
      }
    }
  };

  return (
    <>
      <section className="hero">
        <div className="logInSec">
          <div className="app_name">{APP_NAME}</div>
          <div className="heading">Create your account and start exploring</div>
          <div className="steps">
            <div
              className={`circle ${
                activeStage.current === 1 ? "activeStage" : ""
              } ${activeStage.current >= 1 ? "secondary_color" : ""}`}>
              <UserIcon className="Icon icon1" />
            </div>
            <div
              className={`bar ${
                activeStage.current >= 2 ? "secondary_border_color" : ""
              }`}>
                <div className="cBar"></div>
              </div>
            <div
              className={`circle ${
                activeStage.current === 2 ? "activeStage" : ""
              } ${activeStage.current >= 2 ? "secondary_color" : ""}`}>
              <PasswordIcon className="Icon" />
            </div>
            <div
              className={`bar ${
                activeStage.current >= 3 ? "secondary_border_color" : ""
              }`}>
                <div className="cBar"></div>

              </div>
            <div
              className={`circle ${
                activeStage.current === 3 ? "activeStage" : ""
              } ${activeStage.current >= 3 ? "secondary_color" : ""}`}>
              <OtpIcon className="Icon" />
            </div>
          </div>
          <form className="input_sec">
            <div className="stageSec ">
              <div
                ref={(e) => {
                  pageStage.current[1] = e;
                }}
                className={`page_stage ${pageControl[1]}`}>
                {activeStage.current === 1 ?
                <>
                <div className="stage_heading">Personal Information</div>
                <div className="stageInput">
                  <div
                    className={`input_field ${
                      inputFocus["username"] ? "secondary_border_color" : ""
                    }`}>
                    <label htmlFor="username">
                      <span
                        className={inputF["username"] ? "label2" : "label1"}>
                        Username
                      </span>
                      <input
                        type="text"
                        id="username"
                        ref={(e) => {
                          inputField.current["username"] = e;
                        }}
                        onFocus={() => {
                          updateInputF("username", true);
                          updateInputFocus("username", true);
                        }}
                        onBlur={(e) => {
                          updateInputF("username", false);
                          handleCheckInputFill(e);
                          updateInputFocus("username", false);
                        }}
                      />
                    </label>
                  </div>
                  <div className="horInputGroup">
                    <div
                      className={`input_field ${
                        inputFocus["firstName"] ? "secondary_border_color" : ""
                      }`}>
                      <label htmlFor="firstName">
                        <span
                          className={inputF["firstName"] ? "label2" : "label1"}>
                          First Name
                        </span>
                        <input
                          ref={(e) => {
                            inputField.current["firstName"] = e;
                          }}
                          onFocus={() => {
                            updateInputF("firstName", true);
                            updateInputFocus("firstName", true);
                          }}
                          onBlur={(e) => {
                            updateInputF("firstName", false);
                            handleCheckInputFill(e);
                            updateInputFocus("firstName", false);
                          }}
                          type="text"
                          id="firstName"
                        />
                      </label>
                    </div>
                    <div
                      className={`input_field ${
                        inputFocus["lastName"] ? "secondary_border_color" : ""
                      }`}>
                      <label htmlFor="lastName">
                        <span
                          className={inputF["lastName"] ? "label2" : "label1"}>
                          Last Name
                        </span>

                        <input
                          ref={(e) => {
                            inputField.current["lastName"] = e;
                          }}
                          onFocus={() => {
                            updateInputF("lastName", true);
                            updateInputFocus("lastName", true);
                          }}
                          onBlur={(e) => {
                            updateInputF("lastName", false);
                            handleCheckInputFill(e);
                            updateInputFocus("lastName", false);
                          }}
                          type="text"
                          id="lastName"
                        />
                      </label>
                    </div>
                  </div>
                  <div
                    className={`input_field ${
                      inputFocus["emailOrPhone"] ? "secondary_border_color" : ""
                    }`}>
                    <label htmlFor="emailOrPhone">
                      <span
                        className={
                          inputF["emailOrPhone"] ? "label2" : "label1"
                        }>
                        Email or Mobile no.
                      </span>

                      <input
                        ref={(e) => {
                          inputField.current["emailOrPhone"] = e;
                        }}
                        onFocus={() => {
                          updateInputF("emailOrPhone", true);
                          updateInputFocus("emailOrPhone", true);
                        }}
                        onBlur={(e) => {
                          updateInputF("emailOrPhone", false);
                          handleCheckInputFill(e);
                          updateInputFocus("emailOrPhone", false);
                        }}
                        type="text"
                        id="emailOrPhone"
                      />
                    </label>
                  </div>
                </div></> 
                :null}
              </div>
              <div
                ref={(e) => {
                  pageStage.current[2] = e;
                }}
                className={`page_stage ${pageControl[2]}`}>
                {activeStage.current === 2 ?
                <>
                <div className="stage_heading">Create strong password</div>
                <div className="stageInput">
                  <div
                    className={`input_field ${
                      inputFocus["password"] ? "secondary_border_color" : ""
                    }`}>
                    <label htmlFor="password">
                      <span
                        className={inputF["password"] ? "label2" : "label1"}>
                        Password
                      </span>
                      <input
                        ref={(e) => {
                          inputField.current["password"] = e;
                        }}
                        onFocus={() => {
                          updateInputF("password", true);
                          updateInputFocus("password", true);
                        }}
                        onBlur={(e) => {
                          updateInputF("password", false);
                          handleCheckInputFill(e);
                          updateInputFocus("password", false);
                        }}
                        type="text"
                        id="password"
                      />
                    </label>
                  </div>
                  <div
                    className={`input_field ${
                      inputFocus["confirmPassword"]
                        ? "secondary_border_color"
                        : ""
                    }`}>
                    <label htmlFor="confirmPassword">
                      <span
                        className={
                          inputF["confirmPassword"] ? "label2" : "label1"
                        }>
                        Confirm Password
                      </span>
                      <input
                        ref={(e) => {
                          inputField.current["confirmPassword"] = e;
                        }}
                        onFocus={() => {
                          updateInputF("confirmPassword", true);
                          updateInputFocus("confirmPassword", true);
                        }}
                        onBlur={(e) => {
                          updateInputF("confirmPassword", false);
                          handleCheckInputFill(e);
                          updateInputFocus("confirmPassword", false);
                        }}
                        type="text"
                        id="confirmPassword"
                      />
                    </label>
                  </div>
                </div>
                </>
                :null
                }
                
              </div>
              <div
                ref={(e) => {
                  pageStage.current[3] = e;
                }}
                className={`page_stage ${pageControl[3]}`}>
                {activeStage.current === 3 ?
                <>
                <div className="stage_heading">Two-Factor Authentication (2FA)</div>
                <div className="stageInput">
                  <div className="stageSubHeading">
                    The otp is send to your email Id
                  </div>
                  <div className="horOtpGroup">
                    <input
                      id="1"
                      ref={(e) => {
                        otpField.current[1] = e;
                      }}
                      maxLength={1}
                      onInput={(e) => {
                        handleOtpField(e);
                      }}
                      onKeyDown={(e) => {
                        handleOtpBack(e.key, e.target);
                      }}
                      type="text"
                      placeholder="0"
                    />
                    <input
                      id="2"
                      ref={(e) => {
                        otpField.current[2] = e;
                      }}
                      maxLength={1}
                      onInput={(e) => {
                        handleOtpField(e);
                      }}
                      onKeyDown={(e) => {
                        handleOtpBack(e.key, e.target);
                      }}
                      type="text"
                      placeholder="0"
                    />
                    <input
                      id="3"
                      ref={(e) => {
                        otpField.current[3] = e;
                      }}
                      maxLength={1}
                      onInput={(e) => {
                        handleOtpField(e);
                      }}
                      onKeyDown={(e) => {
                        handleOtpBack(e.key, e.target);
                      }}
                      type="text"
                      placeholder="0"
                    />
                    <input
                      id="4"
                      ref={(e) => {
                        otpField.current[4] = e;
                      }}
                      maxLength={1}
                      onInput={(e) => {
                        handleOtpField(e);
                      }}
                      onKeyDown={(e) => {
                        handleOtpBack(e.key, e.target);
                      }}
                      type="text"
                      placeholder="0"
                    />
                  </div>
                </div>
                </>
                :null}
              </div>
            </div>

            <div className="btnFirstStage">
             {activeStage.current > 1 ?  <button
              ref={(e)=>{btnField.current[1] = e}}
                onClick={(e) => {
                  e.preventDefault()
                  handleNextPage(false);
                }}
                className="back"
                type="button">
                <BackwardIcon className="backArrow" />
              </button> :<div></div> }
              {activeStage.current < 3 ?
              <button
              ref={(e)=>{btnField.current[2] = e}}
                onClick={(e) => {
                  e.preventDefault()
                  handleNextPage(true);
                }}
                className="next"
                type="button">
                Continue
              </button> : <button
               
              ref={(e)=>{btnField.current[3] = e}}
                className="next"
                type="button">
                Submit
              </button>}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Index;
