import React from "react";

const UnosNovePoruke = ({ dispatch, nickname, kanal, trenutnaSoba }) => {
  const dodajPoruku = () => {
    let uneseno = document.getElementById("unos").value;
    document.getElementById("unos").value = "";

    let time = new Date();
    let formatedTime =
      String(time.getHours()) + ":" + String(time.getMinutes());
    dispatch({
      type: `DODAVANJE_PORUKE_${trenutnaSoba[0]}`,
      payload: { name: nickname, time: formatedTime, text: uneseno },
    });
    kanal.trigger("client-nova-poruka", {
      name: nickname,
      time: formatedTime,
      text: uneseno,
      channel: trenutnaSoba[0],
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
