import Attendance from "../model/attendance.js";

/**
 * MARK OR UPDATE ATTENDANCE
 */
export const markAttendance = async (req, res) => {
  try {
    const { employee, date, status } = req.body;

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    const record = await Attendance.findOneAndUpdate(
      { employee, date: selectedDate },
      { status },
      { upsert: true, new: true }
    );

    res.json({
      message: "Attendance saved",
      record,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ATTENDANCE HISTORY
 */
export const getAttendanceHistory = async (req, res) => {
  try {
    const { employee, from, to } = req.query;

    // 🛑 SAFETY CHECK
    if (!employee) {
      return res.status(400).json({ message: "Employee is required" });
    }

    const records = await Attendance.find({
      employee: employee,   // ✅ STRICT FILTER
      date: {
        $gte: new Date(from),
        $lte: new Date(to),
      },
    }).sort({ date: -1 });

    const totalPresent = records.filter(
      (r) => r.status === "Present"
    ).length;

    res.json({
      employee,        // helps debugging
      totalPresent,
      records,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

