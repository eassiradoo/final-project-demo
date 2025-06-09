import React from 'react';
import './DateFilter.css';

const DateFilter = ({ dateRange, onDateRangeChange }) => {
  const handleDateChange = (e, type) => {
    const newDate = new Date(e.target.value);
    onDateRangeChange({
      ...dateRange,
      [type]: newDate
    });
  };

  return (
    <div className="date-filter">
      <div className="date-inputs">
        <div className="date-input">
          <label htmlFor="startDate">From</label>
          <input
            type="date"
            id="startDate"
            value={dateRange.startDate.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(e, 'startDate')}
          />
        </div>
        <div className="date-input">
          <label htmlFor="endDate">To</label>
          <input
            type="date"
            id="endDate"
            value={dateRange.endDate.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(e, 'endDate')}
          />
        </div>
      </div>
    </div>
  );
};

export default DateFilter; 