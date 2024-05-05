import { DatosIBAN } from "./modelo";
import { validarIBAN } from "./motor";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  iniciarFormulario();
});

const iniciarFormulario = () => {
  const formulario = document.querySelector("#formularioA");
  if (formulario && formulario instanceof HTMLFormElement) {
    formulario.addEventListener("submit", iniciarValidacion);
  } else {
    throw new Error("No se ha encontrado el formulario");
  }
};

export const iniciarValidacion = (event: Event): any => {
  event.preventDefault();
  const iban = document.querySelector("#iban");
  if (iban && iban instanceof HTMLInputElement) {
    try {
      const datosBanco = validarIBAN(iban.value);
      pintarDatosBanco(datosBanco);
    } catch (error) {
      const infoContainer = document.querySelector("#info-banco");
      if (infoContainer && infoContainer instanceof HTMLDivElement) {
        infoContainer.innerHTML = `
        <p>${error}</p>
      `;
      }
    }
  } else {
    throw new Error("Error al obtener el valor del input");
  }
};

export const pintarDatosBanco = (datosBanco: DatosIBAN) => {
  const infoContainer = document.querySelector("#info-banco");
  if (infoContainer && infoContainer instanceof HTMLDivElement) {
    infoContainer.innerHTML = `
    <p>El IBAN esta bien formado</p>
    <p>El IBAN es válido</p>
    <p><span>Banco: </span>${datosBanco.banco}</p>
    <p><span>Banco: </span>${datosBanco.banco}</p>
    <p>
    <span>Código Sucursal: </span>${datosBanco.sucursal}
    </p>
    <p><span>Dígito de control: </span>${datosBanco.control}</p>
    <p><span>Número cuenta: </span>${datosBanco.cuenta}</p>
  `;
  } else {
    throw new Error("Error al obtener el contenedor de infomación");
  }
};
