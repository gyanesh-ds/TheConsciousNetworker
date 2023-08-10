import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { SiFacebook, SiGithub, SiGoogle, SiLinkedin } from "react-icons/si";
import { Box, Button, Center, Image, Stack, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

export default function AuthPage() {
  const toast = useToast();
  const [redirect, setRedirect] = useState(false);
  const CLIENT_ID = "daf0a114d4dac5dc9a75";
  const client_id = "86a0mhak6rvp60";
  let googleButtonWrapper;

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
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "114967761590-cnoplbn3sqo1art2auetnuffsbeglloe.apps.googleusercontent.com",
      ux_mode: "popup",
      callback: handleCallbackResponse,
    });
    google.accounts.id.prompt();

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
            "http://localhost:4000/getGitAccessTokenUserdata?code=" + codeParam,
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
          .catch((err) => {});
      }
      getAccessToken();
    }
  }, []);
  function handleGoogleLogin() {
    googleButtonWrapper.click();
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

  function loginwithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  }
  function HomeRoute() {
    window.location.href = "/";
  }
  return (
    <Box
      backgroundImage={"./loginback.jpg"}
      height={"920px"}
      bgRepeat={"no-repeat"}
      backgroundSize={"cover"}
    >
      <Center>
        <Stack
          direction={"column"}
          align={"center"}
          marginTop={"30px"}
          spacing={"150px"}
        >
          <Image
            onClick={HomeRoute}
            src="./logonameblack.png"
            h={"70px"}
            w={"200px"}
            alt="logo_image"
          ></Image>
  

          <Box
            w={"500px"}
            bgColor={"white"}
            h={"400px"}
            rounded={"lg"}
            boxShadow={"2xl"}
          >
            <Stack
              direction={"column"}
              p={"30px"}
              spacing={50}
              align={"center"}
            >
              <Text fontWeight={"bold"} fontSize={"33px"} color={"green.600"}>
                Login/SignUp
              </Text>
              <Stack spacing={2} align={"center"} w={"full"}>
                <Button
                  w={"400px"}
                  onClick={handleGoogleLogin}
                  colorScheme={"messenger"}
                  leftIcon={<SiGoogle />}
                >
                  <Text color={"white"}>Google</Text>
                </Button>

                <Button
                  w={"400px"}
                  onClick={loginwithGithub}
                  colorScheme={"blackAlpha"}
                  leftIcon={<SiGithub color="black" />}
                >
                  <Text color={"black"}>Github</Text>
                </Button>
                <Button
                  w={"400px"}
                  onClick={LoginwithLinkedin}
                  colorScheme={"linkedin"}
                  leftIcon={<SiLinkedin />}
                >
                  <Text>LinkedIn</Text>
                </Button>
                <FacebookLogin
                  appId="603052405152675"
                  autoLoad={true}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  render={(renderProps) => (
                    <Button
                      w={"400px"}
                      colorScheme={"facebook"}
                      onClick={renderProps.onClick}
                      leftIcon={<SiFacebook />}
                    >
                      <Text>Facebook</Text>
                    </Button>
                  )}
                />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Center>
    </Box>
  );
}
