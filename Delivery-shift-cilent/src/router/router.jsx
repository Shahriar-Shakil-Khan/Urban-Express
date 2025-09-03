import { createBrowserRouter} from "react-router";
import RootLayout from '../layouts/RootLayout'
import Home from '../pages/Home/Home/Home'
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import ParcelSend from "../pages/ParcelSend/ParcelSend";
import PrivateRoute from "../routes/PrivateRoute"
import DashboardLayout from "../layouts/DashboardLayout";
import Myparcels from "../pages/Dashboard/Myparcels/Myparcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import AssignRider from "../pages/Dashboard/assignRider/assignRider";
import RiderRoute from "../routes/RiderRoute";
import PendingDeliveries from "../pages/Dashboard/PendingDeliveries/PendingDeliveries";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import MyEarnings from "../pages/Dashboard/MyEarnings/MyEarnings";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Profile from "../pages/Dashboard/Profile/Profile";
import AboutUs from "../pages/AboutUs/AboutUs";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
      {
       index: true,
       Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch('./warehouses.json')
      },
      {
        path:'ParcelSend',
        element: <PrivateRoute><ParcelSend /></PrivateRoute>,
        loader: () => fetch('./warehouses.json')
      },
      {
        path: "beARider",
        element: <PrivateRoute><BeARider /></PrivateRoute>,
        loader: () => fetch('./warehouses.json')
      },
      {
        path: "forbidden",
        element: <Forbidden></Forbidden>
      },
      {
        
        path: "about", 
        Component: AboutUs
      
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      }
    ]
  },
  {
     path: "/dashboard",
     element:<PrivateRoute> <DashboardLayout />
     </PrivateRoute>,
     children:[

      {
          index: true,
          Component:DashboardHome,
      },

      {
         path:"myParcels",
         Component: Myparcels

      },
      {
        path:'payment/:parcelId',
        Component: Payment
      },
      {
        path:'paymentHistory',
        Component: PaymentHistory
      },
      {
        path:'track',
        Component: TrackParcel
      },
      {
            path:'pendingDeliveries',
            element:<RiderRoute> <PendingDeliveries></PendingDeliveries> </RiderRoute>,
      },
      {
            path:'completedDeliveries',
            element:<RiderRoute> <CompletedDeliveries></CompletedDeliveries> </RiderRoute>,
      },
      {
           path:'myEarnings',
           element:<RiderRoute> <MyEarnings></MyEarnings> </RiderRoute>
      },
      {
        path:'pendingRiders',
        
        element:<AdminRoute> <PendingRiders></PendingRiders> </AdminRoute>,
      },
      {
        path:'activeRiders',
        
        element:<AdminRoute> <ActiveRiders></ActiveRiders> </AdminRoute>,
      },
      {
        path:'assignRider',
        
        element:<AdminRoute> <AssignRider></AssignRider>  </AdminRoute>,
      },
      {
        path:'makeAdmin',
        
        element:<AdminRoute> <MakeAdmin></MakeAdmin>  </AdminRoute>,
      },
      {
        path: 'profile',
        Component: Profile
      }
     ]
  }
]);