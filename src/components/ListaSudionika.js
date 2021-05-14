import React from "react";

const ListaSudionika = ({ lista }) => {
  return (
    <div className='lista-sudionika'>
      <h4>Lista sudionika</h4>
      <ul>
        {lista.map((logiran, index) => {
          return <li key={index}>{logiran}</li>;
        })}
      </ul>
    </div>
  );
};

export default ListaSudionika;
