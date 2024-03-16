import './ToDo.css';
import AddEventForm from "./AddEventFormCard";
import ShowCurrentWeekEventsCard from "./ShowCurrentWeekEventsCard";
export default function PlannerActions(props) {
  const {
    setActionItems,
    onClickChangeChecked,
    selectedMonth,
    selectedYear,
    currentDate,
    actionItems,
  } = props;
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
    const dateParts = isoString.split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    return `${day}.${month}.${year}`;
  }

  function CategorizedCards() {
    const findAllUniqueCategories = (actionItems) => {
      if (!Array.isArray(actionItems)) {
        throw new Error("It isn't array of objects");
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
    <div className="ToDo_body">
      <AddEventForm
      actionItems={actionItems}
        setActionItems={setActionItems}
        yearMonthsShort={yearMonthsShort}
        weeksDay={weeksDay}
        dayOfWeek={dayOfWeek}
        currentDate={currentDate}
        selectedMonth={selectedMonth}
      />
      <ShowCurrentWeekEventsCard
        yearMonthsShort={yearMonthsShort}
        selectedMonth={selectedMonth}
        firstDayOfWeek={firstDayOfWeek}
        lastDayOfWeek={lastDayOfWeek}
        actionItems={actionItems}
        onClickChangeChecked={onClickChangeChecked}
        currentDate={currentDate}
        formatDate={formatDate}
      />
      <CategorizedCards />
    </div>
  );
}
