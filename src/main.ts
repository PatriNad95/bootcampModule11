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

export const iniciarValidacion = (): any => {
  const iban = document.querySelector("#iban");
  if (iban && iban instanceof HTMLInputElement) {
    const datosBanco = validarIBAN(iban.value);
    pintarDatosBanco(datosBanco);
  } else {
    throw new Error("Error al obtener el título");
  }
};

export const pintarDatosBanco = (datosBanco: DatosIBAN) => {
  const banco = document.querySelector("#banco");
  if (banco && banco instanceof HTMLHeadingElement) {
    banco.innerHTML = datosBanco.banco;
  } else {
    throw new Error("Error al obtener el título");
  }
};
