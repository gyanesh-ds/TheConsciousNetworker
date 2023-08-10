import { Badge, Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EventTile({
  usereventname,
  usereventlocation,
  usereventtime,
  usereventcategory,
  _id,
  uid,
}) {
  const [regStatus, setRegStatus] = useState(null);
  const navigate = useNavigate();
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
  function showdetails() {
    navigate(`/eventdetails/${_id}`);
  }
  return (
    <Box
      h={"80px"}
      bg={useColorModeValue("#f2f3f8", "gray.900")}
      boxShadow={"2xs"}
      rounded={"md"}
      p={"10px"}
      mt={2}
      mb={2}
      overflow={"hidden"}
      justifyItems={"center"}
      onClick={showdetails}
    >
      <Stack direction={"row"}>
        <Box
          mr={"5px"}
          h={"60px"}
          minWidth={"50px"}
          bg={"green.500"}
          rounded={"md"}
          align={"center"}
        >
          <Text fontWeight={"bold"} color={"white"}>
            {new Date(usereventtime).toLocaleString([], {
              month: "short",
              day: "numeric",
            })}
          </Text>
        </Box>
        <Stack direction={"column"} w={"100%"}>
          <Stack direction={"row"} justify={"space-between"} align={"center"}>
            <Box w={"150px"}>
              <Text fontWeight={600} noOfLines={1}>
                {usereventname}
              </Text>
            </Box>
            {regStatus ? (
              <Badge colorScheme="green" width={"min-content"}>
                Regitsered
              </Badge>
            ) : (
              <Badge colorScheme={"blue"} width={"min-content"}>
                Upcomming
              </Badge>
            )}
          </Stack>
          <Stack direction={"row"}>
            <Text fontWeight={350}>📍{usereventlocation}</Text>

            <Text fontWeight={350} color={"green"}>
              #{usereventcategory}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
