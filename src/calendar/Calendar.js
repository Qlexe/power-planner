import moment from "moment";
import "./Calendar.css";

import DayCell from "./Cell";

export default function Calendar(props) {
  const { selectedYear, selectedMonth, currentDate, actionItems } = props;
  let rows = [];
  let row = [];

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstWeekday = new Date(selectedYear, selectedMonth, 1).getDay() - 1;

  let key = 0;
  while (row.length < firstWeekday) {
    row.push(<DayCell key={"empty" + key++} hidden={true} />);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(selectedYear, selectedMonth, i);
    const dayOfWeek = date.getDay(); // 0 - 6
    const isWeekendDay = dayOfWeek === 0 || dayOfWeek === 6;
    const tasksOnThisDay = actionItems
      .map((item) => {
        item.endDate && console.log(date, moment(item.endDate).toDate());
        return item;
      })
      .filter((item) => {
        return !item.isChecked;
      })
      .filter((item) => {
        return (
          moment(item.startDate).toDate() <= date 
          // date <= moment(item.endDate).toDate()
        );
      })
      .slice(0, 4)
      .map((item) => {
        return (
          <div className="event">
            <img src={`/img/${item.category}.png`}></img>
            <div className="event-title">{item.title.substring(0, 17)}</div>
          </div>
        );
      });

    // if (tasksOnThisDay.length > 0)
    //   console.log(date, actionItems, tasksOnThisDay);

    if (
      i === currentDate.getDate() &&
      selectedMonth === currentDate.getMonth()
    ) {
      row.push(
        <DayCell key={i} isCurrentDay={true} day={i} events={tasksOnThisDay} />
      );
    } else {
      row.push(
        <DayCell
          key={i}
          isWeekendDay={isWeekendDay}
          day={i}
          events={tasksOnThisDay}
        />
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
      row.push(<DayCell key={"empty" + key++} hidden={true} />);
    }
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
