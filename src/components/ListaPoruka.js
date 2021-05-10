import React from "react";

const ListaPoruka = ({ lista }) => {
  return (
    <div>
      {lista.map((poruka, index) => {
        return (
          <div key={index} className='poruka'>
            <div className='poruka-time'>{poruka.time}</div>
            <div className='poruka-ime'>{poruka.name}</div>
            <div className='poruka-text'>{poruka.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ListaPoruka;
