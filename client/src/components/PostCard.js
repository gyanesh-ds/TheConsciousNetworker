import {
  Image,
  Heading,
  Text,
  Avatar,
  Box,
  Center,
  Stack,
  useColorModeValue,
  Flex,
  IconButton,
  Badge,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiLike, BiShareAlt } from "react-icons/bi";

export default function Post({
  _id,
  title,
  description,
  category,
  authorname,
  authorpic,
  image,
  createdAt,
  uid,
}) {
  const [likeStatus, setLikeStatus] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function checkLike() {
      await axios
        .post("http://localhost:4000/checklike", {
          pid: _id,
          uid: uid,
        })
        .then((response) => {
          if (response.data != null) {
            setLikeStatus(true);
          } else {
            setLikeStatus(false);
          }
        });
    }

    checkLike();
  }, []);
  async function newLike() {
    await axios
      .post("http://localhost:4000/likedislike", { pid: _id, uid: uid })
      .then((response) => {
        if (response.status === 200) {
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast({
      title: "Copied Link",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  }

  return (
    <>
      <Center py={6}>
        <Box
          maxW={"1000px"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          h={"350px"}
          w={"100%"}
          p={6}
          overflow={"hidden"}
        >
          <Flex w={"100%"}>
            <Box
              h={"300px"}
              w={"300px"}
              bg={"gray.100"}
              rounded={"md"}
              boxShadow={"2xl"}
            >
              <Image
                h={"300px"}
                w={"500px"}
                maxW={"300px"}
                rounded={"md"}
                src={image}
                alt="Post-Image"
                objectFit="cover"
                alignItems="center"
                mx={"auto"}
              />
            </Box>
            <Box w={"100%"} paddingStart={10}>
              <Flex gap={24} direction={"column"} w={"100%"}>
                <Stack h={"80%"}>
                  <Badge colorScheme="green" width={"min-content"}>
                    {category}
                  </Badge>
                  <Heading
                    color={useColorModeValue("gray.700", "white")}
                    fontSize={"2xl"}
                    fontFamily={"body"}
                  >
                    {title}
                  </Heading>
                  <Text color={"gray.500"} noOfLines={4} h={"90px"}>
                    {description}
                  </Text>
                </Stack>
                <Stack direction={"row"} justify={"space-between"}>
                  <Stack direction={"row"} spacing={4} align={"center"}>
                    <Avatar
                      src={authorpic}
                      alt={"Author"}
                      position={"-moz-initial"}
                    />
                    <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                      <Text fontWeight={600}>{authorname}</Text>
                      <Text color={"gray.500"}>{createdAt.slice(0, 10)}</Text>
                    </Stack>
                  </Stack>
                  <Stack direction={"row"} align={"center"}>
                    {likeStatus ? (
                      <IconButton
                        icon={<BiLike />}
                        onClick={newLike}
                        colorScheme={"red"}
                        position={"-moz-initial"}
                      ></IconButton>
                    ) : (
                      <IconButton
                        icon={<BiLike />}
                        onClick={newLike}
                        position={"-moz-initial"}
                      ></IconButton>
                    )}

         
                    <IconButton
                      icon={<BiShareAlt />}
                      onClick={copy}
                      position={"-moz-initial"}
                    ></IconButton>
                  </Stack>
                </Stack>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Center>
    </>
  );
}
