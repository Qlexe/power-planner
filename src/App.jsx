import { useState } from "react";
import "./App.css";
import Calendar from "./calendar/Calendar.jsx";
import ToDo from "./todo/ToDo.jsx";
import "./weather/Weather"; // in developing

function App() {
  const [actionItems, setActionItems] = useState(
    JSON.parse(localStorage.getItem("actionItems"))
  );
  if (localStorage.getItem("actionItems") === null) {
    localStorage.setItem("actionItems", JSON.stringify([]));
  } else {
    localStorage.setItem("actionItems", JSON.stringify(actionItems));
  }
  const currentDate = new Date(); // Date object // "2024-01-22T14:30:27.707Z"
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth()); // 0 - 11
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear()); // 2024
  const yearMonths = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];

  function onClickChangeChecked(id) {
    const newActionItems = actionItems.map((item) => {
      if (item.id === id) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    setActionItems(newActionItems);
    localStorage.setItem("actionItems", JSON.stringify(newActionItems));
  }

  return (
    <div className="Planner">
      <div className="Planner_header">
        <div className="Planner_header-title">
          {"📅 " + yearMonths[selectedMonth] + " " + selectedYear + " 📅"}
        </div>
      </div>
      <div className="Planner_body">
        <Calendar
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          currentDate={currentDate}
          actionItems={actionItems}
        />
        <ToDo
          setActionItems={setActionItems}
          onClickChangeChecked={onClickChangeChecked}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          currentDate={currentDate}
          actionItems={actionItems}
        />
      </div>
      <div className="Planner_footer">
        <a target="_blank" href="https://www.figma.com/community/file/975167773224171276/2021-calendar-and-planner-template?searchSessionId=lua0dce2-f26ln538n7f">Design</a>
      </div>
    </div>
  );
}

export default App;
