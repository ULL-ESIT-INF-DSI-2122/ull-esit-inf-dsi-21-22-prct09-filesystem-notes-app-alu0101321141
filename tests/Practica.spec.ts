import 'mocha';
import { expect } from 'chai';
import { SubtractMapReduce } from '../src/modificacion/substractMapReduce';
import { AddMapReduce } from '../src/modificacion/addMapReduce';
import { funcionCliente } from '../src/modificacion/funcionCliente';

describe('pruebas addMap', () => {
  it('Pruebas para addMapReduce', () => {
    const addMap = new AddMapReduce([1, 2, 3], 2, 1);
    expect(addMap).not.eq(null);
  });
  it('Funcion run', () => {
    const addMap = new AddMapReduce([1, 2, 3], 2, 1);
    expect(addMap.getnumberV()).to.eql([1, 2, 3]);
    expect(funcionCliente(addMap)).to.eql(12);
  });
});

describe('pruebas substractMap', () => {
  it('Pruebas para addMapReduce', () => {
    const addMap = new SubtractMapReduce([1, 2, 3], 2, 1);
    expect(addMap).not.eq(null);
  });
  it('Funcion run', () => {
    const addMap = new SubtractMapReduce([1, 2, 3], 2, 1);
    expect(addMap.getnumberV()).to.eql([1, 2, 3]);
    expect(funcionCliente(addMap)).to.eql(0);
  });
});
