import { electronicFormatIBAN, isValidIBAN } from "ibantools";
import { BANCOS, DatosIBAN, pattern } from "./modelo";

export const validarIBAN = (iban: string): DatosIBAN => {
  if (validacionFormatoIBAN(iban)) {
    if (validacionIBANTools(iban)) {
      const datosBanco = obtenerDatos(iban);
      return datosBanco;
    } else {
      throw new Error("El IBAN no es válido.");
    }
  } else {
    throw new Error("El formato del IBAN no es válido.");
  }
};

export function validacionFormatoIBAN(iban: string): boolean {
  iban = eliminarEspaciosGuiones(iban);
  return pattern.test(iban);
}

export function validacionIBANTools(iban: string): boolean {
  const ibanReturned = electronicFormatIBAN(iban);
  if (ibanReturned) {
    iban = ibanReturned;
  }
  return isValidIBAN(iban);
}

export function eliminarEspaciosGuiones(iban: string): string {
  return iban.replaceAll(" ", "").replaceAll("-", "");
}

export function obtenerDatos(iban: string): DatosIBAN {
  iban = eliminarEspaciosGuiones(iban);
  const codigo_sucursal = iban.substring(8, 12);
  const codigo_control = iban.substring(12, 14);
  const cuenta = iban.substring(14, 24);
  const banco = obtenerBanco(iban.substring(4, 8));
  return {
    banco: banco,
    sucursal: codigo_sucursal,
    control: codigo_control,
    cuenta: cuenta,
  };
}

export function obtenerBanco(codigo_banco: string): string {
  const codigoBanco = codigo_banco as keyof typeof BANCOS;
  return BANCOS[codigoBanco] ? BANCOS[codigoBanco] : "Banco no encontrado";
}
