import { useEffect, useState } from "react";
import axios from "axios";
import instance from "../axiosConfig";
import { Link } from "react-router-dom"

export default function AddEmployee() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    employeeId: "",
    employeeEmail: "",
    employeeName: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await instance.get(
        "/department/get"
      );
      setDepartments(res.data);
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await instance.post(
        "/employees/add",
        form
      );

      setMessage(res.data.message);
      setForm({
        employeeId: "",
        employeeEmail: "",
        employeeName: "",
        department: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

    <div>


    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Add Employee</h2>

      {message && (
        <p className="mb-3 text-sm text-green-600">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          type="email"
          name="employeeEmail"
          placeholder="Employee Email"
          value={form.employeeEmail}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          type="text"
          name="employeeName"
          placeholder="Employee Name"
          value={form.employeeName}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />

        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="">Select Department</option>
          {departments.map((dep) => (
            <option key={dep._id} value={dep._id}>
              {dep.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>

    <Link to="/add-department"><button>Add Department</button></Link>
    </div>
    </>
  );
}
