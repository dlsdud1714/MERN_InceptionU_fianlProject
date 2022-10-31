import React from "react";

const WeeklyFilters = ({ filter, filterList, setFilter }) => {
  const filterChange = (e) => {
    const { value } = e.target;
    setFilter((pre) => {
      return value;
    });
  };

  return (
    <div className="Display-filters-container">
      <label className="Filter-legend">Filter by:</label>
      {filterList?.map((ele, i) => {
        // console.log("filter", filter);
        return (
          <React.Fragment key={`Display-filters ${i}`}>
            <input
              key={`filter ${i}`}
              type="radio"
              name="filter"
              onChange={filterChange}
              value={ele}
              checked={ele===filter}
            />
            <label key={`filter-label ${i}`} htmlFor={ele}>
              {ele}
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default WeeklyFilters;
