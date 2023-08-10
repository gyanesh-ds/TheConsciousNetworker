import {
  Grid,
  GridItem,
  Text,
  Box,
  useColorModeValue,
  Stack,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import EventTile from "../components/EventTile";
import GroupCard from "../components/GroupCard";
import Post from "../components/PostCard";
import SkeletonPost from "../components/SkeletonPost";
import AddQuotebutton from "../components/AddQuotebutton";

export default function PageFeed() {
  const [posts, setposts] = useState([]);
  const [quotes, setquotes] = useState([]);
  const [uid, setUid] = useState(null);
  const [Event, getEvent] = useState([]);
  const [searchTitle, setsearchTitle] = useState(null);
  const [searchEventresult, getsearchEvent] = useState([]);
  const [sResult, setsResult] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:4000/profile", {
          withCredentials: true,
        })
        .then((response) => {
          setUid(response.data.id);
        })
        .catch(async (err) => {
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const code = urlParams.get("code");
          try {
            const response = await axios.get(
              "http://localhost:4000/linkedinauth?code=" + code,
              {
                withCredentials: true,
              }
            );
            fetchData();
            window.location.reload();
          } catch (error) {
            console.log(error);
          }
          if (code == "") window.location.href = "/auth";
        });
    }
    fetchData();
    fetch("http://localhost:4000/getpost").then((response) => {
      response.json().then((posts) => {
        setposts(posts);
      });
    });
    fetch("http://localhost:4000/getquote").then((response) => {
      response.json().then((quotes) => {
        setquotes(quotes);
      });
    });
    fetch("http://localhost:4000/getevent").then((response) => {
      response.json().then((Event) => {
        getEvent(Event);
      });
    });
  }, []);

  async function searchEvent() {
    await axios
      .get("http://localhost:4000/search?key=" + searchTitle)
      .then((response) => {
        setsResult(true);
        getsearchEvent(response.data);
      });
  }

  return (
    <div className="bgColor">
      <Box pt={20}>
        <Grid templateColumns="repeat(5, 1fr)" gap={3}>
          <GridItem colSpan={1} h="auto">
            <Box
              position={"fixed"}
              bg={useColorModeValue("white", "gray.900")}
              boxShadow={"2xl"}
              rounded={"md"}
              width={"375px"}
              minHeight={"87vh"}
              maxHeight={"87vh"}
              p={15}
              mt={5}
              ml={5}
              overflowY="auto"
              __css={{
                "&::-webkit-scrollbar": {
                  w: "2",
                },
                "&::-webkit-scrollbar-track": {
                  w: "6",
                },
                "&::-webkit-scrollbar-thumb": {
                  borderRadius: "10",
                  bg: `gray.100`,
                },
              }}
            >
              <HStack justify={"space-between"}>
                <Text color={"gray.600"} fontWeight={"bold"} mb={5}>
                  Motivational Quotes
                </Text>
                <AddQuotebutton></AddQuotebutton>
              </HStack>
              <div>
                {quotes.map((quote) => (
                  <GroupCard {...quote} />
                ))}
              </div>
            </Box>
          </GridItem>
          <GridItem colSpan={3} h="auto">
            {posts.length > 0 ? (
              <div>
                {posts.length > 0 &&
                  posts.map((post) => <Post {...post} uid={uid} />).reverse()}
              </div>
            ) : (
              <Box>
                <SkeletonPost />
              </Box>
            )}
          </GridItem>
          <GridItem colStart={5} colEnd={6}>
            <Stack position={"fixed"}>
              <Box
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"md"}
                width={"350px"}
                maxHeight={"400px"}
                p={15}
                mt={5}
                overflowY="auto"
                __css={{
                  "&::-webkit-scrollbar": {
                    w: "2",
                  },
                  "&::-webkit-scrollbar-track": {
                    w: "6",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    borderRadius: "10",
                    bg: `gray.100`,
                  },
                }}
              >
                <HStack justify={"space-between"} paddingBottom={"10px"}>
                  <Text color={"gray.600"} fontWeight={"bold"}>
                    Events
                  </Text>
                  <InputGroup width={"200px"} size="sm">
                    <Input
                      variant="filled"
                      focusBorderColor="green.300"
                      placeholder="Search Events"
                      rounded={"full"}
                      onChange={(ev) => setsearchTitle(ev.target.value)}
                    />
                    <InputRightElement>
                      <IconButton
                        onClick={searchEvent}
                        icon={<BiSearch />}
                        rounded={"full"}
                        bgColor={"green.500"}
                        color={"white"}
                      />
                    </InputRightElement>
                  </InputGroup>
                </HStack>
                {sResult ? (
                  <div>
                    <VStack>
                      <Text fontStyle={"italic"} fontWeight={"bold"}>
                        Search Results
                      </Text>
                      {searchEventresult.length > 0 &&
                        searchEventresult
                          .map((post) => <EventTile {...post} uid={uid} />)
                          .reverse()}
                    </VStack>
                  </div>
                ) : (
                  <div>
                    {Event.length > 0 &&
                      Event.map((post) => (
                        <EventTile {...post} uid={uid} />
                      )).reverse()}
                  </div>
                )}
              </Box>
            </Stack>
          </GridItem>
        </Grid>
      </Box>
    </div>
  );
}
