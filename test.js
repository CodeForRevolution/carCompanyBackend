// store the calculated discount in the "discount" variable
// Please do not alter anything given in the starter code
// function calculate(amount) {
//     let discount;
  
//     switch (amount) {
//       case amount < 500:
//         discount = "no discount";
//         break;
//       case amount >= 500 && amount < 1000:
//         discount = "10% discount";
//         break;
//       case amount >= 1000 && amount < 2000:
//         discount = "20% discount";
//         break;
//       case amount >= 2000 && amount < 4000:
//         discount = "30% discount";
//         break;
//       case amount >= 4000 && amount < 5000:
//         discount = "40% discount";
//         break;
//       case amount >= 5000:
//         discount = "30% discount";
//         break;
//     }
//     return discount;
//   }
//   let r = calculate(600);
//   console.log(r);


// function calculate(amount) {
//     let discount;
  
//     if (amount < 500) {
//         discount = "no discount";
//     } else if (amount >= 500 && amount < 1000) {
//         discount = (amount * 10) / 100;
//     } else if (amount >= 1000 && amount < 2000) {
//         discount = "20% discount";
//     } else if (amount >= 2000 && amount < 4000) {
//         discount = "30% discount";
//     } else if (amount >= 4000 && amount < 5000) {
//         discount = "40% discount";
//     } else if (amount >= 5000) {
//         discount = "50% discount";
//     }
  
//     return discount;
// }

// let r = calculate(600);
// console.log(r);



function calculate(amount) {
    let discount;
  
    switch (true) {
        case amount < 500:
            discount = "no discount";
            break;
        case amount >= 500 && amount < 1000:
            discount = "10% discount";
            break;
        case amount >= 1000 && amount < 2000:
            discount = "20% discount";
            break;
        case amount >= 2000 && amount < 4000:
            discount = "30% discount";
            break;
        case amount >= 4000 && amount < 5000:
            discount = "40% discount";
            break;
        case amount >= 5000:
            discount = "50% discount";
            break;
    }
  
    return discount;
}

let r = calculate(600);

console.log(r);