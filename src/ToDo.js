export default function PlannerActions({
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