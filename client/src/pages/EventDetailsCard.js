import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useToast,
  Stack,
  StackDivider,
  Card,
  CardHeader,
  CardBody,
  Box,
  Heading,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
export default function ShowEventDetails() {
  const { id } = useParams();
  const [eventInfo, seteventInfo] = useState(null);
  const toast = useToast();
  const [uid, setUid] = useState(null);
  const [regStatus, setRegStatus] = useState(null);

  const showtoast = () => {
    toast({
      title: "You have successfully registered for this event",
      status: "success",
      duration: 1500,
      isClosable: true,
    });
  };
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:4000/profile", {
          withCredentials: true,
        })
        .then((response) => {
          setUid(response.data.id);
        })
        .catch((err) => {
          window.location.href = "/auth";
        });
    }
    async function checkReg() {
      await axios
        .post("http://localhost:4000/checkreg", {
          eid: id,
          uid: uid,
        })
        .then((response) => {
          if (response.data != null) {
            setRegStatus(true);
          } else {
            setRegStatus(false);
          }
        });
    }
    fetchData();

    checkReg();
    fetch(`http://localhost:4000/newevent/${id}`).then((response) => {
      response.json().then((eventInfo) => {
        seteventInfo(eventInfo);
      });
    });
  }, []);

  async function regitserNewUser() {
    await axios
      .post("http://localhost:4000/newregister", { eid: id, uid: uid })
      .then((response) => {
        if (response.status === 200) {
          showtoast();
          window.location.href = "/events";
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!eventInfo) return "";

  return (
    <div className="bgColor">
      <Box pt={"20"}>
        <Stack direction={"row"} justify={"space-evenly"} align={"center"}>
          <Image
            rounded={"lg"}
            boxShadow={"2xl"}
            maxW="100%"
            h="380px"
            w={"700px"}
            objectFit="cover"
            alignItems="center"
            mx={"0"}
            marginLeft="20px"
            marginTop={"2%"}
            marginRight="20px"
            src={eventInfo.eventimg}
            alt="Chakra UI"
          />

          <Card w={"500px"} marginTop="3%" boxShadow={"md"} overflowY="auto">
            <CardHeader className="eventdetailsname">
              <div>
                <Heading size="md">{eventInfo.usereventname}</Heading>
              </div>
              <div style={{ marginLeft: "auto" }}>
                {regStatus ? (
                  <Button
                    variant="outline"
                    color={"black"}
                    borderColor={"green"}
                  >
                    Registered
                  </Button>
                ) : (
                  <Button colorScheme={"green"} onClick={regitserNewUser}>
                    Register
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Category
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {eventInfo.usereventcategory}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Event Location
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {eventInfo.usereventlocation}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Time
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {eventInfo.usereventtime}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
        <Box p={"100px"}>
          <Card>
            <CardBody>
              <Heading
                size={"lg"}
                marginBottom="4%"
                sx={{ borderBottom: "2px solid black" }}
                display="inline-block"
                width="fit-content"
              >
                About
              </Heading>
              <Heading size={"md"} marginBottom="2%" fontWeight="medium">
                {eventInfo.usereventname}
              </Heading>
              <Text marginBottom={"5%"} marginLeft="2%">
                {eventInfo.usereventdescription}
              </Text>
              <Text marginBottom={"5%"} marginLeft="2%">
                {eventInfo.usereventgmail}
              </Text>
              <Heading size={"md"} marginBottom="2%" fontWeight="medium">
                What will you learn?
              </Heading>
              <Text marginBottom={"5%"} marginLeft="2%">
                {" "}
                {eventInfo.usereventlean}{" "}
              </Text>
              <Heading size={"md"} marginBottom="2%" fontWeight="medium">
                Event Organizer
              </Heading>
              <Text marginLeft="2%" marginBottom={"5%"}>
                Name of the Organizer is {eventInfo.usereventorgname}. <br />{" "}
                Contact of the Organizer: {eventInfo.usereventorggmail}{" "}
              </Text>
              <Heading size={"md"} marginBottom="2%" fontWeight="medium">
                Key details
              </Heading>
              <Text marginLeft="2%">
                Language: {eventInfo.usereventlanguage}
              </Text>
              <Text marginLeft="2%">age: {eventInfo.userevententryage}</Text>
              <Text marginLeft="2%">
                Duration: {eventInfo.usereventduration}
              </Text>
              <Text marginLeft="2%" marginBottom={"5%"}>
                Fee: {eventInfo.usereventfee}
              </Text>
            </CardBody>
          </Card>
        </Box>
      </Box>
    </div>
  );
}
