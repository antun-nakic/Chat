import React from "react";

const ListaSudionika = ({ lista, dispatch, kanal, nickname }) => {
  const zapocniPrivatniChat = (ime) => {
    dispatch({ type: `DODAVANJE_PRIVATNOG_CHATA`, payload: ime });
    kanal.trigger("client-start-private-chat", {
      initiator: nickname,
      target: ime,
    });
  };
  return (
    <div className='lista-sudionika'>
      <h4>Lista sudionika</h4>
      <ul>
        {lista.map((logiran, index) => {
          return (
            <li key={index} onClick={() => zapocniPrivatniChat(logiran)}>
              {logiran}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListaSudionika;
