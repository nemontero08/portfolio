import React from 'react';
import ReactDOM from 'react-dom/client';
import { Portfolio } from './Portfolio';
import './styles/main.scss';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Portfolio/>
  </React.StrictMode>
);

