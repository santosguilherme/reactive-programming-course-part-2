import { Observable } from "./observable";
import { IObserver, IProducer } from "../types";

export function mapTo(source: Observable, mappedValue: unknown) {
    const producer: IProducer = (observer: IObserver) => {
        const sub = source.subscribe({
            next() {
                observer.next(mappedValue);
            },
            complete() {},
        });

        return {
            unsubscribe: () => {
                sub.unsubscribe();

                if (typeof observer.complete === 'function') {
                    observer.complete();
                }
            }
        };
    };

    return new Observable(producer);
}
