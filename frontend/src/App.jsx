import React from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const App = () => {
  return (
    <div className="">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;