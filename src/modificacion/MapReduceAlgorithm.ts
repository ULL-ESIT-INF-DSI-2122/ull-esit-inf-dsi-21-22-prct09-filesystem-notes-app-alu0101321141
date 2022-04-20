/**
 * Clase abstracta.
 */
export abstract class MapReduceAlgorithm {
  /**
   * Cosntructor
   * @param numberV vector a operar
   * @param ReducedValue numero al que reducir
   */
  constructor(protected numberV:number[], protected ReducedValue:number) {
  }

  /**
   * metodo template. Se encargará de realizar la operación
   * map y posteriormente reduce
   */
  run() {
    // HOOK
    this.add();
    this.substract();
    this.numberV = this.map(this.numberV, (x:number) => {
      return x * 2;
    });
    const resultado:number = this.reduce(this.numberV, this.ReducedValue);
    return resultado;
  }

  /**
   * Función map.
   */
  protected map(vector:number[], funcion1: { (x: number): number;
    (arg0: number): number; }) {
    vector.forEach( (element:number) => {
      return funcion1(element);
    });
    return vector;
  }

  /**
   * Funcion reduce
   */
  protected abstract reduce(vector: number[], reducedValue:number):number;

  /**
   * Función add opcional.
   */
  protected add() {}

  /**
   * Funcion producto opcional
   */
  protected substract() {}
}

