import React from "react";
import "./style/profileIcon.css";
import { FaCircle } from "react-icons/fa";

export const ProfileIcon = (props) => {
  const { position } = props;
  // console.log('props', position)
  return (
    <>
      <div className="icon">
        <p className="initial">{position?.type?.charAt(0)}</p>
        <FaCircle color={position?.color} width="2rem" height="2rem" />
      </div>
    </>
  );
};
