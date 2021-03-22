import { IObserver } from "../types";
import { of } from "./of";

describe("of operator", () => {
  it("should emit a sequence of numbers", (done) => {
    const source$ = of<number>(1, 2, 3, 4, 5);
    const actual: number[] = [1, 2, 3, 4, 5];

    let result: number[] = [];
    const observer: Partial<IObserver> = {
      next: (val: number) => {
        result = [...result, val];
      },
      complete: () => {
        expect(actual).toEqual(result);
        done();
      },
    };

    source$.subscribe(observer);
  });

  it("should emitting an object, array, and function", (done) => {
    const source$ = of<any>({ name: "Brian" }, [1, 2, 3], () => "Hello");
    const actual: any[] = [
      { name: "Brian" },
      [1, 2, 3],
      function hello(): string {
        return "Hello";
      },
    ];

    let result: any[] = [];
    const observer: Partial<IObserver> = {
      next: (val: any) => {
        result = [...result, val];
      },
      complete: () => {
        expect(actual.length).toEqual(result.length);
        expect(actual[0]).toEqual(result[0]);
        expect(actual[1]).toEqual(result[1]);
        expect(actual[2]()).toEqual(result[2]());
        done();
      },
    };
    source$.subscribe(observer);
  });
});
