import {MapReduceAlgorithm} from './MapReduceAlgorithm';

/**
 * Clase addMapReduce
 */
export class AddMapReduce extends MapReduceAlgorithm {
  /**
   * Constructor
   * @param numberV vector
   * @param ReducedValue valor a reducir
   * @param addNum numero que añade
   */
  constructor(protected numberV: number[], ReducedValue: number,
    protected addNum:number) {
    super(numberV, ReducedValue);
  }

  /**
  * getter.
  */
  getnumberV() {
    return this.numberV;
  }

  /**
   * Metodo para reducir
   * @param vector vector
   * @param value valor
   * @returns vector reducido
   */
  protected reduce(vector: number[], value: number): number {
    let suma:number = 0;
    vector.forEach((element) => {
      suma = suma + (element + value);
    });
    return suma;
  }

  /**
   * funcion add
   */
  protected add() {
    this.numberV.forEach((element) => {
      return element = element + this.addNum;
    });
  }
}
