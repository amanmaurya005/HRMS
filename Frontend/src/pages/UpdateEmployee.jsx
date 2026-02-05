import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../axiosConfig";

export default function UpdateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    employeeEmail: "",
    department: "",
  });

  // 1️⃣ Fetch employee data
  const fetchEmployee = async () => {
    try {
      const res = await instance.get("/employees/get");
      const employee = res.data.find((emp) => emp._id === id);

      if (!employee) {
        alert("Employee not found");
        return navigate("/employees");
      }

      setFormData({
        employeeId: employee.employeeId,
        employeeName: employee.employeeName,
        employeeEmail: employee.employeeEmail,
        department: employee.department?._id || "",
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Failed to load employee");
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  // 2️⃣ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3️⃣ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await instance.put(`/employees/edit/${id}`, formData);
      alert("Employee updated successfully");
      navigate("/employees");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  if (loading) return <p>Loading employee...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-5">Update Employee</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Employee ID"
          required
        />

        <input
          type="text"
          name="employeeName"
          value={formData.employeeName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Employee Name"
          required
        />

        <input
          type="email"
          name="employeeEmail"
          value={formData.employeeEmail}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Employee Email"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
}
