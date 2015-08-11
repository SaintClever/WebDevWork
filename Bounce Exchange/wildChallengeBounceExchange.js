// 01
var mySnippet = function () {
  return document.getElementsByClassName("price")
};

mySnippet();



// 02
var mySnippet = function (a, b) {
  console.log(a + b);
};

mySnippet(1, 2);


var mySnippet = function (a, b) {
  return a + b
};

mySnippet(1, 2);



// 03
var myArray = ["label amount", "price", "product-image"];

var mySnippet = function () {
  for (var i = 0; i < myArray.length; i++) {
    return document.getElementsByClassName(myArray[i]);
  };
};

mySnippet();



// console.log
var myArray = ["label amount", "price", "product-image"];

var mySnippet = function (){
  for (var i = 0; i < myArray.length; i++) {
    console.log(document.getElementsByClassName(myArray[i]));
  };
};

mySnippet();



// return: Paste these in one at a time to get the exact return
var myArray = ["label amount", "price", "product-image"];

var label = function (){
  return document.getElementsByClassName(myArray[0]);
};
x = label();



var price = function (){
  return document.getElementsByClassName(myArray[1]);
};
y = price();



var productImage = function (){
  return document.getElementsByClassName(myArray[2]);
};
z = productImage();


