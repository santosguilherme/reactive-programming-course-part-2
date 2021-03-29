export interface IObserver<T = any> {
  next?(value: T): void;
  error?(error: any): void;
  complete?(): void;
}

export interface ISubscription {
  unsubscribe(): void;
}

export interface IProducer {
  (observer: Partial<IObserver>): ISubscription;
}
