import { useState, useEffect } from "react";
import { Box, Center, SimpleGrid } from "@chakra-ui/react";
import Events from "../components/EventCard";
import SpinnerLoading from "../components/SpinnerLoading";
import axios from "axios";

export default function EventPage() {
  const [Event, getEvent] = useState([]);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:4000/profile", {
          withCredentials: true,
        })
        .then((response) => {
          setUid(response.data.id);
        })
        .catch((err) => {
          window.location.href = "/auth";
        });
    }
    fetchData();
    fetch("http://localhost:4000/getevent").then((response) => {
      response.json().then((Event) => {
        getEvent(Event);
      });
    });
  }, []);

  return (
    <div className="bgColor">
      <Box pt={"20"} h={"100vh"}>
        {Event.length > 0 ? (
          <>
            {Event.length > 0 && (
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                spacing="6"
                marginTop="1%"
                marginLeft="3%"
                marginRight="3%"
                marginBottom="1%"
              >
                {Event.map((event) => (
                  <Events {...event} uid={uid} />
                )).reverse()}
              </SimpleGrid>
            )}
          </>
        ) : (
          <Box h={"100vh"} py={380}>
            <Center>
              <SpinnerLoading />
            </Center>
          </Box>
        )}
      </Box>
    </div>
  );
}
