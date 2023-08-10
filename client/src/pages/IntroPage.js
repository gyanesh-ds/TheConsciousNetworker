import { useEffect, useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Navigate } from "react-router-dom";

export default function IntroPage() {
  const client_id = "86a0mhak6rvp60";
  const CLIENT_ID = "daf0a114d4dac5dc9a75";
  const [redirect, setRedirect] = useState(false);
  const toast = useToast();
  let googleButtonWrapper;
  const google = window.google;

  async function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);

    axios
      .post(
        "http://localhost:4000/googleauth",
        { userObj: userObject, access_token: response.credential },
        {
          withCredentials: true,
        } //send data to server on 4000 port
      )
      .then((response) => {
        if (response.status === 200) {
          setRedirect(true);
        } else {
          alert("Google Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:4000/profile", {
          withCredentials: true,
        })
        .then((response) => {
          window.location.href = "/pagefeed";
        })
        .catch((err) => {
          google.accounts.id.initialize({
            client_id:
              "114967761590-cnoplbn3sqo1art2auetnuffsbeglloe.apps.googleusercontent.com",
            ux_mode: "popup",
            callback: handleCallbackResponse,
          });

          const createFakeGoogleWrapper = () => {
            const googleLoginWrapper = document.createElement("div");
            googleLoginWrapper.style.display = "none";
            googleLoginWrapper.classList.add("custom-google-button");

            document.body.appendChild(googleLoginWrapper);

            google.accounts.id.renderButton(googleLoginWrapper, {
              type: "icon",
              width: "200",
            });

            const googleLoginWrapperButton =
              googleLoginWrapper.querySelector("div[role=button]");

            return {
              click: () => {
                googleLoginWrapperButton.click();
              },
            };
          };
          googleButtonWrapper = createFakeGoogleWrapper();

          //Github OAuth Code
          //if code param exists just call getGitAccessTokenUserdata
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const codeParam = urlParams.get("code");

          if (codeParam) {
            async function getAccessToken() {
              await axios
                .get(
                  "http://localhost:4000/getGitAccessTokenUserdata?code=" +
                    codeParam,
                  {
                    withCredentials: true,
                  }
                )
                .then((response) => {
                  if (response.status === 200) {
                    toast({
                      title: "Account created.",
                      description: "We've created your account for you.",
                      status: "loading",
                      duration: 5000,
                      isClosable: true,
                    });
                    setTimeout(() => {
                      setRedirect(true);
                    }, 2000);
                  } else {
                    alert("GitHub Something went wrong");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            getAccessToken();
          }
        });
    }
    fetchData();
  }, []);

  function handleGoogleLogin() {
    googleButtonWrapper.click();
  }
  function routeAuth() {
    window.location.href = "/auth";
  }

  function loginwithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  }
  if (redirect) {
    return <Navigate to={"/pagefeed"} />;
  }
  const responseFacebook = (response) => {
    axios
      .post(
        "http://localhost:4000/facebookauth",
        { userObj: response },
        {
          withCredentials: true,
        } //send data to server on 4000 port
      )
      .then((response) => {
        if (response.status === 200) {
          setRedirect(true);
        } else {
          alert("Facebook Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function LoginwithLinkedin() {
    const authUrl =
      "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=" +
      client_id +
      "&redirect_uri=http://localhost:3000/pagefeed&state=football&scope=r_liteprofile%20r_emailaddress";
    await axios
      .get("http://localhost:4000/linkedinauth")
      .then((response) => {
        window.location.href = authUrl;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div style={{ border: "5px  red" }}>
      <div
        style={{
          border: "5px  black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "140px",
        }}
      >
        <div
          style={{ textAlign: "left", marginLeft: "1%", paddingLeft: "25px" }}
        >
          <img
            src="/logoname-1@2x.png"
            maxWidth="100%"
            style={{ height: "90px" }}
          />
        </div>
        <div style={{ textAlign: "right", marginRight: "1%" }}>
          <Button
            style={{
              background:
                "linear-gradient(to bottom, #f89d8f 0%, #38609b 0.01%, #183154 100%)",
            }}
            className="button"
            variant="text"
            marginRight="20px"
            height={"50px"}
            color={"white"}
            width={"120px"}
            borderRadius={"30px"}
            onClick={routeAuth}
          >
            SIGN-UP
          </Button>
          <Button
            className="button1"
            variant="text"
            color={"white"}
            colorScheme="blue"
            height={"50px"}
            width={"120px"}
            borderRadius={"30px"}
            onClick={routeAuth}
            style={{
              background:
                "linear-gradient(to bottom, #f89d8f 0%, #38609b 0.01%, #183154 100%)",
            }}
          >
            LOGIN
          </Button>
        </div>
      </div>
      <div className="">
        <div
          className="introln1"
          style={{ marginBottom: "5%", marginTop: "5%" }}
        >
          <div className="intropageln1">
            <h1
              style={{
                color: "#183154",
                fontSize: "40px",
                marginRight: "20%",
                marginLeft: "5%",
              }}
            >
              We are a social network that enables you to connect with people
              who share your interests.
              <p
                style={{
                  /*marginLeft:'25%',*/ fontSize: "20px",
                  marginTop: "2%",
                }}
              >
                Looking to network with purpose and meaning?
                <br></br>Join The Conscious Networker - Where Mindful Networking
                Meets Meaningful Connections
                <br></br>Expand your network in a setting that promotes
                conscious living and real connections.
              </p>
            </h1>
          </div>
          <img
            style={{
              objectFit: "cover",
              margin: "0 auto",
              alignItems: "center",
              maxWidth: "100%",
              height: "350px",
              marginRight: "5%",
            }}
            alt=""
            src="/intro1-1@2x.png"
          />
        </div>
        <div className="">
          <div className="introln2" style={{ marginBottom: "5%" }}>
            <img
              style={{
                objectFit: "cover",
                margin: "0 auto",
                alignItems: "center",
                maxWidth: "100%",
                height: "350px",
                marginLeft: "5%",
              }}
              alt=""
              src="/people-1@2x.png"
            />
            <div className="intropageln2" style={{ alignItems: "center" }}>
              <h1
                style={{
                  paddingLeft: "60px",
                  color: "#183154",
                  fontSize: "40px",
                  marginLeft: "13%",
                }}
              >
                Discover a brand-new social media platform.
                <p
                  style={{
                    /*marginLeft:'25%',*/ fontSize: "20px",
                    marginTop: "2%",
                  }}
                >
                  We are the only social media site dedicated to assisting users
                  in connecting with others, sharing thoughtful ideas, planning
                  events, and celebrating life's new beginnings. We assist you
                  in locating groups where you can meet others who share your
                  interests and further your cause.
                </p>
              </h1>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "90px",
            backgroundColor: "#151515",
          }}
        >
          <div style={{ textAlign: "left", marginLeft: "5%" }}>
            <img
              src="/logonamewhite-1@2x.png"
              maxWidth="100%"
              style={{ height: "80px" }}
            />
          </div>
          <div style={{ display: "flex", margin: "20px" }}>
            <button
              class="my-awesome-button"
              onClick={handleGoogleLogin}
              style={{
                marginLeft: "20px",
                border: "2px solid white",
                height: "60px",
                width: "60px",
                textAlign: "center",
                textDecoration: "none",
                paddingLeft: "17px",
                display: "block",
                borderRadius: "60%",
              }}
            >
              <img
                src="/g.png"
                width={"20px"}
                height={"20px"}
                alt="googleimage"
              ></img>
            </button>

            <button
              onClick={loginwithGithub}
              style={{
                marginLeft: "20px",
                border: "2px solid white",
                height: "60px",
                width: "60px",
                textAlign: "center",
                textDecoration: "none",
                padding: "14px",
                display: "block",
                borderRadius: "60%",
              }}
            >
              <img
                src="/git.png"
                width={"27px"}
                height={"27px"}
                alt="gitimage"
              ></img>
            </button>
            <FacebookLogin
              appId="603052405152675"
              autoLoad={true}
              fields="name,email,picture"
              callback={responseFacebook}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  style={{
                    marginLeft: "20px",
                    border: "2px solid white",
                    height: "60px",
                    width: "60px",
                    textAlign: "center",
                    textDecoration: "none",
                    paddingLeft: "21px",
                    display: "block",
                    borderRadius: "60%",
                  }}
                >
                  <img
                    src="/f.png"
                    width={"12px"}
                    height={"12px"}
                    alt="facebookmage"
                  ></img>
                </button>
              )}
            />

            <button
              onClick={LoginwithLinkedin}
              style={{
                marginLeft: "20px",
                border: "2px solid white",
                height: "60px",
                width: "60px",
                textAlign: "center",
                textDecoration: "none",
                padding: "18px",
                display: "block",
                borderRadius: "60%",
              }}
            >
              <img
                src="in.png"
                width={"20px"}
                height={"20px"}
                alt="iniamge"
              ></img>
            </button>
          </div>
          <div
            style={{ textAlign: "right", color: "white", marginRight: "5%" }}
          >
            <p style={{ color: "white", marginRight: "67%" }}>Contact Us:</p>

            <a
              style={{ color: "white" }}
              href="mailto:hello@theconsciousnetworker.com"
            >
              hello@theconsciousnetworker.com
            </a>
            <p>© 2023 Designed by Team</p>
          </div>
        </div>
      </div>
    </div>
  );
}
