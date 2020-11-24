import React from "react";
import './List.css';

const List = (props) => {
  const  { records } = props;

  return (<div className="list">
    {records.map(record => (
      <div key={record.mission_name} className="item">
        <img className="img-class" src={record.links.mission_patch_small} alt={record.mission_name} />
        <div className="detail">
          <span className="detail-head">{record.mission_name}</span>
          <span className="detail-title">Mission Ids</span>
          <ul>
            {
              record.mission_id.map(id => (
                <li key={id} >{id}</li>
              ))
            }
          </ul>
          <span className="detail-title">Launch year: <label className="sub-section">{record.launch_year}</label></span>
          <span className="detail-title">Successful launch: <label className="sub-section">{record.launch_success && record.launch_success.toString()}</label></span>
          <span className="detail-title">Successful landing: <label className="sub-section">{record.landing_success}</label></span>
        </div>
      </div>
    ))}
  </div>);
};

export default List;
