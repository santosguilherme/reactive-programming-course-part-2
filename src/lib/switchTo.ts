import { Observable } from "./observable";
import { IObserver, IProducer, ISubscription } from "../types";

export function switchTo(from$: Observable, to$: Observable) {
  const producer: IProducer = (observer: IObserver) => {
    let toSub: ISubscription;

    const fromSub = from$.subscribe({
      next(): any {},
      complete(): any {
        toSub = to$.subscribe({
          next(value: any): any {
            observer.next(value);
          },
          complete(): any {
            if (typeof observer.complete === 'function') {
              observer.complete();
            }
          }
        });
      }
    });

    return {
      unsubscribe: () => {
        fromSub.unsubscribe();
        toSub.unsubscribe();
      }
    };
  };

  return new Observable(producer);
}
