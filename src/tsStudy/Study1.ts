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
let anyValue: any = "hello";
let unknownValue: unknown = 123;
// 报错 类型未知，比 any 更安全
// unknownValue.toString();

let unionValue: number | string = "hello";
let nullValue: null = null;
let undefinedValue: undefined = undefined;

function add(x: number, y: number): number {
    console.log("Adding", x, "and", y);
    return x + y;
}
// add(1, 2);

// 当函数没有终止条件 或者 本身抛出异常的时候
function error(message: string): never {
    throw new Error(message);
}
function infiniteLoop(): never {
    while (true) {
    }
}

// 定义数据类型
type User = {
    name: string;
    age ?: number; // 可选属性
    [key: string]: unknown; // 允许任意属性
}
// ?? nullish coalescing operator
function getUserInfo(user: User): string {
    return `Name: ${user.name}, Age: ${user.age ?? "unknown"}`;
}

// 接口 表示传递给函数的参数 ，必须满足必要的条件
interface UserInterface {
    name: string;
    age ?: number;
    readonly id ?: number; // 只读属性
}
function getUserInfo2(user: UserInterface): string {
    return `Name: ${user.name}, Age: ${user.age ?? "unknown"}`;
}
let user: UserInterface = { name: "Bob", id: 123 };
console.log(getUserInfo2(user));

// 对象字面量只能指定已知的属性 error
// getUserInfo2({ name: "Charlie", age1: 25, id: 456 });

// 1.使用类型断言 规避检查 or 
// 2.使用变量中转 let user2 = { name: "Charlie", age1: 25, id: 456 };  getUserInfo2(user2);
getUserInfo2({ name: "Charlie", age1: 25 } as UserInterface);

// 3.索引签名 添加任意属性
interface UserInterface2 {
    name: string;
    [extraProp: string]: unknown; // 允许任意属性
} 
function getUserInfo3(user: UserInterface2): void {
    if (user.age1) {
        console.log(`Name: ${user.name}, Age: ${user.age1}`);
    } else if (user.id){
        console.log(`Name: ${user.name}, ID: ${user.id}`);
    }
}
getUserInfo3({ name: "Charlie", age1: 25, id: 456 });

// 使用interface 定义函数类型
interface AddFunction {
    (x: number, y: number): number;
}
let addFunction: AddFunction = (a, b) => a + b;
console.log(addFunction(1, 2));

// 可索引的类型 
interface StringArray {
    // js 最终会将索引转换为字符串，所以索引类型只能是 number 或 string
    [index: number]: string;
}
let myArray: StringArray = ["Alice", "Bob", "Charlie"];
console.log(myArray[0]); // 输出 "Alice"

// 明确定义的属性类型，必须能够“赋值”给索引签名的类型。
interface NumberDictionary {
    [index: string]: number;
    length: number; // 需要满足索引签名的约束
    // 当访问obj.name 时，引擎实际上执行的是 obj["name"]。 会出现冲突
    // name: string; // 错误，name 的类型不满足索引签名的约束
}

// interface 的构造函数签名
interface ClockConstructor {
    // 约定实现类必须包含一个构造函数，参数为 hour 和 minute，返回类型为 ClockInterface
    // 可以被 new 关键字调用，创建一个 ClockInterface 类型的实例
    new (hour: number, minute: number): ClockInterface;
}
// 实例侧接口
interface ClockInterface {
    tick(): void;
    name ?: string; // 可选属性
}

// error
// class ErrorClock implements ClockConstructor {
//     // static 、 constructor 属于静态侧，继承只会对实例侧进行检查，所以会报错
//     constructor(hour: number, minute: number) {
//     }
// }

// 1.工厂函数 第一个参数 ctor 必须符合 ClockConstructor 的标准
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}
// 并不是 java中的接口实现关系，ClockConstructor 只是一个类型约束，要求 DigitalClock 必须包含一个符合要求的构造函数
class DigitalClock implements ClockInterface {
    constructor(hour: number, minute: number) {
    }
    tick() {
        console.log("beep beep");
    }
}
const digitalClock = createClock(DigitalClock, 12, 17);
digitalClock.tick(); // 输出 "beep beep"

// 2. 使用类表达式
const AnalogClock: ClockConstructor = class implements ClockInterface {
    constructor(hour: number, minute: number) {
    }
    tick() {
        console.log("tick tock");
    }   
}
const analogClock = createClock(AnalogClock, 7, 30);
analogClock.tick(); // 输出 "tick tock"

