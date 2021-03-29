import { Observable } from "./observable";
import { IObserver, IProducer } from "../types";

export function merge(first: Observable, second: Observable) {
    const producer: IProducer = (observer: IObserver) => {

        const internalObserver = {
            next(value: any) {
                observer.next(value);
            },
            complete() {},
        };

        const firstSub = first.subscribe(internalObserver);
        const secondSub = second.subscribe(internalObserver);

        return {
            unsubscribe: () => {
                firstSub.unsubscribe();
                secondSub.unsubscribe();

                if (typeof observer.complete === 'function') {
                    observer.complete();
                }
            }
        };
    };

    return new Observable(producer);
}
