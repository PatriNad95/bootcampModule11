import {
  validarIBAN,
  validacionFormatoIBAN,
  validacionIBANTools,
  eliminarEspaciosGuiones,
  obtenerDatos,
  obtenerBanco,
} from "./motor";

describe("validarIBAN", () => {
  it("debería retornar datos IBAN válidos", () => {
    const iban = "ES9121000418450200051332";
    expect(validarIBAN(iban)).toEqual({
      banco: "Caixabank",
      sucursal: "0418",
      control: "45",
      cuenta: "0200051332",
    });
  });

  it("debería lanzar un error si el IBAN no tiene el formato correcto", () => {
    const iban = "ES9121000418450200051332x";
    expect(() => {
      validarIBAN(iban);
    }).toThrow("El formato del IBAN no es válido.");
  });

  it("debería lanzar un error si el IBAN no es válido", () => {
    const iban = "ES8021000418450200051332";
    expect(() => {
      validarIBAN(iban);
    }).toThrow("El IBAN no es válido.");
  });
});

describe("validacionFormatoIBAN", () => {
  it("debería retornar true si el formato del IBAN es válido", () => {
    const iban = "ES9121000418450200051332";
    expect(validacionFormatoIBAN(iban)).toBe(true);
  });

  it("debería retornar false si el formato del IBAN no es válido", () => {
    const iban = "ES9121000418450200051332x";
    expect(validacionFormatoIBAN(iban)).toBe(false);
  });
});

describe("validacionIBANTools", () => {
  it("debería retornar true si el IBAN es válido", () => {
    const iban = "ES9121000418450200051332";
    expect(validacionIBANTools(iban)).toBe(true);
  });

  it("debería retornar false si el IBAN no es válido", () => {
    const iban = "ES8021000418450200051332";
    expect(validacionIBANTools(iban)).toBe(false);
  });
});

describe("eliminarEspaciosGuiones", () => {
  it("debería eliminar espacios y guiones de un IBAN", () => {
    const iban = "ES91 2100 0418 4502 0005 1332";
    expect(eliminarEspaciosGuiones(iban)).toBe("ES9121000418450200051332");
  });
});

describe("obtenerDatos", () => {
  it("debería retornar los datos correctos de un IBAN", () => {
    const iban = "ES9121000418450200051332";
    expect(obtenerDatos(iban)).toEqual({
      banco: "Caixabank",
      sucursal: "0418",
      control: "45",
      cuenta: "0200051332",
    });
  });
});

describe("obtenerBanco", () => {
  it("debería retornar el nombre correcto del banco", () => {
    const codigo_banco = "2100";
    expect(obtenerBanco(codigo_banco)).toBe("Caixabank");
  });

  it('debería retornar "Banco no encontrado" si el código de banco no existe en la lista', () => {
    const codigo_banco = "9999";
    expect(obtenerBanco(codigo_banco)).toBe("Banco no encontrado");
  });
});
