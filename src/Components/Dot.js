import React from "react"

const Dot = (props) => {
  return (
    <div>
      <div className="dot" onClick={props.dotClickHandle}>Dot Component</div>
    </div>
  )
};

export default Dot;
