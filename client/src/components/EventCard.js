import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Image,
  Stack,
  Heading,
  Button,
  Divider,
  useColorModeValue,
  Box,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Events({
  usereventname,
  usereventlocation,
  usereventtime,
  eventimg,
  usereventorgname,
  usereventorggmail,
  usereventcategory,
  _id,
  uid,
}) {
  const navigate = useNavigate();
  const [regStatus, setRegStatus] = useState(null);

  useEffect(() => {
    async function checkReg() {
      await axios
        .post("http://localhost:4000/checkreg", {
          eid: _id,
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

    checkReg();
  }, []);

  async function regitserNewUser() {
    await axios
      .post("http://localhost:4000/newregister", { eid: _id, uid: uid })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/events";
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function showdetails() {
    navigate(`/eventdetails/${_id}`);
  }
  return (
    <Box display={"flex"}>
      <Card
        w={"400px"}
        position={"-moz-initial"}
        overflow={"auto"}
        h={"100%"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
      >
        <CardBody overflow={"auto"}>
          <Image
            src={eventimg}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            maxW="400px"
            h="200px"
            objectFit="cover"
            alignItems="center"
            mx={"auto"}
            maxWidth="100%"
          />
          <Stack direction={"row"} align={"center"} justify={"space-between"}>
            <Stack mt="6" spacing="3">
              <Badge colorScheme="green" width={"min-content"}>
                {usereventcategory}
              </Badge>
              <Heading size="md">{usereventname}</Heading>
              <Text fontSize={13}>
                {new Date(usereventtime).toLocaleString([], {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Text>

              <Text fontWeight={600} fontSize={13}>
                📍{usereventlocation}
              </Text>
            </Stack>

            <Stack
              direction={"column"}
              spacing={0}
              fontSize={"sm"}
              minW={"100px"}
              maxW={"100px"}
            >
              <Text fontWeight={600} noOfLines={1}>
                {usereventorgname}
              </Text>

              <Text color={"gray.500"} noOfLines={1}>
                {usereventorggmail.slice(0, 10)}
              </Text>
            </Stack>
          </Stack>
        </CardBody>
        <Divider />

        <CardFooter maxWidth="100%">
          <Stack direction={"row"} align={"center"} spacing={70}>
            <Button
              size="sm"
              variant="solid"
              bgColor={"yellow.300"}
              onClick={showdetails}
            >
              See more details
            </Button>
            {regStatus ? (
              <Button
                size="sm"
                variant="outline"
                color={"black"}
                borderColor={"green"}
              >
                Registered
              </Button>
            ) : (
              <Button
                size="sm"
                variant="solid"
                bgColor={"green.500"}
                onClick={regitserNewUser}
                color={"white"}
              >
                Register
              </Button>
            )}
          </Stack>
        </CardFooter>
      </Card>
    </Box>
  );
}
