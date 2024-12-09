import moment from "moment";
import "./Calendar.css";

import DayCell from "./Cell.jsx";

export default function Calendar(props) {
  const { selectedYear, selectedMonth, monthColor, currentDate, actionItems } =
    props;

  const currentWeekStyle = {
    boxShadow: `inset 0 0 5px 2px ${monthColor}`,
    // backgroundColor: `${monthColor}`,
  };

  let rows = [];
  const TOTAL_ROWS = 5;
  const DAYS_IN_WEEK = 7;

  // Get current week's Monday
  const currentWeekMonday = moment(
    new Date(selectedYear, selectedMonth, currentDate.getDate())
  )
    .startOf("week")
    .add(1, "days");

  // Start from previous week
  const calendarStartDate = moment(currentWeekMonday).subtract(1, "week");

  for (let weekIndex = 0; weekIndex < TOTAL_ROWS; weekIndex++) {
    let row = [];

    for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
      const currentDate = moment(calendarStartDate)
        .add(weekIndex, "weeks")
        .add(dayIndex, "days");

      const day = currentDate.date();
      const isWeekendDay = currentDate.day() === 0 || currentDate.day() === 6;
      const isCurrentMonth = currentDate.month() === selectedMonth;

      // Filter tasks for current day
      const tasksOnThisDay = actionItems
        .filter((item) => !item.isChecked)
        .filter((item) => moment(item.startDate).isSameOrBefore(currentDate))
        .slice(0, 4)
        .map((item, index) => (
          <div key={index} className="event">
            <img src={`/img/${item.category}.png`} alt={item.category} />
            <div className="event-title">{item.title.substring(0, 17)}</div>
          </div>
        ));

      // Create cell with appropriate properties
      const cell = (
        <DayCell
          key={`${weekIndex}-${dayIndex}`}
          currentWeekStyle={currentWeekStyle}
          isCurrentDay={currentDate.isSame(new Date(), "day")}
          isWeekendDay={isWeekendDay}
          isOtherMonth={!isCurrentMonth}
          day={day}
          events={tasksOnThisDay}
        />
      );

      row.push(cell);
    }

    console.log(currentWeekStyle);

    rows.push(
      <tr
        key={`week-${weekIndex}`}
        style={weekIndex === 1 ? currentWeekStyle : {}}
      >
        {row}
      </tr>
    );
  }
  return (
    <table className="Calendar_body">
      <thead>
        <tr>
          <th>Пн</th>
          <th>Вт</th>
          <th>Ср</th>
          <th>Чт</th>
          <th>Пт</th>
          <th>Сб</th>
          <th>Нд</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}