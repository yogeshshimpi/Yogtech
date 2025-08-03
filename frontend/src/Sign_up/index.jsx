import React, { useState, useRef, useEffect } from "react";
import BackwardIcon from "../component/svg/backward_arrow";
import "./style.css";
import { APP_NAME } from "../strings/s1";
import OtpIcon from "../component/svg/otpIcon";
import PasswordIcon from "../component/svg/passwordIcon";
import UserIcon from "../component/svg/userIcon";
import Visibility from "../component/svg/visibility";
import Visibility_off from "../component/svg/visibility_off";
import { loginWithGitHub, loginWithGoogle } from "../auth";
import GithubIcon from "../component/svg/GithubIcon";
import google from "../assets/google.png";

const Index = () => {
  const [inputF, setInputF] = useState({
    username: false,
    fullName: false,
    emailOrPhone: false,
    password: false,
    confirmPassword: false,
  });

  const inputField = useRef({});

  const [inputFocus, setInputFocus] = useState({
    username: false,
    fullName: false,
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

  const [pVisibility, setPVisibility] = useState(false);

  const activeStage = useRef(1);

  const otpField = useRef({});

  const btnField = useRef({});

  const inputError = useRef({});

  const [otpWay, setOtpWay] = useState("");

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
    setTimeout(() => {
      Object.values(btnField.current).forEach((ref) => {
        if (ref) ref.disabled = false;
      });
      if (activeStage.current === 3) {
        otpField.current[1].focus();
      }
      if (activeStage.current === 2) {
        inputField.current["password"].focus();
      }
      if (activeStage.current === 1) {
        inputField.current["username"].focus();
      }
    }, 200);
  };

  const handleOtpField = (e) => {
    const index = parseInt(e.target.id);
    const key = e.key;

    if (!isNaN(key) && key !== " ") {
      otpField.current[index].value = key;

      const next = otpField.current[index + 1];
      if (next) {
        next.focus();
      }

      e.preventDefault(); // Prevent double input
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
    } else if (key === "ArrowLeft" && Index > 1) {
      otpField.current[Index - 1].focus();
    } else if (
      key === "ArrowRight" &&
      Index < Object.keys(otpField.current).length
    ) {
      otpField.current[Index + 1].focus();
    }
  };
  const handleErrorDisplay = (errorIndex, message) => {
    const errorElement = inputError.current[errorIndex];
    if (errorElement) {
      errorElement.style.height = "15px";
      errorElement.textContent = message;
    }
  };

  const handleForm = () => {
    // console.log(activeStage.current);
    if (activeStage.current === 1) {
      let isValid = true;
      const username = inputField.current["username"];
      const fullName = inputField.current["fullName"];
      const emailOrPhone = inputField.current["emailOrPhone"];

      if (fullName.value != "") {
        inputError.current[2].style.height = "0px";
        inputError.current[2].textContent = "";
      } else {
        isValid = false;
        handleErrorDisplay(2, "This field is required.");
      }

      if (username.value === "") {
        handleErrorDisplay(1, "This field is required.");
        isValid = false;
      } else {
        if (
          Object.keys(username.value).length < 3 ||
          Object.keys(username.value).length > 20
        ) {
          handleErrorDisplay(1, "Username length should 3 to 20 character.");
          isValid = false;
        } else {
          if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
            handleErrorDisplay(
              1,
              "Username not contain special symbol and space."
            );
            isValid = false;
          } else {
            if (!/^[a-zA-Z]/.test(username.value)) {
              handleErrorDisplay(1, "Username must start with letter");
              isValid = false;
            } else {
              inputError.current[1].style.height = "0px";
              inputError.current[1].textContent = "";
            }
          }
        }
      }

      if (emailOrPhone.value === "") {
        handleErrorDisplay(3, "This field is required.");
        isValid = false;
      } else {
        if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone.value) &&
          !/^[0-9]{10}$/.test(emailOrPhone.value)
        ) {
          handleErrorDisplay(3, "Enter a valid Email address or Phone number.");
          isValid = false;
        } else {
          inputError.current[3].style.height = "0px";
          inputError.current[3].textContent = "";
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone.value)) {
            setOtpWay("Email Id");
          } else if (/^[0-9]{10}$/.test(emailOrPhone.value)) {
            setOtpWay("Phone number");
          }
        }
      }
      if (isValid) {
        handleNextPage(true);
      }
    } else if (activeStage.current === 2) {
      let isValid = true;
      const password = inputField.current["password"];
      const confirmPassword = inputField.current["confirmPassword"];

      if (password.value === "") {
        isValid = false;
        handleErrorDisplay(1, "This field is required");
      } else {
        if (
          Object.keys(password.value).length < 6 ||
          Object.keys(password.value).length > 16
        ) {
          isValid = false;
          handleErrorDisplay(1, "The length should be 6 - 16 character");
        } else {
          const regex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,16}$/;

          if (!regex.test(password.value)) {
            isValid = false;
            handleErrorDisplay(
              1,
              "Field should contain letter,number and special symbol."
            );
          } else {
            if (/\s/.test(password.value)) {
              isValid = false;
              handleErrorDisplay(1, "Field should not contain spaces.");
            } else {
              inputError.current[1].style.height = "0px";
              inputError.current[1].textContent = "";
            }
          }
        }
      }
      if (confirmPassword.value == "") {
        isValid = false;
        handleErrorDisplay(2, "This field is required.");
      } else {
        if (confirmPassword.value != password.value) {
          isValid = false;
          handleErrorDisplay(2, "The password is not match.");
        } else {
          inputError.current[2].style.height = "0px";
          inputError.current[3].textContent = "";
        }
      }

      if (isValid) {
        handleNextPage(true);
      }
    } else if (activeStage.current === 3) {
      let otp = "";
      let isValid = true;
      Object.keys(otpField.current).forEach((key) => {
        otp += otpField.current[key].value;
      });
      if (Object.keys(otp).length != 4) {
        isValid = false;
        handleErrorDisplay(1, "Please enter valid otp.");
      } else {
        inputError.current[1].style.height = "0px";
        inputError.current[1].textContent = "";
      }
      if (isValid) {
        console.log("success");
      }
    }
  };

  const handlePasswordVisibility = () => {
    setPVisibility(!pVisibility);
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
                {activeStage.current === 1 ? (
                  <>
                    <div className="stage_heading">Personal Information</div>
                    <div className="stageInput">
                      <div className="input_field">
                        <div
                          className={`inputBox ${
                            inputFocus["username"]
                              ? "secondary_border_color"
                              : ""
                          }`}>
                          <label htmlFor="username">
                            <span
                              className={
                                inputF["username"] ? "label2" : "label1"
                              }>
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
                        <div
                          ref={(e) => {
                            inputError.current[1] = e;
                          }}
                          className="error"></div>
                      </div>
                      <div className="input_field">
                        <div
                          className={`inputBox ${
                            inputFocus["fullName"]
                              ? "secondary_border_color"
                              : ""
                          }`}>
                          <label htmlFor="fullName">
                            <span
                              className={
                                inputF["fullName"] ? "label2" : "label1"
                              }>
                              Full Name
                            </span>
                            <input
                              ref={(e) => {
                                inputField.current["fullName"] = e;
                              }}
                              onFocus={() => {
                                updateInputF("fullName", true);
                                updateInputFocus("fullName", true);
                              }}
                              onBlur={(e) => {
                                updateInputF("fullName", false);
                                handleCheckInputFill(e);
                                updateInputFocus("fullName", false);
                              }}
                              type="text"
                              id="fullName"
                            />
                          </label>
                        </div>
                        <div
                          ref={(e) => {
                            inputError.current[2] = e;
                          }}
                          className="error"></div>
                      </div>

                      <div className="input_field">
                        <div
                          className={`inputBox ${
                            inputFocus["emailOrPhone"]
                              ? "secondary_border_color"
                              : ""
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
                        <div
                          ref={(e) => {
                            inputError.current[3] = e;
                          }}
                          className="error"></div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div
                ref={(e) => {
                  pageStage.current[2] = e;
                }}
                className={`page_stage ${pageControl[2]}`}>
                {activeStage.current === 2 ? (
                  <>
                    <div className="stage_heading">Create strong password</div>
                    <div className="stageInput">
                      <div className="input_field">
                        <div
                          className={` inputBox ${
                            inputFocus["password"]
                              ? "secondary_border_color"
                              : ""
                          }`}>
                          <label htmlFor="password">
                            <span
                              className={
                                inputF["password"] ? "label2" : "label1"
                              }>
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
                              type={pVisibility ? "text" : "password"}
                              id="password"
                            />
                          </label>
                          <button
                            type="button"
                            className="passwordV"
                            onClick={handlePasswordVisibility}>
                            {pVisibility ? (
                              <Visibility size="20" className="icon" />
                            ) : (
                              <Visibility_off size="20" className="icon" />
                            )}
                          </button>
                        </div>
                        <div
                          ref={(e) => {
                            inputError.current[1] = e;
                          }}
                          className="error"></div>
                      </div>
                      <div className="input_field">
                        <div
                          className={`inputBox ${
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
                              type="password"
                              id="confirmPassword"
                            />
                          </label>
                        </div>
                        <div
                          ref={(e) => {
                            inputError.current[2] = e;
                          }}
                          className="error"></div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div
                ref={(e) => {
                  pageStage.current[3] = e;
                }}
                className={`page_stage ${pageControl[3]}`}>
                {activeStage.current === 3 ? (
                  <>
                    <div className="stage_heading">
                      Two-Factor Authentication (2FA)
                    </div>
                    <div className="stageInput">
                      <div className="stageSubHeading">
                        The otp is send to your {otpWay}
                      </div>
                      <div className="horOtpGroup">
                        <input
                          id="1"
                          ref={(e) => {
                            otpField.current[1] = e;
                          }}
                          maxLength={1}
                          onKeyDown={(e) => {
                            handleOtpBack(e.key, e.target);
                            handleOtpField(e);
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
                          onKeyDown={(e) => {
                            handleOtpBack(e.key, e.target);
                            handleOtpField(e);
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
                          onKeyDown={(e) => {
                            handleOtpBack(e.key, e.target);
                            handleOtpField(e);
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
                          onKeyDown={(e) => {
                            handleOtpBack(e.key, e.target);
                            handleOtpField(e);
                          }}
                          type="text"
                          placeholder="0"
                        />
                      </div>
                      <div
                        ref={(e) => {
                          inputError.current[1] = e;
                        }}
                        className="error"></div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>

            <div className="btnFirstStage">
              {activeStage.current > 1 ? (
                <button
                  ref={(e) => {
                    btnField.current[1] = e;
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNextPage(false);
                  }}
                  className="back"
                  type="button">
                  <BackwardIcon className="backArrow" />
                </button>
              ) : (
                <div></div>
              )}
              {activeStage.current < 3 ? (
                <button
                  ref={(e) => {
                    btnField.current[2] = e;
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleForm();
                  }}
                  className="next"
                  type="button">
                  Continue
                </button>
              ) : (
                <button
                  ref={(e) => {
                    btnField.current[3] = e;
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleForm();
                  }}
                  className="next"
                  type="button">
                  Submit
                </button>
              )}
            </div>
          </form>
          <div className="seperate">
            <div className="bar"></div>
            <div className="or">OR</div>
            <div className="bar"></div>
          </div>
          <div className="authLogin">
            <button type="button" onClick={loginWithGoogle}>
              <img src={google} className="img" alt="" /> Google <div></div>
            </button>
            <button type="button" onClick={loginWithGitHub}>
              <GithubIcon className="img" /> Git Hub <div></div>
            </button>
          </div>
          <div className="signIn">
            Already have an account? <button>Sign In</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
