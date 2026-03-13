import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx'
import CountryDetails from './components/CountryDetails.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:countryName",
    element: <CountryDetails />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}></RouterProvider>,
)
