import "./App.css";
import React, { useState } from "react";
import ToDo from "./ToDo";
import Calendar from "./Calendar";

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
        <Calendar
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          currentDate={currentDate}
          actionItems={actionItems}
        />
        <ToDo
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
