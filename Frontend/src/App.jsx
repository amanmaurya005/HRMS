// import {createBrowserRouter, RouterProvider} from "react-router-dom"
// import HeroSection from "./pages/HeroSection.jsx"
// // import Register from "./pages/Register.jsx"
// import First from "./pages/First.jsx"
// import Login from "./pages/Login.jsx"
// import ProtectedRoute from "./components/ProtectedRoute.jsx"

// const router=createBrowserRouter([
//   {
//     path:"/",
//     element:<First />,
//     children:[
//       {
//         index:true,
//         element:(
//           <ProtectedRoute>
//             <HeroSection />
//           </ProtectedRoute>
//         )
//       },
//       {
//         path:'/login',
//         element:<Login />
//       },
//       // {
//       //   path:"register",
//       //   element:<Register />
//       // },
      
//     ]
//   }
// ])

// export default function App(){
//   return <RouterProvider router={router} />
// }


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeroSection from "./pages/HeroSection.jsx";
import First from "./pages/First.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import AllEmployees from "./pages/AllEmployee.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";
import AddDepartment from "./pages/AddDepartment.jsx";
import Attendance from "./pages/Attendance.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        element: (
          <ProtectedRoute>
            <HeroSection />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <DashBoard />,
          },
          {
            path: "/dashboard",
            element: <DashBoard />,
          },
          {
            path: "/employees",
            element: <AllEmployees />,
          },
          {
            path: "/add-employee",
            element: <AddEmployee />,
          },
          {
            path: "/add-department",
            element: <AddDepartment />,
          },
          {
            path: "/attendance",
            element: <Attendance />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
