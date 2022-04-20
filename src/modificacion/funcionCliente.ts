import {MapReduceAlgorithm} from './MapReduceAlgorithm';

/**
 * Funcion cliente
 * @param operacion
 * @returns resultado del run
 */
export function funcionCliente(operacion:MapReduceAlgorithm) {
  return operacion.run();
}
