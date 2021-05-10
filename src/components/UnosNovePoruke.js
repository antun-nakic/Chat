import React from "react";

const UnosNovePoruke = ({ funkcija }) => {
  const dodajPoruku = () => {
    let uneseno = document.getElementById("unos").value;
    funkcija(uneseno);
    console.log(uneseno);
    document.getElementById("unos").value = "";
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
