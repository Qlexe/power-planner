
export default function DayCell({ isCurrentDay, isOtherMonth, isWeekendDay, day, hidden, events }) {
    return (
      <td id={day}>
        {hidden ? null : (
          <div
            className={"day_cell " + (!isOtherMonth ? "day_cell_current_month " : "day_cell_another_month ") + (isCurrentDay ? "day_cell_current_day" : null)}
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