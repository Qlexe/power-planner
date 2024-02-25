export default function DayCell({ key, isCurrentDay, isWeekendDay, day, hidden, events }) {
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