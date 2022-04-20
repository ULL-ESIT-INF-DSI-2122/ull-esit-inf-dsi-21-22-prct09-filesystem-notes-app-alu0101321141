import {MapReduceAlgorithm} from './MapReduceAlgorithm';

export class SubtractMapReduce extends MapReduceAlgorithm {
  /**
   * constructor
   * @param numberV numberos
   * @param ReducedValue reduce el valor
   * @param addNum suma
   */
  constructor(protected numberV: number[], ReducedValue: number,
    protected subNum: number) {
    super(numberV, ReducedValue);
  }

  /**
  * getter.
  */
  getnumberV() {
    return this.numberV;
  }

  /**
   * reduce
   * @param vector vector
   * @param value valor
   * @returns valor
   */
  protected reduce(vector: number[], value: number): number {
    let resta:number = 0;
    vector.forEach((element) => {
      resta = resta - (element - value);
    });
    return resta;
  }

  /**
   * resta
   */
  protected substract() {
    this.numberV.forEach((element) => {
      return element = element - this.subNum;
    });
  }
}
