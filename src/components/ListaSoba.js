import React from "react";

const ListaSoba = ({ sobe, dispatch }) => {
  const promijeniSobu = (index, soba) => {
    dispatch({
      type: "PROMJENA_SOBE",
      payload: [soba, index],
    });
  };
  return (
    <div className='lista-soba'>
      <h4>Lista Soba</h4>
      <ul>
        {sobe.map((soba, index) => {
          return (
            <li key={index} onClick={() => promijeniSobu(index, soba)}>
              {soba}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListaSoba;
