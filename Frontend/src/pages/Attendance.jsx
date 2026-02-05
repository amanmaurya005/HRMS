import { useEffect, useState } from "react";
import instance from "../axiosConfig";

export default function Attendance() {
  // =========================
  // COMMON STATE
  // =========================
  const [employees, setEmployees] = useState([]);
  const [success, setSuccess] = useState("");

  // =========================
  // MARK ATTENDANCE STATE
  // =========================
  const [form, setForm] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

  // =========================
  // HISTORY STATE
  // =========================
  const [historyEmployee, setHistoryEmployee] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [records, setRecords] = useState([]);
  const [totalPresent, setTotalPresent] = useState(0);

  // =========================
  // FETCH EMPLOYEES
  // =========================
  const fetchEmployees = async () => {
    try {
      const res = await instance.get("/employees/get");
      setEmployees(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // =========================
  // MARK ATTENDANCE
  // =========================
  const submitAttendance = async (e) => {
    e.preventDefault();

    try {
      await instance.post("/attendance/mark", form);
      setSuccess("Attendance marked successfully");

      // refresh history if same employee selected
      if (historyEmployee === form.employee) {
        fetchHistory();
      }

      setTimeout(() => setSuccess(""), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // FETCH HISTORY
  // =========================
  const fetchHistory = async () => {
    if (!historyEmployee || !fromDate || !toDate) return;

    try {
      const res = await instance.get(
        `/attendance/history?employee=${historyEmployee}&from=${fromDate}&to=${toDate}`
      );

      setRecords(res.data.records);
      setTotalPresent(res.data.totalPresent);
    } catch (error) {
      console.error(error);
    }
  };

 useEffect(() => {
  if (historyEmployee) {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

    setFromDate(firstDay.toISOString().split("T")[0]);
    setToDate(today.toISOString().split("T")[0]);
  }
}, [historyEmployee]);

  useEffect(() => {
    fetchHistory();
  }, [fromDate, toDate]);

  // =========================
  // UI
  // =========================
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">
        Attendance Management
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* ================= LEFT CARD ================= */}
        <div className="bg-white border rounded-xl p-5">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            📅 Mark Attendance
          </h3>

          {success && (
            <div className="bg-green-100 text-green-700 p-2 rounded mb-3">
              {success}
            </div>
          )}

          <form onSubmit={submitAttendance} className="space-y-4">
            {/* Employee */}
            <div>
              <label className="text-sm font-medium">Employee</label>
              <select
                className="border p-2 w-full rounded mt-1"
                required
                onChange={(e) =>
                  setForm({ ...form, employee: e.target.value })
                }
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.employeeName} ({emp.employeeId})
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                className="border p-2 w-full rounded mt-1"
                required
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium">Status</label>
              <select
                className="border p-2 w-full rounded mt-1"
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <option>Present</option>
                <option>Absent</option>
                <option>Half Day</option>
                <option>WFH</option>
                <option>Leave</option>
              </select>
            </div>

            <button className="bg-blue-600 text-white w-full py-2 rounded">
              Save Record
            </button>
          </form>
        </div>

        {/* ================= RIGHT CARD ================= */}
        <div className="bg-white border rounded-xl p-5">
          <h3 className="font-semibold mb-3">View History</h3>

          {/* Select Employee */}
          <label className="text-sm font-medium">
            Select Employee to View
          </label>
          <select
            className="border p-2 w-full rounded mt-1 mb-3"
            value={historyEmployee}
            onChange={(e) => setHistoryEmployee(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.employeeName} ({emp.employeeId})
              </option>
            ))}
          </select>

          {/* BEFORE SELECTION */}
          {!historyEmployee && (
            <p className="text-gray-500 text-sm text-center py-10">
              Select an employee to view history.
            </p>
          )}

          {/* AFTER SELECTION */}
          {historyEmployee && (
            <>
              {/* Date Filters */}
              <div className="flex gap-2 mb-3">
                <input
                  type="date"
                  className="border p-2 rounded w-full"
                  onChange={(e) => setFromDate(e.target.value)}
                />
                <input
                  type="date"
                  className="border p-2 rounded w-full"
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              {/* Total Present */}
              <p className="font-medium mb-2">
                Total Present Days:{" "}
                <span className="text-green-600">
                  {totalPresent}
                </span>
              </p>

              {/* Records */}
              {records.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No attendance records found.
                </p>
              ) : (
                <ul className="space-y-2">
                  {records.map((r) => (
                    <li
                      key={r._id}
                      className="flex justify-between border-b pb-1"
                    >
                      <span>
                        {new Date(r.date).toLocaleDateString()}
                      </span>
                      <span
                        className={`flex items-center gap-1 ${
                          r.status === "Present"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {r.status === "Present" ? "✔" : "✖"}{" "}
                        {r.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
