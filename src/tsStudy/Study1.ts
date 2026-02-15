let a: number = 1;
let b: string = "hello";
let c: boolean = true;
let arr: Array<number> = [1, 2, 3];
let tuple: [number, string] = [1, "hello"];
let obj: { name: string; age: number } = { name: "Alice", age: 30 };
enum Color {
    Red=0,
    Green,
    Blue
}
let color: Color = Color.Green;


function add(x: number, y: number): number {
    console.log("Adding", x, "and", y);
  return x + y;
}