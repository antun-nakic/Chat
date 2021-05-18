import React, { useEffect } from "react";

const ListaPoruka = ({ lista, Soba, nickname }) => {
  useEffect(() => {
    let objDiv = document.getElementById("lista-poruka");
    console.log(objDiv.scrollHeight);
    objDiv.scrollTop = objDiv.scrollHeight;
  });

  return (
    <div className='lista-poruka' id='lista-poruka'>
      <h4>Trenutno ste u sobi: {Soba[0]}</h4>
      {lista[Soba[1]].map((poruka, index) => {
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
