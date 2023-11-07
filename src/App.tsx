import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RateList from "./pages/rateList";
import ConvertCurrency from "./pages/convertCurrency";
import RatesHistory from "./pages/RatesHistory";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RateList />,
    },
    {
      path: "/ConvertCurrency",
      element: <ConvertCurrency />,
    },
    {
      path: "/RatesHistory",
      element: <RatesHistory />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
