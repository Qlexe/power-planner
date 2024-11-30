export default function ShowCurrentWeekEventsCard(props) {
  const {
    yearMonthsShort,
    selectedMonth,
    firstDayOfWeek,
    lastDayOfWeek,
    actionItems,
    onClickChangeChecked,
    currentDate,
    formatDate,
  } = props;
  return (
    <div className="card">
      <div className="current_day">
        <div className="month">{yearMonthsShort[selectedMonth]}</div>
        <div className="days">
          {firstDayOfWeek.getDate() + " - " + lastDayOfWeek.getDate()}
        </div>
      </div>
      <div className="planned-items">
        {actionItems
          .filter((item) => {
            return item.daysOfMonth.some(
              (day) =>
                day >= firstDayOfWeek.getDate() &&
                day <= lastDayOfWeek.getDate()
            );
          })
          .sort(
            (a, b) =>
              new Date(a.endDate).getDate() - new Date(b.endDate).getDate()
          )
          .sort((a, b) => a.isChecked - b.isChecked)
          .slice(0, 6)
          .map((item) => (
            <div className="item">
              <button
                className={"checkbox " + (item.isChecked && "checked")}
                onClick={() => onClickChangeChecked(item.id)}
              ></button>
              {item.endDate ? (
                <span className="time">
                  {/* {console.log(currentDate + " - " + new Date(item.endDate))} */}
                  {Math.ceil(
                    (new Date(item.endDate) - currentDate) /
                      (1000 * 60 * 60 * 24)
                  )}
                </span>
              ) : null}
              {item.isChecked ? (
                <p>
                  <del>{item.title}</del>
                </p>
              ) : (
                <p>{item.title}</p>
              )}
              <span className="created">{formatDate(item.createDate)}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
