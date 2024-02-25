import "./App.css";
import moment from 'moment';

import React, { useState } from "react";

function PlannerActions({
  CreateItem,
  onClickChangeChecked,
  selectedMonth,
  selectedYear,
  currentDate,
  actionItems,
}) {
    const yearMonthsShort = [
    "Січ",
    "Лют",
    "Бер",
    "Кві",
    "Тра",
    "Чер",
    "Лип",
    "Сер",
    "Вер",
    "Жов",
    "Лис",
    "Гру",
  ];
  const weeksDay = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const dayOfWeek = currentDate.getDay();
  const firstDayDiff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const lastDayDiff = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  const firstDayOfWeek = new Date(currentDate);
  firstDayOfWeek.setDate(currentDate.getDate() + firstDayDiff);
  const lastDayOfWeek = new Date(currentDate);
  lastDayOfWeek.setDate(currentDate.getDate() + lastDayDiff);

  function formatDate(isoString) {
    const dateParts = isoString.split("-"); // Розділяємо рядок на частини
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    return `${day}.${month}.${year}`; // Формуємо новий рядок у потрібному форматі
  }

  function CategorizedCards() {
    const findAllUniqueCategories = (actionItems) => {
      if (!Array.isArray(actionItems)) {
        throw new Error("Параметр має бути масивом об’єктів");
      }

      const uniqueCategories = [
        ...new Set(
          actionItems
            .map((item) => item.category)
            .filter((category) => category !== undefined || category !== null)
        ),
      ];

      return uniqueCategories;
    };

    const cards = findAllUniqueCategories(actionItems).map((category) => {
      const items = actionItems.filter((item) => item.category === category);
      return (
        <div className="card">
          <div className={`icon ${category}`}>
            <img src={`img/${category}.png`} alt="" />
          </div>
          <div className="planned-items">
            {items.map((item) => (
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
    });

    return <>{cards}</>;
  }

  return (
    <div className="Planner_body-monthly_planner">
      <div className="card">
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
      </div>

      <div className="card">
        <div className="current_day">
          <div className="month">{yearMonthsShort[selectedMonth]}</div>
          <div className="days">
            {firstDayOfWeek.getDate() + " - " + lastDayOfWeek.getDate()}
          </div>
        </div>
        <div className="planned-items">
          {actionItems
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
      <CategorizedCards />
    </div>
  );
}

function DayCell({ key, isCurrentDay, isWeekendDay, day, hidden, events }) {
  return (
    <td key={key} id={day}>
      {hidden ? null : (
        <div
          className={"day_cell " + (isCurrentDay ? "day_cell_current" : null)}
        >
          <div className={"header " + (isWeekendDay ? "header_weekend" : null)}>
            <span>{day}</span>
            <button>
              <img src={"img/sunny.svg"} alt="" />
            </button>
          </div>
          <div className="events">{events}</div>
        </div>
      )}
    </td>
  );
}

function PlannerCalendar({
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

  function CreateItem(text) {
    text = text.trim();
    if (text === "") return;

    if (text === "/clear") {
      localStorage.setItem("actionItems", JSON.stringify([]));
      setActionItems([]);
      return;
    }

    const regex = /(.*?)(\n\n)(.*)/s;
    const match = text.match(regex);
    // console.log(match);

    function findMaxId(arr) {
      let maxId = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id > maxId) {
          maxId = arr[i].id;
        }
      }
      return maxId;
    }

    function getTextAfterHash(text) {
      const regex = /(?<=#)[^ ]*/;
      const match = text.match(regex);
      return match ? match[0] : null;
    }

    function getDaysOfWeek(text) {
      const regex =
        /(?<=\bпонеділок|\bвівторок|\bсереда|\bчетвер|\bп'ятниця|\bсубота|\bнеділя|\bпн|\bвт|\bср|\bчт|\bпт|\bсб|\bнд)\b/gi;
      const matches = text.match(regex);
      if (matches) {
        return matches
          .map((match) => {
            switch (match.toLowerCase()) {
              case "понеділок" || "пн":
                return 1;
              case "вівторок" || "вт":
                return 2;
              case "середа" || "ср":
                return 3;
              case "четвер" || "чт":
                return 4;
              case "п'ятниця" || "пт":
                return 5;
              case "субота" || "сб":
                return 6;
              case "неділя" || "нд":
                return 0;
              default:
                return null;
            }
          })
          .filter((id) => id !== null);
      } else {
        return null;
      }
    }

    function findStartTime(text) {
      const regex = /(?<=з\s)\d{1,2}:\d{1,2}/;
      const match = text.match(regex);
      return match ? match[0] : null;
    }

    function findEndTime(text) {
      const regex = /(?<=до\s|\-\s)\d{1,2}:\d{1,2}/;
      const match = text.match(regex);
      return match ? match[0] : null;
    }

    function convertDateToISOFormat(dateString) {
      const parts = dateString.split(".");

      const day = parts[0].padStart(2, "0");
      const month = parts[1].padStart(2, "0");
      const year = parts[2];

      return `${year}-${month}-${day}`;
    }

    function findStartDate(text) {
      const regex = /(?<=з\s)\d{1,2}\.\d{1,2}\.\d{4}/;
      const match = text.match(regex);
      return match ? convertDateToISOFormat(match[0]) : null;
    }

    function findEndDate(text) {
      const regex = /(?<=до\s|\-\s)\d{1,2}\.\d{1,2}\.\d{4}/;
      const match = text.match(regex);
      return match ? convertDateToISOFormat(match[0]) : null;
    }

    const newActionItem = {
      id: findMaxId(actionItems) + 1,
      type: "type",
      category: getTextAfterHash(text),
      title: match ? match[1] : text.substring(0, 30),
      description: match ? match[3] : text,
      isChecked: false,
      isRegular: false,
      daysOfWeek: getDaysOfWeek(text),
      startTime: findStartTime(text),
      endTime: findEndTime(text),
      startDate: findStartDate(text),
      endDate: findEndDate(text),
      createDate: new Date().toISOString().split("T")[0],
    };
    setActionItems([...actionItems, newActionItem]);
    localStorage.setItem("actionItems", JSON.stringify(actionItems));
    document.querySelector(".write-item textarea").value = "";
  }

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
        <PlannerCalendar
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          currentDate={currentDate}
          actionItems={actionItems}
        ></PlannerCalendar>
        <PlannerActions
          CreateItem={CreateItem}
          onClickChangeChecked={onClickChangeChecked}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          currentDate={currentDate}
          actionItems={actionItems}
        />
      </div>
    </div>
  );
}

export default App;
