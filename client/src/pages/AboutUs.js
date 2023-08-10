import { Image } from "@chakra-ui/react";
import background from "../pages/aboutus.png";

export default function AboutUs() {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          //backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "1px solid red",
          margin: "auto",
          filter: "brightness(0.4)", // Adjust the value to make it more or less dull (0.5 for 50% brightness)
        }}
      ></div>
      <div
        style={{
          position: "relative",
          zIndex: 1,

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "black",
          padding: "10px",
          textAlign: "center",
          height: "100%",
        }}
      >
        <h1 style={{ fontSize: "52px", paddingBottom: "4%" }}>About Us</h1>
        <p style={{ marginLeft: "3%", marginRight: "3%", fontSize: "20px" }}>
          We are dedicated to offering a secure and welcoming environment on our
          social media platform so that people can interact, develop, and
          practice mindfulness daily. Our platform provides various resources,
          such as inspirational content, guided meditations, and a welcoming
          community of like-minded people. We work to make mindfulness
          accessible to everyone, regardless of background or level of
          experience, because we believe it is crucial for well-being. In
          addition to our online community, we also have an events section where
          we organise retreats and online workshops for personality development
          to help people practice mindfulness and build profound connections
          with others. Our events are led by seasoned mindfulness practitioners
          and cover a variety of topics, such as stress management and self-care
          as well as topics like compassion and gratitude. Join us and be a part
          of a group that believes in the power of connection, conscious living,
          and personal development. Our platform and events provide the tools
          and support you need to cultivate a more mindful and fulfilling life,
          whether you are an experienced practitioner of mindfulness or are just
          beginning your journey.
        </p>
      </div>
    </div>
  );
}
