import "./App.css";
import AuthPage from "./pages/AuthPage";
import { Route, Routes } from "react-router-dom";
import PageFeed from "./pages/HomePage";
import Events from "./pages/EventsPage";
import ShowEventDetails from "./pages/EventDetailsCard";
import Layout from "./components/Layout";
import IntroPage from "./pages/IntroPage";
import AboutUS from "./pages/AboutUs";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" index element={<IntroPage />}></Route>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route element={<Layout />}>
          <Route path="/pagefeed" element={<PageFeed />}></Route>
          <Route path="/events" element={<Events />}></Route>
          <Route path="/aboutus" element={<AboutUS />}></Route>
          <Route path="/eventdetails/:id" element={<ShowEventDetails />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
