import { IObserver, IProducer, ISubscription } from "../types";

export class Observable {
    internalProducer: IProducer;

    constructor(producer: IProducer) {
        this.internalProducer = producer;
    }

    subscribe(observer: IObserver): ISubscription {
        return this.producer(observer);
    }

    producer(observer: IObserver): ISubscription {
        return this.internalProducer(observer);
    }
}
