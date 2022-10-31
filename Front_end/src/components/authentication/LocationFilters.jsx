import React from "react";

const LocationFilters = (props) => {
  const { profiles, onFilterChange, state } = props;

  return (
    <section className="filters" aria-labelledby="filters-header">
      {/* <header id="filters-header">{"Filters"}</header> */}

      <ul>
        {profiles.map((profile, index) => (
          <li key={profile}>
            <label>
              <input
              checked={state.includes(profile)}
                onChange={onFilterChange}
                type="checkbox"
                value={profile}
              />
              {profile}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LocationFilters;
