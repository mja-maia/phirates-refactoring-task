const ExpenseType = {
  BREAKFAST: "Breakfast",
  LUNCH: "Lunch",
  DINNER: "Dinner",
  CAR_RENTAL: "Car Rental",
};

class Expense {
  constructor(type, amount) {
    this.type = type;
    this.amount = amount;
  }

  isOverLimit() {
    switch (this.type) {
      case ExpenseType.BREAKFAST:
        return this.amount > 20;
      case ExpenseType.LUNCH:
        return this.amount > 50;
      case ExpenseType.DINNER:
        return this.amount > 100;
      default:
        return false;
    }
  }

  toString() {
    const overLimitMarker = this.isOverLimit() ? "[over-expense!]" : "";
    return `${this.type}\t${this.amount.toFixed(2)}eur\t${overLimitMarker}`;
  }
}

class MealExpense extends Expense {
  constructor(type, amount) {
    super(type, amount);
    this.category = "Meal";
  }
}

class CarRentalExpense extends Expense {
  constructor(amount) {
    super(ExpenseType.CAR_RENTAL, amount);
    this.category = "Car Rental";
  }
}

class ExpenseReport {
  constructor(expenses) {
    this.expenses = expenses;
    this.today = new Date().toISOString().slice(0, 10);
  }

  getTotal() {
    return this.expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  getMealExpenses() {
    return this.expenses
      .filter((expense) => expense instanceof MealExpense)
      .reduce((total, expense) => total + expense.amount, 0);
  }

  getExpensesByCategory() {
    const expensesByCategory = {};
    this.expenses.forEach((expense) => {
      const category = expense.category;
      expensesByCategory[category] = expensesByCategory[category] || [];
      expensesByCategory[category].push(expense);
    });
    return expensesByCategory;
  }

  print() {
    console.info(`Today Travel Expenses ${this.today}`);
    this.expenses.forEach((expense) => console.info(expense.toString()));
    console.info(`Meal expenses: ${this.getMealExpenses().toFixed(2)}eur`);
    console.info(`Total expenses: ${this.getTotal().toFixed(2)}eur`);
  }
}

const expenses = [
  new MealExpense(ExpenseType.BREAKFAST, 15.2),
  new MealExpense(ExpenseType.BREAKFAST, 28.1),
  new MealExpense(ExpenseType.LUNCH, 10.2),
  new MealExpense(ExpenseType.DINNER, 16.0),
  new MealExpense(ExpenseType.DINNER, 120.2),
  new CarRentalExpense(250.0),
];

const report = new ExpenseReport(expenses);
report.print();

// Sample output:
// Today Travel Expenses 2023-04-13
// Breakfast 15.20eur
// Breakfast 28.10eur
// Lunch 10.20eur
// Dinner 16.00eur
// Dinner 120.20eur [over-expense!]
// Car Rental 250.00eur
// Meal expenses: 169.50eur
// Total expenses: 419.50eur
