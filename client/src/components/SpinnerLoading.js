import { Spinner } from "@chakra-ui/react";

export default function SpinnerLoading() {
  return (
    <Spinner
      thickness="4px"
      speed="0.45s"
      emptyColor="gray.200"
      color="green.500"
      size="xl"
      w={"100px"}
      h={"100px"}
    />
  );
}
