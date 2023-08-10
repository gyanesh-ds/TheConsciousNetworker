import { Center, Skeleton, Stack } from "@chakra-ui/react";

export default function SkeletonPost() {
  return (
    <Stack ml={"88px"} mt={"22px"}>
      <Skeleton
        height="350px"
        maxW={"1000px"}
        boxShadow={"2xl"}
        mb={"20px"}
        rounded={"md"}
      />
      <Skeleton
        height="350px"
        maxW={"1000px"}
        boxShadow={"2xl"}
        mb={"20px"}
        rounded={"md"}
      />
      <Skeleton
        height="350px"
        maxW={"1000px"}
        boxShadow={"2xl"}
        mb={"20px"}
        rounded={"md"}
      />
    </Stack>
  );
}
