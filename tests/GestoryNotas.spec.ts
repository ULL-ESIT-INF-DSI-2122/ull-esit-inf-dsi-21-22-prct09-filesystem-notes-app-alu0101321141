import 'mocha';
import { expect } from 'chai';
import { Notas } from '../src/Práctica/Notas';
import { GestorNotas } from '../src/Práctica/GestorNotas';

describe('pruebas Notas', () => {
  it('Pruebas para el funcionamiento  la clase: ', () => {
    const nota = new Notas("Recordatorio", "Clase DSI", "Green");
    expect(nota).not.to.be.null;
  });
  it('Pruebas Getters', () => {
    const nota = new Notas("Recordatorio", "Clase DSI", "green");
    expect(nota.getTitle()).to.eq("Recordatorio");
    expect(nota.getBody()).to.eq("Clase DSI");
    expect(nota.getColor()).to.eq("green");
  });
  it('Prueba setters', () => {
    const nota = new Notas("Recordatorio", "Clase DSI", "Green");
    expect(nota.getColor()).to.eq("yellow");
    nota.setTitle("hola");
    expect(nota.getTitle()).to.eq("hola");
    nota.setBody("adios");
    expect(nota.getBody()).to.eq("adios");
    nota.setColor("verde");
    expect(nota.getColor()).to.eq("green");
    nota.setColor("rojo");
    expect(nota.getColor()).to.eq("red");
    nota.setColor("azul");
    expect(nota.getColor()).to.eq("blue");
    nota.setColor("amarillo");
    expect(nota.getColor()).to.eq("yellow");
    nota.setColor("morado");
    expect(nota.getColor()).to.eq("yellow");
  });
});

describe('pruebas Clase Gestor de Notas', () => {
  it('Pruebas para el funcionamiento constructor de la clase: ', () => {
    const gestor = new GestorNotas();
    expect(gestor).not.to.be.null;
  });
  it("Prueba para el funcionamiento de añadir una nota", () => {
    const gestor = new GestorNotas();
    const nota = new Notas("Recordatorio", "Clase DSI", "red");
    const nota2 = new Notas("Alarma", "Comprar la alarma", "azul");
    const nota3 = new Notas("Recado", "Ir a comprar aceite", "amarillo");
    expect(gestor.addNotes('Pablo', nota)).to.eq("correcto");
    expect(gestor.addNotes('Pepe', nota)).to.eq("correcto");
    expect(gestor.addNotes('Pablo', nota)).to.eq("error");
    expect(gestor.addNotes('Pablo', nota2)).to.eq("correcto");
    expect(gestor.addNotes('Pablo', nota3)).to.eq("correcto");
  });
  it("Prueba para el funcionamiento de modificar una nota", () => {
    const gestor = new GestorNotas();
    const nota = new Notas("Alarma", "Instalar la alarma", "azul");
    const nota1 = new Notas("Compra", "hacer la compra", "red");
    expect(gestor.modifyNote('Pablo', nota)).to.eq("correcto");
    expect(gestor.modifyNote('Pablo', nota1)).to.eq("error");
    expect(gestor.modifyNote('Pepe', nota)).to.eq("error");
  });
  it("Prueba para el funcionamiento de eliminar una nota", () => {
    const gestor = new GestorNotas();
    expect(gestor.deleteNote('Pablo', "Recado")).to.eq("correcto");
    expect(gestor.deleteNote('Pepe', "Compra")).to.eq("error");
  });
  it("Prueba para el funcionamiento de listar los títulos de las notas", () => {
    const gestor = new GestorNotas();
    const nota = new Notas("Loteria", "Ir a comprar loteria", "amarillo");
    const nota1 = new Notas("Mensaje", "Enviar mensaje a pedro", "verde");
    gestor.addNotes('Pablo', nota);
    gestor.addNotes('Pablo', nota1);
    expect(gestor.listTitles('Pablo')).to.eq("correcto");
    expect(gestor.listTitles('Pedro')).to.eq("error");
  });
  it("Prueba para el funcionamiento de listar los títulos de las notas", () => {
    const gestor = new GestorNotas();
    expect(gestor.listNote('Pablo', "Alarma")).to.eq("correcto");
    expect(gestor.listNote('Pablo', "Loteria")).to.eq("correcto");
    expect(gestor.listNote('Pepe', "Saludos")).to.eq("error");
    expect(gestor.listNote('Pedro', "londres")).to.eq("error");
  });
});
