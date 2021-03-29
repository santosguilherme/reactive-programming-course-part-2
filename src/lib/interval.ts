import {IObserver, IProducer} from "../types";
import {Observable} from "./observable";

export function interval(period: number) {
  const producer: IProducer = (observer: IObserver) => {
    let counter = 0;

    const id = setInterval(() => {
      observer.next(counter++);
    }, period);

    return {
      unsubscribe: () => {
        clearInterval(id);

        if (typeof observer.complete === 'function') {
          observer.complete();
        }
      }
    };
  };

  return new Observable(producer);
}
