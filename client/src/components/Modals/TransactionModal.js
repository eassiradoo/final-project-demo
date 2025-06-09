import React, { useState, useEffect } from "react";
import { formatCurrency } from "../../utils/formatters";
import "./TransactionModal.css";

const TransactionModal = ({
  isOpen,
  onClose,
  onSubmit,
  type, // 'deposit' or 'withdraw'
  accounts,
  loading,
}) => {
  const [formData, setFormData] = useState({
    accountId: "",
    amount: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Set default account to checking when modal opens
  useEffect(() => {
    if (isOpen && accounts && accounts.length > 0) {
      const checkingAccount = accounts.find(
        (acc) => acc.accountType === "checking"
      );
      if (checkingAccount) {
        setFormData((prev) => ({
          ...prev,
          accountId: checkingAccount.id.toString(),
        }));
      }
    }
  }, [isOpen, accounts]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        accountId: "",
        amount: "",
        description: "",
      });
      setSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.accountId || !formData.amount) {
      window.showErrorToast("Please fill in all required fields");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      window.showErrorToast("Please enter a valid amount");
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit({
        accountId: parseInt(formData.accountId),
        amount: amount,
        description: formData.description,
      });
      onClose();
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectedAccount = accounts?.find(
    (acc) => acc.id.toString() === formData.accountId
  );

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">
            Make a {type === "deposit" ? "Deposit" : "Withdrawal"}
          </h2>
          <p className="modal__subtitle">
            {type === "deposit"
              ? "Add funds to your account"
              : "Withdraw funds from your account"}
          </p>
          <button className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Account</label>
            <select
              className="form-select"
              value={formData.accountId}
              onChange={(e) => handleChange("accountId", e.target.value)}
              required
            >
              <option value="">Select Account</option>
              {accounts?.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.accountType.charAt(0).toUpperCase() +
                    account.accountType.slice(1)}{" "}
                  Account
                  {" - "}
                  {formatCurrency(account.balance)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-input form-input--large"
              placeholder="100000"
              value={formData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description (Optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={`form-button form-button--${type}`}
            disabled={submitting || loading}
          >
            {submitting
              ? "Processing..."
              : `${type === "deposit" ? "Deposit" : "Withdraw"} Funds`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
