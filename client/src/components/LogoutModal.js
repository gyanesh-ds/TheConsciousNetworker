import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalCloseButton,
  Avatar,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
export default function LogoutModaal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userPic, setUserpic] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:4000/profile", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data != null) {
            setUserpic(response.data.upic);
          }
        });
    }
    fetchData();
  }, []);
  function logout() {
    axios
      .get("http://localhost:4000/logout", { withCredentials: true })
      .then((res) => (window.location.href = "/"));
  }
  return (
    <>
      <Avatar src={userPic} alt={"Author"} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile Options</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Button variant={"solid"} colorScheme={"red"} onClick={logout}>
                Logout
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
