var a = 999;
console.log('a', a);
var xiaoming = {
    name: "12",
    age: 22
};
var message = '';
message.toLowerCase();
message();
var announcement = "Hello World!";
// How quickly can you spot the typos?
announcement.toLocaleLowercase();
announcement.toLocalLowerCase();
// We probably meant to write this...
announcement.toLocaleLowerCase();
var value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
    // ...
}
else if (value === "b") {
    // This comparison appears to be unintentional because the types '"a"' and '"b"' have no overlap.
    // Oops, unreachable
}
