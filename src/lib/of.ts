import { IObserver, IProducer } from "../types";
import { Observable } from "./observable";

export function of<T>(...args: T[]) {
  const producer: IProducer = (observer: IObserver) => {

    args.forEach(observer.next);

    if (typeof observer.complete === 'function') {
      observer.complete();
    }

    return {
      unsubscribe: () => {}
    };
  };

  return new Observable(producer);
}
