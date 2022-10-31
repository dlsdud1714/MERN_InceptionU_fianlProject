import React from "react";

const TableGrid = (props) => {
  const {hrs} = props;
  const flexboxes = (division) => {
    let i = 0;
    const boxes = [];
    while (i < division) {
      let color
      const findstyle = (i) => {
        if ((i+1) % 2 === 0) {
          return color={ backgroundColor: "rgba(230, 235, 230, 0.15)" };
        }
      };
      findstyle(i);

      boxes.push(<div  style={color}></div>);
      i++;
    }
    // console.log("boxes",boxes)
    return boxes;
  };
  return <div className="gridLines">{flexboxes(hrs/2)}</div>;
};

export default TableGrid;
