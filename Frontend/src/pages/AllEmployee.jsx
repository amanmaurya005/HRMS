import { useEffect, useState } from "react";
import axios from "axios";
import instance from "../axiosConfig";
import { Link } from "react-router-dom";

export default function AllEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    const res = await instance.get(
      "/employees/get"
    );
    setEmployees(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    await instance.delete(
      `/employees/delete/${id}`
    );

    fetchEmployees();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Employees</h2>
        <Link to="/add-employee"><button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add Employee
        </button></Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border p-4">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Department</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp._id}
                className="border-b last:border-none"
              >
                <td className="p-3">{emp.employeeId}</td>
                <td className="p-3">{emp.employeeName}</td>
                <td className="p-3">{emp.employeeEmail}</td>
                <td className="p-3">
                  {emp.department?.name}
                </td>
                <td className="p-3 space-x-3">
                  <Link to={`/update-employee/${emp._id}`}>
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteEmployee(emp._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {employees.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No employees found
          </p>
        )}
      </div>
    </div>
  );
}
