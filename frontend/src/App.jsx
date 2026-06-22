import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '*',
    // need to modify this (recommend to creat a component for this)
    element: <p>Page not fount</p>,
  },
]);

function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
