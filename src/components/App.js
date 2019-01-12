import React, { Component } from "react";
import "../App.css";
import Nav from "./Nav";
import hogs from "../porkers_data";
import Hogs from "../Hogs";

const makeDataLessSilly = data =>
  data.map(h => {
    const {
      name,
      specialty,
      greased,
      "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": weight,
      "highest medal achieved": medal
    } = h;
    return {
      name,
      specialty,
      greased,
      weight,
      medal,
      showDetails: false
    };
  });

const hogData = makeDataLessSilly(hogs);

class App extends Component {
  state = {
    hogs: hogData,
    greased: "all",
    sortBy: "none",
    filterBy: 0
  };

  filterGresedHogs = () => this.state.hogs.filter(h => h.greased);

  toggleGreased = e => {
    const greased = e.target.value;
    this.setState({ greased });
  };

  handleSort = e => this.setState({ sortBy: e.target.value });

  applyGreasedFilter = () => {
    return this.state.greased === "all"
      ? this.state.hogs
      : this.filterGresedHogs();
  };

  toggleDetails = hogName => {
    const hogs = this.state.hogs.map(h => {
      return h.name === hogName ? { ...h, showDetails: !h.showDetails } : h;
    });
    this.setState({ hogs });
  };

  applyNameFilter = hogs => hogs.sort((a, b) => a.name.localeCompare(b.name));

  applyWeightFilter = hogs =>
    hogs.sort((a, b) => {
      if (a.weight > b.weight) {
        return 1;
      } else if (a.weight < b.weight) {
        return -1;
      } else {
        return 1;
      }
    });

  sortHogs = hogs => {
    const {
      state: { sortBy },
      applyNameFilter,
      applyWeightFilter
    } = this;

    switch (sortBy) {
      case "none": {
        return hogs;
      }
      case "name": {
        return applyNameFilter(hogs);
      }
      case "weight": {
        return applyWeightFilter(hogs);
      }
      default: {
        return hogs;
      }
    }
  };

  render() {
    const {
      toggleDetails,
      toggleGreased,
      handleSort,
      applyGreasedFilter,
      sortHogs,
      state: { hogs, greased, sortBy }
    } = this;

    return (
      <div className="App">
        <Nav
          toggleGreased={toggleGreased}
          greased={greased}
          handleSort={handleSort}
          sortBy={sortBy}
        />
        <Hogs
          hogs={sortHogs(applyGreasedFilter())}
          toggleDetails={toggleDetails}
        />
      </div>
    );
  }
}

export default App;
