import React from "react";

const ListaPoruka = ({ lista, nickname }) => {
  return (
    <div>
      {lista.map((poruka, index) => {
        if (poruka.name === nickname) {
          return (
            <div key={index} className='poruka-moja'>
              <div className='poruka-ime-moja'>{poruka.name}</div>
              <div className='poruka-time-text'>
                <div className='poruka-time-moja'>{poruka.time}</div>
                <div className='poruka-text'>{poruka.text}</div>
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className='poruka'>
              <div className='poruka-ime'>{poruka.name}</div>
              <div className='poruka-time-text'>
                <div className='poruka-time'>{poruka.time}</div>
                <div className='poruka-text'>{poruka.text}</div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ListaPoruka;
