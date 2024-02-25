import moment from 'moment';

import DayCell from "./Cell";

export default function PlannerCalendar({
  selectedYear,
  selectedMonth,
  currentDate,
  actionItems,
}) {
  let rows = [];
  let row = [];

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate(); // 31

  const firstWeekday = new Date(selectedYear, selectedMonth, 1).getDay() - 1;

  let key = 0;
  while (row.length < firstWeekday) {
    row.push(<DayCell key={"empty " + key++} hidden={true}></DayCell>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(selectedYear, selectedMonth, i);
    const dayOfWeek = date.getDay(); // 0 - 6
    const isWeekendDay = dayOfWeek === 0 || dayOfWeek === 6;

    const tasksOnThisDay = actionItems
      .filter((item) => {
        return (
          moment(item.startDate).toDate() <= date &&
          date <= moment(item.endDate).toDate()
        );
      })
      .map((item) => {
        return (
          <div className="event">
            <div className="event-title">{item.title}</div>
          </div>
        );
      });

    if (
      i === currentDate.getDate() &&
      selectedMonth === currentDate.getMonth()
    ) {
      row.push(
        <DayCell
          key={i}
          isCurrentDay={true}
          day={i}
          events={tasksOnThisDay}
        ></DayCell>
      );
    } else {
      row.push(
        <DayCell
          key={i}
          isWeekendDay={isWeekendDay}
          day={i}
          events={tasksOnThisDay}
        ></DayCell>
      );
    }

    if (row.length % 7 === 0) {
      rows.push(<tr key={"tr" + i}>{row}</tr>);
      row = [];
    }
  }
  if (row.length > 0) {
    rows.push(<tr key={"tr" + daysInMonth}>{row}</tr>);

    let key = daysInMonth;
    while (row.length % 7 !== 0) {
      row.push(<DayCell key={"empty " + key++} hidden={true}></DayCell>);
    }
  }

  return (
    <table className="Planner_body-month">
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