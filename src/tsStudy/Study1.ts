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