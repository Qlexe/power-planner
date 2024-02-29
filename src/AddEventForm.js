export default function AddEventForm({yearMonthsShort, weeksDay, dayOfWeek, currentDate, selectedMonth, CreateItem}) {
    return (<div className="card">
<div className="current_week">
  <div className="month">{yearMonthsShort[selectedMonth]}</div>
  <div className="days">
    {currentDate.getDate() + ` ${weeksDay[dayOfWeek]}`}
  </div>
</div>
<div className="write-item">
  <textarea
    rows="8"
    onKeyDown={(e) => {
      if (e.key === "Enter" && e.shiftKey === false) {
        CreateItem(e.target.value);
      }
    }}
  ></textarea>
  <button
    className="mobile-only"
    type="submit"
    onClick={() =>
      CreateItem(document.querySelector(".write-item textarea").value)
    }
  >
    +
  </button>
</div>
</div>)}