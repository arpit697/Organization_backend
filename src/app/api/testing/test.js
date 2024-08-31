// const tf = require("@tensorflow/tfjs");
// const path = require("path");

// async function testContrller() {
// //   const xVlaues = [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]];
// //   const yVlaues = [[10], [20], [30], [40], [50], [60], [70], [80], [90], [100]];


//    const xVlaues = [];
//    const yVlaues = [];

//   const training_data = path.resolve(__dirname , 'train.csv')

//   const columnConfig = {
//     num1 : {dtype :'int32'},
//     num2 : {dtype :'int32'}
//   }

//   const csvDataSet = tf.data.csv(`file://${training_data}` , columnConfig)

// //   console.log(csvDataSet , 'dataset')

// await csvDataSet.forEachAsync((row) =>{
//     xVlaues.push([row.num1])
//     yVlaues.push([row.num2])
// })

// //   console.log(data , 'path')

//   const xs = tf.tensor(xVlaues);
//   const ys = tf.tensor(yVlaues);

//   const model = tf.sequential();
//   model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
// //   model.add(tf.layers.dense({ units: 1, inputShape: [1], activation: "relu" }));

//   model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

//   await model.fit(xs, ys, { epochs: 2000 });
//   const input = tf.tensor2d([[15], [1, 1]]);

//   const output = model.predict(input);
//   output.print();
// }

// testContrller();
