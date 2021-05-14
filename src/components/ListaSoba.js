import React from "react";

const ListaSoba = ({ sobe }) => {
  return (
    <div className='lista-soba'>
      <h4>Lista Soba</h4>
      <ul>
        {sobe.map((soba, index) => {
          return <li key={index}>{soba}</li>;
        })}
      </ul>
    </div>
  );
};

export default ListaSoba;
