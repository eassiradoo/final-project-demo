// Format currency values
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Format account numbers with masking
export const formatAccountNumber = (accountType) => {
  // Hardcoded display numbers as requested
  const accountNumbers = {
    checking: "•••• •••• •••• 4829",
    savings: "•••• •••• •••• 7392",
  };

  return accountNumbers[accountType] || "•••• •••• •••• ****";
};

// Format dates for transaction display
export const formatTransactionDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
};

// Format relative dates (e.g., "Today", "Yesterday")
export const formatRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return formatTransactionDate(dateString);
  }
};

// Get greeting based on time of day
export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  } else if (hour < 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};
