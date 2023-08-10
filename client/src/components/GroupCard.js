import { Box, Text, useColorModeValue, VStack } from "@chakra-ui/react";

export default function GroupCard({ quote, author }) {
  return (
    <>
      <Box
        h={"120px"}
        bg={useColorModeValue("#f2f3f8", "gray.900")}
        boxShadow={"2xs"}
        rounded={"md"}
        p={"10px"}
        mt={2}
        mb={2}
        overflow={"hidden"}
        justifyItems={"center"}
      >
        <VStack>
          <Text fontWeight={"bold"}>"{quote}"</Text>
          <Text fontStyle={"italic"}>- {author}</Text>
        </VStack>
      </Box>
    </>
  );
}
