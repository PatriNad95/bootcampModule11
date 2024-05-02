import {
  obtenerDatos,
  validacionFormatoIBAN,
  validacionIBANTools,
} from "./motor";

export const validarIBAN = (iban: string): any => {
  if (validacionFormatoIBAN(iban)) {
    if (validacionIBANTools(iban)) {
      console.log(obtenerDatos(iban));
    } else {
      console.log("El IBAN no es válido.");
    }
  } else {
    console.log("El formato del IBAN no es válido.");
  }
};

validarIBAN("ES6621000418401234567891");
