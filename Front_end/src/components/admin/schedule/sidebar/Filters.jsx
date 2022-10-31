import { positions } from "@mui/system";
import React from "react";
import { useState } from "react";
import { TbRefresh } from "react-icons/tb";

const Filters = (props) => {
  const { filters, setFilters, setResetFilter } = props;
  const [filterChecked, setFilterChecked] = useState({
    availability: true,
    positions: true,
  });
  const onClickHrs = (e) => {
    const { name } = e.target;
    const newFilterArray = [];
    filters?.hours.map((hr) => {
      if (hr.type === name) {
        return newFilterArray.push({
          type: name,
          value: !hr.value,
          min: hr.min,
          max: hr.max,
        });
      } else {
        return newFilterArray.push({
          type: hr.type,
          value: hr.value,
          min: hr.min,
          max: hr.max,
        });
      }
    });
    setFilters((pre) => {
      return { ...pre, hours: newFilterArray };
    });
  };

  const onClickPos = (e) => {
    const { name } = e.target;
    const newFilterArray = [];
    filters?.positions.map((pos) => {
      if (pos.type === name) {
        return newFilterArray.push({
          id: pos.id,
          type: name,
          value: !pos.value,
          color: pos.color,
        });
      } else {
        return newFilterArray.push({
          id: pos.id,
          type: pos.type,
          value: pos.value,
          color: pos.color,
        });
      }
    });
    setFilters((pre) => {
      return { ...pre, positions: newFilterArray };
    });
  };
//Allbuttons
  const onNOffAvailFilters = (e) => {
    const newFilterArray = [];
    filters?.hours.map((hr) => {
      return newFilterArray.push({
        type: hr.type,
        value: !filterChecked.availability,
        min: hr.min,
        max: hr.max,
      });
    });
    setFilters((pre) => {
      return { ...pre, hours: newFilterArray };
    });
    setFilterChecked((pre) => {
      return { ...pre, availability: !filterChecked.availability };
    });
  };

  const onNOffPosFilters = (e) => {
    const newFilterArray = [];
    filters?.positions.map((pos) => {
      return newFilterArray.push({
        id: pos.id,
        type: pos.type,
        value: !filterChecked.positions,
        color: pos.color,
      });
    });
    setFilters((pre) => {
      return { ...pre, positions: newFilterArray };
    });
    setFilterChecked((pre) => {
      return { ...pre, positions: !filterChecked.positions };
    });
  };

  return (
    <div className="filters">
      <div className="filters-refreshNtitle">
        <TbRefresh onClick={() => setResetFilter((pre) => !pre)} />
      </div>
      <div className={`filters-container`}>
        <div className="hours-container">
          <label>Availabilty</label>
          <div className="hours">
            <button
              onClick={onNOffAvailFilters}
              className={`all_button ${filterChecked.availability}`}
            >
              All
            </button>
            {filters?.hours?.map((hr, i) => {
              const checked = hr.value;
              return (
                <button
                  className={`filterHrs ${hr.type} ${checked}`}
                  name={hr.type}
                  value={hr.value}
                  onClick={onClickHrs}
                  key={`filterHrs ${i}`}
                >
                  {hr.type}
                </button>
              );
            })}
          </div>
        </div>
        <div className="positions-container">
          <label>Positions</label>
          <div className="positions">
            <button
              onClick={onNOffPosFilters}
              className={`all_button ${filterChecked.positions}`}
            >
              All
            </button>
            {filters?.positions?.map((p, i) => {
              const checked = p.value;

              return (
                <button
                  style={{
                    backgroundColor: checked ? `#${p.color}` : "white",
                    border: checked ? "none" : `2px solid #${p.color}`,
                    color: checked ? "white" : "#5a5a5a",
                  }}
                  className={`filterPos ${p.type} ${checked}`}
                  name={p.type}
                  value={p.value}
                  onClick={onClickPos}
                  key={`filterPos ${i}`}
                >
                  {p.type}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
