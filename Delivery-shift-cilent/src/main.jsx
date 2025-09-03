import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

import { RouterProvider } from "react-router";
import { router } from './router/router.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist'>
      <QueryClientProvider client={queryClient}>
           <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)
