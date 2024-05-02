import { electronicFormatIBAN, isValidIBAN } from "ibantools";
import { BANCOS, DatosIBAN, pattern } from "./modelo";

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

function eliminarEspaciosGuiones(iban: string): string {
  return iban.replaceAll(" ", "").replaceAll("-", "");
}

export function obtenerDatos(iban: string): DatosIBAN {
  iban = eliminarEspaciosGuiones(iban);
  const codigo_sucursal = iban.substring(8, 12);
  const codigo_control = iban.substring(12, 14);
  const cuenta = iban.substring(14, 22);
  const banco = obtenerBanco(iban.substring(4, 8));
  return {
    banco: banco,
    sucurcal: codigo_sucursal,
    control: codigo_control,
    cuenta: cuenta,
  };
}

function obtenerBanco(codigo_banco: string): string {
  const codigoBanco = codigo_banco as keyof typeof BANCOS;
  console.log(BANCOS[codigoBanco]);
  return BANCOS[codigoBanco] ? BANCOS[codigoBanco] : "Banco no encontrado";
}
//     iban = iban.replace(" ", "").replace("-", "")
//     return iban[8:12]
