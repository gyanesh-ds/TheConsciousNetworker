import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Stack,
  Box,
  Textarea,
  FormLabel,
  Select,
  Input,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

export default function CreateEventDrawer() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [files, setfiles] = useState("");
  const [usereventname, setusereventname] = useState("");
  const [usereventdescription, setusereventdescription] = useState("");
  const [usereventlocation, setusereventlocation] = useState("");
  const [usereventtime, setusereventtime] = useState("");
  const [usereventorggmail, setusereventorggmail] = useState("");
  const [usereventorgname, setusereventorgname] = useState("");
  const [usereventlean, setusereventlearn] = useState("");
  const [usereventlanguage, setusereventlanguage] = useState("");
  const [userevententryage, setuserevententryage] = useState("");
  const [usereventduration, setusereventduration] = useState("");
  const [usereventcategory, setusereventcategory] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setfiles(base64);
  };
  async function createNewEvent(ev) {
    ev.preventDefault();

    axios
      .post(
        "http://localhost:4000/newevent",
        {
          usereventname: usereventname,
          usereventdescription: usereventdescription,
          image: files,
          usereventlocation: usereventlocation,
          usereventtime: usereventtime,
          usereventorggmail: usereventorggmail,
          usereventorgname: usereventorgname,
          usereventlean: usereventlean,
          usereventlanguage: usereventlanguage,
          userevententryage: userevententryage,
          usereventduration: usereventduration,
          usereventcategory: usereventcategory,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast({
            title: "Event Created",
            description: "We've created new event",
            status: "success",
            duration: 5000,
            isClosable: true,
          });

          setTimeout(() => {
            onClose();
          }, 5000);
        } else {
        }
      })
      .catch((err) => {
        toast({
          title: "Error ",
          description: "Error Uploading new Post",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileRead = new FileReader();
      fileRead.readAsDataURL(file);
      fileRead.onload = () => {
        resolve(fileRead.result);
      };
      fileRead.onerror = (error) => {
        reject(error);
      };
    });
  }
  return (
    <>
      <Button variant={"solid"} colorScheme="green" onClick={onOpen}>
        Create New Event
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a New Event
          </DrawerHeader>

          <DrawerBody>
            <FormControl onSubmit={createNewEvent} isRequired>
              <Stack spacing="24px">
                <Box>
                  <FormLabel>Event Name</FormLabel>
                  <Input
                    type="usereventname"
                    value={usereventname}
                    onChange={(ev) => setusereventname(ev.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Event Image</FormLabel>
                  <Input type="file" onChange={(ev) => handleFileUpload(ev)} />
                </Box>

                <Box>
                  <FormLabel htmlFor="owner">Category</FormLabel>
                  <Select
                    id="owner"
                    defaultValue="segun"
                    placeholder="Select Category"
                    value={usereventcategory}
                    type="text"
                    onChange={(ev) => setusereventcategory(ev.target.value)}
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </Select>
                </Box>

                <Box>
                  <FormLabel>Event Description</FormLabel>
                  <Textarea
                    type="text"
                    value={usereventdescription}
                    onChange={(ev) => setusereventdescription(ev.target.value)}
                  ></Textarea>
                </Box>
                <Box>
                  <FormLabel>What will you learn?</FormLabel>
                  <Textarea
                    type="text"
                    value={usereventlean}
                    onChange={(ev) => setusereventlearn(ev.target.value)}
                  ></Textarea>
                </Box>
                <Box>
                  <FormLabel>Event Organizer Name</FormLabel>
                  <Input
                    style={{ marginBottom: "4%" }}
                    value={usereventorgname}
                    type="text"
                    onChange={(ev) => setusereventorgname(ev.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Event Organizer Email address</FormLabel>
                  <Input
                    style={{ marginBottom: "4%" }}
                    type="email"
                    value={usereventorggmail}
                    onChange={(ev) => setusereventorggmail(ev.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Key Details</FormLabel>
                  <Input
                    style={{ marginBottom: "4%" }}
                    placeholder="language"
                    value={usereventlanguage}
                    type="email"
                    onChange={(ev) => setusereventlanguage(ev.target.value)}
                  />
                  <Input
                    style={{ marginBottom: "4%" }}
                    placeholder="age"
                    type="email"
                    value={userevententryage}
                    onChange={(ev) => setuserevententryage(ev.target.value)}
                  />
                  <Input
                    style={{ marginBottom: "4%" }}
                    placeholder="duration"
                    type="email"
                    value={usereventduration}
                    onChange={(ev) => setusereventduration(ev.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Event Location</FormLabel>
                  <Input
                    type="name"
                    onChange={(ev) => setusereventlocation(ev.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Event Time</FormLabel>
                  <Input
                    type="datetime-local"
                    onChange={(ev) => setusereventtime(ev.target.value)}
                  />
                </Box>
              </Stack>
            </FormControl>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              variant={"solid"}
              colorScheme={"red"}
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant={"solid"}
              colorScheme={"green"}
              onClick={createNewEvent}
            >
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
