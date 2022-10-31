import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginProvider";
import Location from "./Location";
import { StoreContext } from "./StoreProvider";
import "./LocationSelection.css";
import LocationFilters from "./LocationFilters";
import setPositionColorList from "../Reusables/functions/setPositionColorList";


const LocationSelection = (props) => {
  const authContext = useContext(LoginContext);
  const storeContext = useContext(StoreContext);
  const user = authContext.user;
  const [allStores, setAllStores] = useState([]);
  const navigate = useNavigate();
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [state, setState] = useState([]);
  useEffect(() => {
    const getStore = async (theUser) => {
      let userToSend = JSON.stringify(theUser);
      // console.log("sending userId: " + userToSend);
      const response = await fetch("/api/storeselection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userToSend,
      });
      const data = await response.text();
      console.log("getting store data", data);
      const userData = JSON.parse(data);
      // console.log(response);
      setAllStores(userData);
      // console.log("we have the user data", userData);
    };
    if (user) {
      getStore(user);
    }
  }, [user]);

  useEffect(() => {
    let newStores = allStores.filter((profile) =>
      profile.store.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    newStores = newStores.filter((profile) =>
      state.includes(profile.store.province)
    );
    setFilteredStores(newStores);
    
  }, [searchTerm, allStores, state]);

  const profiles = async(profile) => {
    
    let dataToSend = JSON.stringify(profile);
    // console.log("sending userId: " + userToSend);
    const response = await fetch("/api/getAllPositions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataToSend,
    });
    const data = await response.json();
    console.log("getting position", data);
    const colorNpos = setPositionColorList(data);
    storeContext.setPositions(colorNpos);
    storeContext.setStore(profile);
    navigate("/calendar");
    // console.log("the selected profile is", profile);
  };
  useEffect(() => {
    let theProvinces = [...new Set(allStores.map((store) => store.store.province))];
    setState(theProvinces)
    setProvinces(theProvinces);
  }, [allStores]);

  const handleFilterChange = (event) => {
    console.log("filter change", event.target.value);
    setState((prevState) => {
      let filters = [...prevState];

      if (event.target.checked) {
        filters.push(event.target.value);
      } else {
        filters = filters.filter((filter) => filter !== event.target.value);
      }

      console.log("filters", filters);
      return filters;
    });
  };
  console.log("the state is", state);
  // console.log("this is the store context", storeContext)
  return (
    <div>
      <h1 className="location-header"> Please select your location: </h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        style={{ marginTop: "20px" }}
      />
      <LocationFilters
        state={state}
          profiles={provinces}
          onFilterChange={handleFilterChange}
        />
      <div className="location-container">
        
        {filteredStores ? (
          filteredStores.map((profile, index) => {
            return (
              <button
                key={profile.store.name}
                className="location-button"
                onClick={() => {
                  profiles(profile);
                }}
              >
                <Location selectedProfile={profile} />
              </button>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default LocationSelection;
