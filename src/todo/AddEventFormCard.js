

export default function AddEventForm({
  yearMonthsShort,
  weeksDay,
  dayOfWeek,
  currentDate,
  selectedMonth,
  actionItems,
  setActionItems
}) {

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
      function getCurrentTime() {
        function padZero(num) {
          return (num < 10 ? "0" : "") + num;
        }
        const currentDate = new Date();
        const hours = padZero(currentDate.getHours());
        const minutes = padZero(currentDate.getMinutes());
        const seconds = padZero(currentDate.getSeconds());
  
        return `${hours}:${minutes}:${seconds}`;
      }
      const regex = /(?<=з\s)\d{1,2}:\d{1,2}/;
      const match = text.match(regex);
      return match ? match[0] : getCurrentTime();
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
      function getCurrentDate() {
        function padZero(num) {
          return (num < 10 ? "0" : "") + num;
        }
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = padZero(currentDate.getMonth() + 1);
        const day = padZero(currentDate.getDate());
  
        return `${year}-${month}-${day}`;
      }
  
      const regex = /(?<=з\s)\d{1,2}\.\d{1,2}\.\d{4}/;
      const match = text.match(regex);
      return match ? convertDateToISOFormat(match[0]) : getCurrentDate();
    }
  
    function findEndDate(text) {
      const regex = /(?<=до\s|\-\s)\d{1,2}\.\d{1,2}\.\d{4}/;
      const match = text.match(regex);
      return match ? convertDateToISOFormat(match[0]) : null;
    }
  
    const newActionItem = {
      id: findMaxId(actionItems) + 1,
      category: getTextAfterHash(text),
      title: match ? match[1] : text.substring(0, 30),
      description: match ? match[3] : text,
      isChecked: false,
      isRegular: false,
      daysOfMonth: [2, 7, 16, 20, 30],
      daysOfWeek: getDaysOfWeek(text),
      startTime: findStartTime(text),
      endTime: findEndTime(text),
      startDate: findStartDate(text),
      endDate: findEndDate(text),
      createDate: new Date().toISOString().split("T")[0],
    };
    setActionItems([...actionItems, newActionItem]);
    localStorage.setItem("actionItems", JSON.stringify(actionItems));
    document.querySelector(".write-item textarea").value = null;
  }

  return (
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
  );
}
