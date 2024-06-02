import {
  validarIBAN,
  validacionFormatoIBAN,
  validacionIBANTools,
  eliminarEspaciosGuiones,
  obtenerDatos,
  obtenerBanco,
  contruirHTMLBanco,
  burcarImgs,
  contruirHTMLImg,
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

describe("contruirHTMLBanco", () => {
  it("debería construir HTML correcto con datos del banco", () => {
    const datosBanco = {
      banco: "Banco Ejemplo",
      sucursal: "1234",
      control: "56",
      cuenta: "7890123456",
    };

    const resultado = contruirHTMLBanco(datosBanco);
    const expectedOutput = `
  <p>El IBAN está bien formado</p>
  <p>El IBAN es válido</p>
  <p><span>Banco: </span>Banco Ejemplo</p>
  <p>
  <span>Código Sucursal: </span>1234
  </p>
  <p><span>Dígito de control: </span>56</p>
  <p><span>Número cuenta: </span>7890123456</p>
  `;

    expect(resultado.replace(/\s+/g, "")).toBe(
      expectedOutput.replace(/\s+/g, "")
    );
  });
});

describe("burcarImgs", () => {
  it("debería extraer enlaces de imágenes correctamente", () => {
    const inputHTML = `
      <img src="http://localhost:3000/./patrona.jpg" alt="Imagen 1">
      <img src="http://localhost:3000/./bestiajez.webp" alt="Imagen 2">
    `;

    const resultado = burcarImgs(inputHTML);

    expect(resultado).toEqual([
      "http://localhost:3000/./patrona.jpg",
      "http://localhost:3000/./bestiajez.webp",
    ]);
  });
});

describe("contruirHTMLImg", () => {
  it("debería construir HTML correcto con enlaces de imágenes", () => {
    const arrayImg = [
      "http://localhost:3000/./bestiajez.webp",
      "http://localhost:3000/./patrona.jpg",
    ];

    const resultado = contruirHTMLImg(arrayImg);

    expect(resultado).toBe(
      "<p>http://localhost:3000/./bestiajez.webp</p><p>http://localhost:3000/./patrona.jpg</p>"
    );
  });
});
