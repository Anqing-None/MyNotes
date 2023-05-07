const a : number = 999;

console.log('a', a)


type Person = {
  name: string;
  age: number;
}

const xiaoming: Person = {
  name: "12",
  age: 22
}

const message: string = ''


message.toLowerCase();
message()


const announcement = "Hello World!";

// How quickly can you spot the typos?
announcement.toLocaleLowercase();
announcement.toLocalLowerCase();

// We probably meant to write this...
announcement.toLocaleLowerCase();

const value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
  // ...
} else if (value === "b") {
// This comparison appears to be unintentional because the types '"a"' and '"b"' have no overlap.
  // Oops, unreachable
}

let mess = 12;

let txt = '234'