import { useEffect, useState } from "react";
// import moment from "moment";
import moment from "jalali-moment";

import "./App.css";

function App() {
  // const todayJalali = moment().locale("fa").format("YYYY/MM/DD");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [calendarType, setCalendarType] = useState("isJalali");
  const [isRoundtrip, setIsRoundtrip] = useState(false);

  const [todayDay, setTodayDay] = useState(moment().locale("fa").format("DD"));
  const [todayMonth, setTodayMonth] = useState(
    moment().locale("fa").format("MM")
  );
  const [todayYear, setTodayYear] = useState(
    moment().locale("fa").format("YYYY")
  );

  const [mainYear, setMainYear] = useState(todayYear);
  const [mainMonth, setMainMonth] = useState(todayMonth);

  const [monthElement, setMonthElement] = useState([]);
  const [emptyDayElement, setEmptyDayElement] = useState([]);

  // const months = [];
  // const days = [];

  const [showDropdown, setShowDropdown] = useState(false);
  const jalaliMonths = [
    {
      id: 1,
      value: "01",
      title: "فروردین",
    },
    {
      id: 2,
      value: "02",
      title: "اردیبهشت",
    },
    {
      id: 3,
      value: "03",
      title: "خرداد",
    },
    {
      id: 4,
      value: "04",
      title: "تیر",
    },
    {
      id: 5,
      value: "05",
      title: "مرداد",
    },
    {
      id: 6,
      value: "06",
      title: "شهریور",
    },
    {
      id: 7,
      value: "07",
      title: "مهر",
    },
    {
      id: 8,
      value: "08",
      title: "آبان",
    },
    {
      id: 9,
      value: "09",
      title: "آذر",
    },
    {
      id: 10,
      value: "10",
      title: "دی",
    },
    {
      id: 11,
      value: "11",
      title: "بهمن",
    },
    {
      id: 12,
      value: "12",
      title: "اسفند",
    },
  ];
  const gregorianMonths = [
    {
      id: 1,
      value: "01",
      title: "January",
    },
    {
      id: 2,
      value: "02",
      title: "February",
    },
    {
      id: 3,
      value: "03",
      title: "March",
    },
    {
      id: 4,
      value: "04",
      title: "April",
    },
    {
      id: 5,
      value: "05",
      title: "May",
    },
    {
      id: 6,
      value: "06",
      title: "June",
    },
    {
      id: 7,
      value: "07",
      title: "July",
    },
    {
      id: 8,
      value: "08",
      title: "August",
    },
    {
      id: 9,
      value: "09",
      title: "September",
    },
    {
      id: 10,
      value: "10",
      title: "October",
    },
    {
      id: 11,
      value: "11",
      title: "November",
    },
    {
      id: 12,
      value: "12",
      title: "December",
    },
  ];

  const [datepicker, setDatepicker] = useState({
    monthCount: 2,
    activeMonth: 2,
    months: [],
  });

  const setMonths = () => {
    let dateMonth = +mainMonth;
    let dateYear = +mainYear;
    datepicker.months.length = 0;
    for (let index = 0; index < datepicker.monthCount; index++) {
      let month = jalaliMonths.find((x) => x.id == dateMonth);
      if (calendarType === "isGregorian") {
        month = gregorianMonths.find((x) => x.id == dateMonth);
      }

      console.log("month", month, dateMonth);
      datepicker.months.push({
        id: month.id,
        value: month.value,
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
      const startMonth = moment(
        month.year + "/" + month.id + "/01",
        "jYYYY/jM/jD"
      );
      const dayCount = startMonth.jDaysInMonth();
      for (let day = 0; day < dayCount; day++) {
        const date = moment(
          month.year + "/" + month.id + "/" + (day + 1),
          "jYYYY/jM/jD"
        );
        const dayOfWeek = (date.day() + 1) % 7;
        const holiday = dayOfWeek === 6 ? true : false;
        // console.log("date2", date.jDaysInMonth());
        if (date.isValid()) {
          month.days.push({
            id: day + 1,
            value: (day + 1 < 10 ? "0" : "") + (day+1),
            price: null,
            state: "active",
            holiday: holiday,
            dayOfWeek: dayOfWeek,
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

      const month = datepicker.months[index];
      const dayOfWeek = +month.days[0].dayOfWeek;
      for (let empryIndex = 0; empryIndex < dayOfWeek; empryIndex++) {
        days.push(<span className={""} key={"e" + index + empryIndex}></span>);
      }
      month.days.forEach((day, dayIndex) => {
        const curentDate = month.year + "/" + month.value + "/" + day.value;
        days.push(
          <span
            className={
              "calendar-cell " +
              (+todayYear === month.year,
              +todayMonth === month.value && +todayDay === day.value
                ? "is_today "
                : "") +
              (day.holiday ? "is_holiday " : "") +
              (curentDate === fromDate ? "is_selected " : "") +
              (curentDate === toDate ? "is_selected " : "")
            }
            key={dayIndex}
            onClick={() => selectDate(month.year, month.value, day.value)}
          >
            {day.id}
          </span>
        );
      });

      const newElement = (
        <div className="month" key={index + 1}>
          <h5>{datepicker.months[index].title}</h5>
          <div className="calendar-grid">
            <span className="calendar-weekday">
              {calendarType === "isJalali" ? "ش" : "s"}
            </span>
            <span className="calendar-weekday">
              {calendarType === "isJalali" ? "ی" : "s"}
            </span>
            <span className="calendar-weekday">
              {calendarType === "isJalali" ? "د" : "m"}
            </span>
            <span className="calendar-weekday">
              {calendarType === "isJalali" ? "س" : "t"}
            </span>
            <span className="calendar-weekday">
              {calendarType === "isJalali" ? "چ" : "w"}
            </span>
            <span className="calendar-weekday">
              {calendarType === "isJalali" ? "پ" : "t"}
            </span>
            <span className="calendar-weekday">
              {calendarType === "isJalali" ? "ج" : "f"}
            </span>
            {days}
          </div>
        </div>
      );
      elements.push(newElement);
    }
    console.log("elements", elements);
    setMonthElement(elements);
  };

  const selectDate = (year, month, day) => {
    const date = year + "/" + month + "/" + day;
    console.log("select date", date);
    setFromDate(date);
  };

  const arrowMonth = (type) => {
    const date = mainYear + "/" + mainMonth + "/01";

    let newYear = moment(date).add(1, "month").format("YYYY");
    let newMonth = moment(date).add(1, "month").format("MM");

    if (type === "right") {
      newYear = moment(date).add(-1, "month").format("YYYY");
      newMonth = moment(date).add(-1, "month").format("MM");
    }

    setMainYear(newYear);
    setMainMonth(newMonth);
  };

  const changeCalendar = () => {
    const mainDate = mainYear + "/" + mainMonth + "/15";
    console.log(
      "mainDate",
      mainDate,
      moment.from(mainDate, "fa", "YYYY/MM/DD").format("YYYY")
    );
    if (calendarType === "isJalali") {
      setCalendarType("isGregorian");

      // set main date for gregorean
      setMainYear(moment.from(mainDate, "fa", "YYYY/MM/DD").format("YYYY"));
      setMainMonth(moment.from(mainDate, "fa", "YYYY/MM/DD").format("MM"));

      // set today for gregorean
      setTodayYear(moment().format("YYYY"));
      setTodayMonth(moment().format("MM"));
      setTodayDay(moment().format("DD"));
      return;
    }
    setCalendarType("isJalali");

    // set main date for jalali
    setMainYear(moment(mainDate).locale("fa").format("YYYY"));
    setMainMonth(moment(mainDate).locale("fa").format("MM"));

    // set today for jalali
    setTodayYear(moment().locale("fa").format("YYYY"));
    setTodayMonth(moment().locale("fa").format("MM"));
    setTodayDay(moment().locale("fa").format("DD"));
  };

  const goToToday = () => {
    const mainDate = todayYear + "/" + todayMonth + "/" + todayDay;

    setMainYear(moment(mainDate).format("YYYY"));
    setMainMonth(moment(mainDate).format("MM"));
  };

  useEffect(() => {
    /**
     * Set Months
     */
    setMonths();

    /**
     * set days on months
     */
    setDays();

    setElementDatepicker();
  }, [fromDate, mainMonth, calendarType]);

  return (
    <>
      <h1>react Datepicker</h1>
      <>
        <div className="date-picker">
          <div className="inputs">
            <div className="from-date">
              <label htmlFor="exampleDataList" className="form-label">
                {isRoundtrip ?
                'از'
                : ''}
                 تاریخ:
              </label>
              <input
                className="form-control"
                list="datalistOptions"
                id="exampleDataList"
                placeholder=""
                value={fromDate}
                onClick={() => setShowDropdown(true)}
              />
            </div>
            {isRoundtrip ?
              <div className="to-date">
                <label htmlFor="exampleDataList" className="form-label">
                  تا تاریخ:
                </label>
                <input
                  className="form-control"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder=""
                  value={toDate}
                />
              </div>
            : ''}
          </div>
          <div className={`dropdown box`}>
            <div
              className={`dropdown-menu p-4 text-body-secondary ${
                showDropdown ? `show` : ``
              }`}
            >
              <div className="top-action"></div>
              <div className="arrow">
                <div
                  className="arrow-action"
                  onClick={() => arrowMonth("right")}
                >
                  {"<"}
                </div>
                <div
                  className="arrow-action"
                  onClick={() => arrowMonth("left")}
                >
                  {">"}
                </div>
              </div>
              <div className={"dates " + calendarType}>{monthElement}</div>
              <div className="bottom-action d-flex justify-content-between">
                <button
                  className="btn btn-link"
                  onClick={() => goToToday()}
                >
                  برو امروز
                </button>
                <button
                  className="btn btn-link"
                  onClick={() => changeCalendar()}
                >
                  {calendarType === "isJalali" ? "تقویم میلادی" : "تقویم شمسی"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default App;
