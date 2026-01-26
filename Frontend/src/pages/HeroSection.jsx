// import { useState } from "react";
// import AllEmployee from "./AllEmployee";
// import DashBoard from "./DashBoard";
// import Attendance from "./Attendance";
// import AddEmployee from "./AddEmployee";

// export default function HeroSection() {
//   const [active, setActive] = useState("dashboard");

//   const renderComponent = () => {
//     switch (active) {
//       case "employees":
//         return <AllEmployee />;
//       case "add":
//         return <AddEmployee />;
//       case "attendance":
//         return <Attendance />;
//       default:
//         return <DashBoard />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r p-5">
//         <h1 className="text-xl font-bold text-blue-600 mb-6">
//           HRMS Lite
//         </h1>

//         <nav className="space-y-2">
//           <NavItem
//             label="Dashboard"
//             active={active === "dashboard"}
//             onClick={() => setActive("dashboard")}
//           />
//           <NavItem
//             label="All Employees"
//             active={active === "employees"}
//             onClick={() => setActive("employees")}
//           />
//           <NavItem
//             label="Add Employees"
//             active={active === "add"}
//             onClick={() => setActive("add")}
//           />
//           <NavItem
//             label="Attendance"
//             active={active === "attendance"}
//             onClick={() => setActive("attendance")}
//           />
//         </nav>
//       </aside>

//       {/* Right Side Content */}
//       <main className="flex-1 p-8">
//         {renderComponent()}
//       </main>
//     </div>
//   );
// }

// function NavItem({ label, active, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`px-4 py-2 rounded-lg cursor-pointer font-medium
//         ${
//           active
//             ? "bg-blue-100 text-blue-600"
//             : "text-gray-600 hover:bg-gray-100"
//         }`}
//     >
//       {label}
//     </div>
//   );
// }


import { Outlet, NavLink } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-5">
        <h1 className="text-xl font-bold text-blue-600 mb-6">
          HRMS Lite
        </h1>

        <nav className="space-y-2">
          <SideLink to="/dashboard" label="Dashboard" />
          <SideLink to="/employees" label="All Employees" />
          <SideLink to="/add-employee" label="Add Employee" />
          <SideLink to="/add-department" label="Add Department" />
          <SideLink to="/attendance" label="Attendance" />
        </nav>
      </aside>

      {/* Right Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

function SideLink({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg font-medium ${
          isActive
            ? "bg-blue-100 text-blue-600"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
