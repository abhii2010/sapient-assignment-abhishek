import React from "react";
import './Filter.css';

const Filter = (props) => {
  const yearList = ['2006', '2007', '2008', '2009', '2010', '2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'];
  const { filterData } = props;
  
  return (
    <div className="filter">
      <span className="title">Filters</span>
      <div className="filterTitle">Launch Year</div>
      <div className="button-container">
        {
          yearList.map(year => {
            return (
              <button key={year} onClick={() => filterData(year, 'launch_year')} className="btn">{year}</button>
            )
          })
        }
      </div>
      <div className="filterTitle">Successful Launch</div>
      <div className="button-container">
        <button onClick={() => filterData(true, 'launch_success')} className="btn">True</button>
        <button onClick={() => filterData(false, 'launch_success')} className="btn">False</button>
      </div>
      <div className="filterTitle">Successful Landing</div>
      <div className="button-container">
        <button onClick={() => filterData(true, 'landing_success')} className="btn">True</button>
        <button onClick={() => filterData(false, 'landing_success')} className="btn">False</button>
      </div>
    </div>
  );
};

export default Filter;