// 接口间的多继承
interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}
let square = <Square>{};
square.color = "blue";
square.penWidth = 5.0;
square.sideLength = 10;

// 混合类型：既可以当函数又可以当对象
interface Counter {
    (start: number): string; // 👈 1. 调用签名：它是一个函数
    [key: string]: unknown;  // 👈 2. 索引签名：它也是一个可以有任意属性的对象
}

function getCounter(): Counter {
    let counter = function (start: number) {
        return `Counter started at ${start}`;
    } as Counter;
    counter.interval = 123;
    return counter;
}
let cter = getCounter();
console.log(cter(10)); // 输出 "Counter started at 10"
console.log(cter.interval); // 输出 123

// 类的构造函数 的 参数使用修饰 的时候，会自动创建一个同名的成员变量，并将参数的值赋给它
class Person {
    constructor(public name: string, private age: number) {
    }
    getAge(): number {
        return this.age;
    }   
}

// 只带有get不带有set的存取器自动被推断为readonly
class Employee {
    private _fullName: string = "";
    get fullName(): string {
        return this._fullName;
    }
    set fullName(newName: string) {
        this._fullName = newName;
    }
}
let employee = new Employee();
employee.fullName = "Bob Smith"; // 调用 set 访问器设置 fullName 的值
console.log(employee.fullName); // 输出 "Bob Smith"

// 对象的类型规范 使用；分隔
let point: { x: number; y: number } = { x: 10, y: 20 };

// 抽象类的操作和java类似，抽象类不能被实例化，必须被继承，子类必须实现抽象方法

// typeof : 获取一个变量或属性的类型
let myName: string = "Alice";
type MyNameType = typeof myName; // MyNameType 的类型是 string
let anotherName: MyNameType = "Bob"; // 另一个变量的类型与 myName 相同

// __proto__ 构成了链条，它是找东西的路线。
// prototype 提供了共享的内容给实例，__proto__ 是实例用来访问这些共享内容的途径。

// 定义一个函数类型
type functionType = (firstParam: string, secondParam?: number) => boolean; 
interface FunctionInterface {
    (firstParam: string, secondParam?: number): boolean;
}
let myFunction : functionType = (str, num) => {
    console.log(`String: ${str}, Number: ${num}`);
    return true;
}

// 箭头函数能保存函数创建时的this值，而不是调用时的值
// noImplicitThis: true 这个选项会禁止隐式的 this 类型，要求在函数中明确指定 this 的类型

function f(this: void) {
    // make sure `this` is unusable in this standalone function
}

interface clickHandler {
    // this 的类型必须是 MouseEvent，否则会报错
    (this: MouseEvent) : void;
}

class Handler {
    info: string;
    // 1.使用箭头函数，this 会被捕获到 Handler 实例上
    // 2. 箭头函数这里是一个类属性，每个 Handler 实例都会有一个独立的 onClickGood 函数，可能会增加内存开销
    onClickGood = (e: Event) => { }
    constructor() {
        this.info = "default";
    }
}

// 对象调用签名
interface ObjectWithCallSignature {
    (s: string): void; // 调用签名
    name: string; // 普通属性
}
let objWithCallSignature: ObjectWithCallSignature = (s: string) => {
    console.log(`Called with ${s}`);
}
// 或者
let objWithCallSignature2: {(s: string): void; name: string} = (s: string) => {
    console.log(`Called with ${s}`);
}

// 泛型
function identity<T>(arg: T): void {}

interface Lengthwise {
    length: number;
}


function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
// 这里没有触发多余字面量错误，在泛型extends 中类似java，只要满足约束条件就行，不需要完全匹配基类及其子类都行
loggingIdentity({length: 10, value: 3});

// 常数枚举
const enum Directions {
    Up,
    Down,
    Left,
    Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
console.log(directions); // 输出 [0, 1, 2, 3]

// 外部枚举
// 普通的 enum 在编译后会生成一段复杂的 JS 代码（即那个双向映射对象）。
// 但 declare enum 在编译后会完全消失。因为它只是一个“类型说明”
declare enum Enum {
    A = 1,
    B, // 会进行计算
    C = 2
}
let enumValue: Enum = Enum.B; // 这里的值是 2，因为 B 的值是 A 的值加 1，而 A 的值是 1
console.log(enumValue); // 输出 2

