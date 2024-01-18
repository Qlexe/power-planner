import "./App.css";

import React, { useState } from "react";

function DayCell(params) {
  return (
    <td>
      <div className="day_cell">
        <div className="day_weather-icon">
          {"31"}
          <button>
            <img src={"img/sunny.svg"} alt="" />
          </button>
        </div>
        <div className="events">{"tasks/events"}</div>
      </div>
    </td>
  );
}

function App() {
  return (
    <div className="Planner">
      <div className="Planner_header">
        <div className="Planner_header-title">🌸 May 2021 🌼</div>
      </div>
      <div className="Planner_body">
        <table>
          <thead>
            <th>Пн</th>
            <th>Вт</th>
            <th>Ср</th>
            <th>Чт</th>
            <th>Пт</th>
            <th>Сб</th>
            <th>Нд</th>
          </thead>
          <tbody>
            <tr>
              {Array(1)
                .fill(0)
                .map((el, index) => {
                  return <DayCell key={index} />;
                })}
            </tr>
          </tbody>
        </table>
        <div className="monthly_planner">
          <div className="card">
            <div className="current_week">
              <div className="month">May</div>
              <div className="days">10-21</div>
            </div>
            <div className="write-note">
              <textarea cols="30" rows="10"></textarea>
            </div>
          </div>

          <div className="card">
            <div className="current_day">
              <div className="month">May</div>
              <div className="days">22</div>
            </div>
            <div className="planned-tasks">
              <div className="task">
                <button></button>
                <span className="time">{"task.endTime"}</span>
                <p>{"task.text"}</p>
              </div>
              <div className="task">
                <button></button>
                <span>{"task.endTime"}</span>
                <p>{"task.text"}</p>
              </div>
              <div className="task">
                <button></button>
                <span>{"task.endTime"}</span>
                <p>{"task.text"}</p>
              </div>
              <div className="task">
                <button></button>
                <span>{"task.endTime"}</span>
                <p>{"task.text"}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="icon">
              <img src={"img/restaurant.png"} alt="" />
            </div>
            <div className="">
              <div className="task">
                <button></button>
                <p>{"task.text"}</p>
              </div>
              <div className="task">
                <button></button>
                <p>{"task.text"}</p>
              </div>
              <div className="task">
                <button></button>
                <p>{"task.text"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
