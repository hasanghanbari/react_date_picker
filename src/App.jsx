import { useEffect, useState } from "react";
// import moment from "moment";
import moment from "jalali-moment";

moment.updateLocale('fa', {
  week: {
    dow: 6 // Saturday
  }
});

import "./App.css";

function App() {
  const todayJalali = moment().locale("fa").format("YYYY/M/D");
  const todayYear = moment().locale("fa").format("YYYY");
  const todayMonth = moment().locale("fa").format("M");
  const todayDay = moment().locale("fa").format("D");

  const [mainMonth, setMainMonth] = useState(todayMonth);

  const [monthElement, setMonthElement] = useState([]);
  const [emptyDayElement, setEmptyDayElement] = useState([]);

  // const months = [];
  // const days = [];

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

  const [datepicker, setDatepicker] = useState({
    monthCount: 2,
    activeMonth: 2,
    months: [],
  });

  const setMonths = () => {
    let dateMonth = +mainMonth;
    let dateYear = +todayYear;

    for (let index = 0; index < datepicker.monthCount; index++) {
      const month = jalaliMonths.find((x) => x.id == dateMonth);
      console.log("month", month, dateMonth);
      datepicker.months.push({
        id: month.id,
        title: month.title,
        year: dateYear,
        days: [],
      });
      dateYear = dateMonth === 12 ? dateYear + 1 : dateYear;
      dateMonth = dateMonth === 12 ? 1 : dateMonth + 1;
    }
    console.log("datepicker", datepicker);
  };

  const setDays = () => {
    datepicker.months.forEach((month) => {
      month.days.length = 0;
      const dayCount = 31;
      for (let day = 0; day < dayCount; day++) {
        const date = moment(
          month.year + "/" + month.id + "/" + (day + 1),
          "jYYYY/jM/jD"
        );
        if (date.isValid()) {
          month.days.push({
            id: day + 1,
            price: null,
            state: "active",
            dayOfWeek: date.day(),
          });
        }
      }
    });
  };

  const setElementDatepicker = async () => {
    /**
     * Set Datpicker
     */
    setMonthElement("");
    const elements = [];
    for (let index = 0; index < datepicker.monthCount; index++) {
      const days = [];

      const dayOfWeek = +datepicker.months[index].days[0].dayOfWeek;
      for (let empryIndex = 0; empryIndex < dayOfWeek; empryIndex++) {
        days.push(<span className={""} key={"e" + index + empryIndex}></span>);
      }
      datepicker.months[index].days.forEach((day, dayIndex) => {
        days.push(
          <span
            className={
              "calendar-cell " + (+todayDay === day.id ? "is_today " : "")
            }
            key={dayIndex}
          >
            {day.id}
          </span>
        );
      });

      const newElement = (
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
      elements.push(newElement);
    }
    console.log("elements", elements);
    setMonthElement(elements);
  };

  useEffect(() => {
    return () => {
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
              <div className="dates">{monthElement}</div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default App;
