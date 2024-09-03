import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Chat from './Components/Chat';
import Messenger from './Components/Messenger';
import Em from '../Em';
// import reportWebVitals from reportWebVitals;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/chat",
    element: <Chat/>,
  },
  {
    path:"/mainPage",
    element:<Messenger/>

  },
  {
    path:"/em",
    element:<Em/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);
// reportWebVitals();