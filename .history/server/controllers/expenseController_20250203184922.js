import { Expense } from "../model/Expense.js";
import { validateExpense } from "../utils/validation.js";

export const createExpense = async (req, res) => {
  try {
    // Validate input
    const { error } = validateExpense(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { amount, category, date, description } = req.body;
    const expense = new Expense({
      user: req.user.id,
      amount,
      category,
      date: date || Date.now(),
      description,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating expense", error: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, startDate, endDate } = req.query;

    const filter = { user: req.user.id };
    if (category) filter.category = category;
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const expenses = await Expense.find(filter)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Expense.countDocuments(filter);

    res.json({
      expenses,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching expenses", error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate input
    const { error } = validateExpense(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { amount, category, date, description } = req.body;

    const expense = await Expense.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { amount, category, date, description },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(expense);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating expense", error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting expense", error: error.message });
  }
};

export const getSpendingInsights = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const insights = await Expense.aggregate([
      {
        $match: {
          user: req.user._id,
          ...dateFilter,
        },
      },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          category: "$_id",
          totalAmount: 1,
          count: 1,
          _id: 0,
        },
      },
      { $sort: { totalAmount: -1 } },
    ]);

    const totalSpending = insights.reduce(
      (sum, cat) => sum + cat.totalAmount,
      0
    );

    const categoriesWithPercentage = insights.map((category) => ({
      ...category,
      percentage: totalSpending
        ? ((category.totalAmount / totalSpending) * 100).toFixed(2)
        : 0,
    }));

    res.json(categoriesWithPercentage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating insights", error: error.message });
  }
};
