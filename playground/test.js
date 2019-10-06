const add = (a, b) => {
  return new Promise((resolve, reject) => {
    if (typeof a === "number" && typeof b === "number") {
      resolve(a + b);
    } else {
      reject("not valid");
    }
  });
};
async function show() {
  let result = await add(1, 2);
  console.log(result);
  let result1 = await add(result, 3);
  console.log(result1);
  let result2 = await add(result1, 4);
  console.log(result2);
}
show();
// add(1,2)
// .then(res =>{
//     console.log(res)
//     return add(res,3)
// })
// .then(res => { //
//     console.log(res)
//     return add(res,4)
// })
// .then(res =>{
//     console.log(res)
//     return add(res,5)
// })
