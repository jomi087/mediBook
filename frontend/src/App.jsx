import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Layout from './layouts/Layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/doctors', element: <Doctors /> },
      { path: '/doctors/:speciality', element: <Doctors /> },
      { path: '/login', element: <Login /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/my-profile', element: <MyProfile /> },
      { path: '/my-appointments', element: <MyAppointments /> },
      { path: '*', element: <p>Page Not Found</p> },
    ],
  },
  {},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
