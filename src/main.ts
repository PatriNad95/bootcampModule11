import { DatosIBAN } from "./modelo";
import {
  burcarImgs,
  contruirHTMLBanco,
  contruirHTMLImg,
  validarIBAN,
} from "./motor";
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
  const formularioB = document.querySelector("#formularioB");
  if (formularioB && formularioB instanceof HTMLFormElement) {
    formularioB.addEventListener("submit", validarTxt);
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
    infoContainer.innerHTML = contruirHTMLBanco(datosBanco);
  } else {
    throw new Error("Error al obtener el contenedor de infomación");
  }
};

export const validarTxt = (event: Event): any => {
  event.preventDefault();
  const txt = document.querySelector("#txthtml");
  if (txt && txt instanceof HTMLTextAreaElement) {
    try {
      const urlImg = burcarImgs(txt.value);
      pintarDatosImg(urlImg);
    } catch (error) {
      const infoContainer = document.querySelector("#info-img");
      if (infoContainer && infoContainer instanceof HTMLDivElement) {
        infoContainer.innerHTML = `
        <p>${error}</p>
      `;
      }
    }
  } else {
    throw new Error("Error al obtener el valor del textArea");
  }
};

export const pintarDatosImg = (arrayImg: string[]) => {
  const infoContainer = document.querySelector("#info-img");
  if (infoContainer && infoContainer instanceof HTMLDivElement) {
    infoContainer.innerHTML = contruirHTMLImg(arrayImg);
  } else {
    throw new Error("Error al obtener el contenedor de infomación");
  }
};
