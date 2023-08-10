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
  IconButton,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
export default function AddQuotebutton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [quote, setQuote] = useState("");
  const [quoteAuthor, setquoteAuthor] = useState("");

  async function createNewQuote(ev) {
    ev.preventDefault();

    axios
      .post(
        "http://localhost:4000/newquote",
        {
          quote: quote,
          author: quoteAuthor,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast({
            title: "Quote Added",
            description: "We've created new quote",
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
          description: "Error Uploading new Quote",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }
  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={<BiPlus />}
        bgColor={"green.400"}
        color={"white"}
      ></IconButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post New Quote</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl onSubmit={createNewQuote} isRequired>
              <Stack pb={"20px"}>
                <FormLabel>Quote (Max 100)</FormLabel>
                <Input
                  maxLength={100}
                  value={quote}
                  onChange={(ev) => setQuote(ev.target.value)}
                />
                <FormLabel>Author</FormLabel>
                <Input
                  value={quoteAuthor}
                  onChange={(ev) => setquoteAuthor(ev.target.value)}
                />
              </Stack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
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
              onClick={createNewQuote}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
