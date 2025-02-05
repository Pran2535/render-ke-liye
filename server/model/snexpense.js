import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be a positive number"],
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: ["Food", "Travel", "Entertainment", "Utilities", "Other"],
        message: "{VALUE} is not a valid category",
      },
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
      max: [Date.now, "Date cannot be in the future"],
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual to format amount
ExpenseSchema.virtual("formattedAmount").get(function () {
  return this.amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
});

// Indexing for performance
ExpenseSchema.index({ user: 1, date: -1 });

export const Expense = mongoose.model("Expense", ExpenseSchema);
