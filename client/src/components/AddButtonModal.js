import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalCloseButton,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import CreateEventDrawer from "./CreateEventDrawer";
import CreatePostDrawer from "./CreatePostDrawer";
export default function AddButtonModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        mr={5}
        onClick={onOpen}
        w={"250px"}
        rightIcon={<BiPlus />}
        colorScheme="green"
        variant="solid"
      >
        Add New
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack pb={"20px"}>
              <CreatePostDrawer />
              <CreateEventDrawer />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
