import { useState } from "react";
import moment from "moment";
import "./App.css";

function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [datepicker, setDatepicker] = useState({
    monthCount: 2,
    activeMonth: 2,
    months: [
      {
        id: 1,
        title: "فروردین",
        days: [
          {
            id: 1,
            price: 1000,
          },
        ],
      },
      {
        id: 2,
        title: "اردیبهشت",
        days: [
          {
            id: 1,
            price: 2000,
          },
        ],
      },
    ],
  });

  const months = [];

  for (let index = 0; index < datepicker.monthCount; index++) {
    months.push(
      <div className="month" key={index + 1}>
        {datepicker.months[index].title}
      </div>
    );
  }

  return (
    <>
      <h1>react Datepicker</h1>
      <>
        <div className="date-picker">
          <div className="inputs">
            <div className="from-date">
              <label htmlFor="exampleDataList" className="form-label">
                از تاریخ:
              </label>
              <input
                className="form-control"
                list="datalistOptions"
                id="exampleDataList"
                placeholder=""
                onClick={() => setShowDropdown(true)}
              />
            </div>
            <div className="to-date">
              <label htmlFor="exampleDataList" className="form-label">
                تا تاریخ:
              </label>
              <input
                className="form-control"
                list="datalistOptions"
                id="exampleDataList"
                placeholder=""
              />
            </div>
          </div>
          <div className={`dropdown box`}>
            <div
              className={`dropdown-menu p-4 text-body-secondary ${
                showDropdown ? `show` : ``
              }`}
            >
              <div className="dates">
                {months}
                {/* {Datepicker.monthCount.forEach((month) => {
                })} */}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default App;
