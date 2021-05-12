import React from "react";

const UnosNovePoruke = ({ dispatch, nickname }) => {
  const dodajPoruku = () => {
    let uneseno = document.getElementById("unos").value;
    document.getElementById("unos").value = "";

    let time = new Date();
    let formatedTime =
      String(time.getHours()) + ":" + String(time.getMinutes());
    dispatch({
      type: "DODAVANJE_PORUKE",
      payload: { name: nickname, time: formatedTime, text: uneseno },
    });
  };

  return (
    <div className='unos-nove-poruke'>
      <input type='text' className='unos-text' name='unos' id='unos'></input>
      <button type='button' className='unos-botun' onClick={dodajPoruku}>
        Pošalji
      </button>
    </div>
  );
};

export default UnosNovePoruke;
