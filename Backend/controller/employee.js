import Employee from "../model/employee.js";

/**
 * @desc Add Employee
 * @route POST /api/employees
 */
export const addEmployee = async (req, res) => {
  try {
    const { employeeId, employeeEmail, employeeName, department } = req.body;

    if (!employeeId || !employeeEmail || !employeeName || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const employee = await Employee.create({
      employeeId,
      employeeEmail,
      employeeName,
      department, // department ID
    });

    res.status(201).json({
      message: "Employee added successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Get All Employees with Department
 * @route GET /api/employees
 */
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("department", "name") // only department name
      .sort({ createdAt: -1 });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Employee.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    ).populate("department", "name");

    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      message: "Employee updated successfully",
      employee: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE employee
 */
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Employee.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};