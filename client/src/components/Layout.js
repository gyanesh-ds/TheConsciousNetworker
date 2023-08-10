
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <>
    <Box><Header /></Box>
      <Outlet />
    </>
  );
}
