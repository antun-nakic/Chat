import React from "react";

const Logout = ({ kanal, nickname }) => {
  const odjaviSe = () => {
    kanal.trigger("client-logout", nickname);
    window.location.reload();
  };
  return (
    <div className='logout' onClick={odjaviSe}>
      <i
        class='fas fa-power-off'
        style={{
          fontSize: "2rem",
          position: "relative",
          top: "50%",
          transform: "translateY(-50%)",
        }}></i>
    </div>
  );
};

export default Logout;
