import React from "react";

const ListaSoba = ({ sobe, dispatch }) => {
  const promijeniSobu = (index, soba) => {
    dispatch({
      type: "PROMJENA_SOBE",
      payload: [soba, index],
    });
  };
  let ind;
  return (
    <div className='lista-soba'>
      <h4>Lista Soba</h4>
      <ul>
        {sobe.map((soba, index) => {
          if (index > 5) ind = 5;
          else ind = index;
          return (
            <li key={index} onClick={() => promijeniSobu(ind, soba)}>
              {soba}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListaSoba;
