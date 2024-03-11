import { useState } from 'react';
import './App.css'

function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      <h1>
        react Datepicker
      </h1>
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
          <div className={`dropdown-menu p-4 text-body-secondary ${showDropdown ? `show` : ``}`}>
            
          </div>
        </div>
      </div>
    </>
    </>
  )
}

export default App
