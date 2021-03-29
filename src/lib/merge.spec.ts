import { merge } from "./merge";
import { IObserver, ISubscription } from "../types";
import { interval } from "./interval";
import { Observable } from "./observable";

describe("Merge function", () => {
  it("should be a function", () => {
    expect(typeof merge).toBe("function");
  });

  it("should take 2 observables as arguments", () => {
    expect(merge.length).toEqual(2);
  });

  const observer: Partial<IObserver> = { next() {} };
  it("should return an observable", () => {
    // Given
    const interval1$ = interval(100);
    const interval2$ = interval(200);

    // When
    const merge$ = merge(interval1$, interval2$);
    const subscription = merge$.subscribe(observer);

    // Then
    expect(merge$.subscribe).toBeTruthy();
    expect(typeof merge$.subscribe).toEqual("function");

    expect(subscription).toBeTruthy();
    expect(typeof subscription.unsubscribe).toEqual("function");
    expect(typeof subscription.unsubscribe).toEqual("function");
  });

  it("should emit each time one of the observable emits data", (done) => {
    // Given
    const interval1$ = interval(100);
    const interval2$ = interval(200);
    const actual: number[] = [];
    const expected: number[] = [0, 0, 1, 2];

    // Then
    const observer: Partial<IObserver> = {
      next(value: number) {
        actual.push(value);
      },
    };

    // When
    merge(interval1$, interval2$).subscribe(observer);

    setTimeout(() => {
      expect(expected).toEqual(actual);
      done();
    }, 400);
  });

  it("should unsubscribe from all the observables when unsubscribe has been called then complete", (done) => {
    // Given
    let count = 0;
    const obs$ = new Observable(
      (observer: IObserver): ISubscription => {
        return {
          unsubscribe() {
            count++;
          },
        };
      }
    );

    // Then
    const observer: Partial<IObserver> = {
      complete() {
        expect(count).toEqual(2);
        done();
      },
    };

    // When
    const subscription = merge(obs$, obs$).subscribe(observer);

    subscription.unsubscribe();
  });
});
