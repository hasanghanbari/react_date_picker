import { useEffect, useState } from "react";
// import moment from "moment";
import moment from "jalali-moment";

import "./App.css";

function App() {
  const todayJalali = moment().locale("fa").format("YYYY/M/D");
  const todayYear = moment().locale("fa").format("YYYY");
  const todayMonth = moment().locale("fa").format("M");
  const todayDay = moment().locale("fa").format("D");

  const [mainMonth, setMainMonth] = useState(todayMonth);

  const months = [];
  const days = [];

  const [showDropdown, setShowDropdown] = useState(false);
  const jalaliMonths = [
    {
      id: 1,
      title: "فروردین",
    },
    {
      id: 2,
      title: "اردیبهشت",
    },
    {
      id: 3,
      title: "خرداد",
    },
    {
      id: 4,
      title: "تیر",
    },
    {
      id: 5,
      title: "مرداد",
    },
    {
      id: 6,
      title: "شهریور",
    },
    {
      id: 7,
      title: "مهر",
    },
    {
      id: 8,
      title: "آبان",
    },
    {
      id: 9,
      title: "آذر",
    },
    {
      id: 10,
      title: "دی",
    },
    {
      id: 11,
      title: "بهمن",
    },
    {
      id: 12,
      title: "اسفند",
    },
  ];
  const gregorianMonths = [
    {
      id: 1,
      title: "January",
    },
    {
      id: 2,
      title: "February",
    },
    {
      id: 3,
      title: "March",
    },
    {
      id: 4,
      title: "April",
    },
    {
      id: 5,
      title: "May",
    },
    {
      id: 6,
      title: "June",
    },
    {
      id: 7,
      title: "July",
    },
    {
      id: 8,
      title: "August",
    },
    {
      id: 9,
      title: "September",
    },
    {
      id: 10,
      title: "October",
    },
    {
      id: 11,
      title: "November",
    },
    {
      id: 12,
      title: "December",
    },
  ];
  console.log("todayMonth", todayYear, todayMonth, todayDay);
  const [today, setToday] = useState(todayJalali);
  const [datepicker, setDatepicker] = useState({
    monthCount: 2,
    activeMonth: 2,
    months: [],
  });

  const setMonths = () => {
    // jalaliMonths.forEach( month => {
    const month = jalaliMonths.find((x) => x.id == mainMonth);
    console.log('month', month, mainMonth, jalaliMonths);
    datepicker.months.push({
      id: month.id,
      title: month.title,
      year: 1402,
      days: [],
    });
    // })
  };

  const setDays = () => {
    datepicker.months.forEach((month) => {
      month.days.length = 0;
      const dayCount = 30;
      for (let day = 0; day < dayCount; day++) {
        month.days.push({
          id: day + 1,
          price: null,
          state: "active",
          dayOfWeek: 1,
        });
      }
    });
      console.log("datepicker", datepicker);
  };

  const setElementDatepicker = () => {
    /**
     * Set Datpicker
     */
    console.log('setElementDatepicker datepicker', datepicker);
    for (let index = 0; index < datepicker.monthCount; index++) {
      days.length = 0;
      datepicker.months[index].days.forEach((day, index) => {
        days.push(
          <span className="calendar-cell" key={index}>
            {day.id}
          </span>
        );
      });
      months.push(
        <div className="month" key={index + 1}>
          <h5>{datepicker.months[index].title}</h5>
          <div className="calendar-grid">
            <span className="calendar-weekday">ش</span>
            <span className="calendar-weekday">ی</span>
            <span className="calendar-weekday">د</span>
            <span className="calendar-weekday">س</span>
            <span className="calendar-weekday">چ</span>
            <span className="calendar-weekday">پ</span>
            <span className="calendar-weekday">ج</span>
            {days}
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    return () => {
      console.log("today", today);
      /**
       * Set Months
       */
      setMonths();

      /**
       * set days on months
       */
      setDays();

      setElementDatepicker();
    };
  }, []);

  console.log("datepicker", datepicker);
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
              <div className="dates">{months}</div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default App;
