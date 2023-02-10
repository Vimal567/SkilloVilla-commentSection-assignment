import Landingpage from "./Components/Landingpage";
import GettingStarted from "./Components/GettingStarted";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GettingStarted />,
  },
  {
    path: "/comments",
    element: <Landingpage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
