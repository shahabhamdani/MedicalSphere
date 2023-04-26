const csv = require("csv-parser");
const fs = require("fs");
const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-backend-cpu");

async function normalize(data) {
  const normalizedData = await data.map((item) => {
    const normalizedItem = {
      GENDER: item.GENDER === "M" ? 1 : 0,
      AGE: (item.AGE - 30) / 50,
      SMOKING: parseInt(item.SMOKING),
      YELLOW_FINGERS: parseInt(item.YELLOW_FINGERS),
      ANXIETY: parseInt(item.ANXIETY),
      PEER_PRESSURE: parseInt(item.PEER_PRESSURE),
      "CHRONIC DISEASE": parseInt(item["CHRONIC DISEASE"]),
      "FATIGUE ": parseInt(item["FATIGUE "]),
      "ALLERGY ": parseInt(item["ALLERGY "]),
      WHEEZING: parseInt(item.WHEEZING),
      "ALCOHOL CONSUMING": parseInt(item["ALCOHOL CONSUMING"]),
      COUGHING: parseInt(item.COUGHING),
      "SHORTNESS OF BREATH": parseInt(item["SHORTNESS OF BREATH"]),
      "SWALLOWING DIFFICULTY": parseInt(item["SWALLOWING DIFFICULTY"]),
      "CHEST PAIN": parseInt(item["CHEST PAIN"]),
      LUNG_CANCER: item.LUNG_CANCER === "YES" ? 1 : 0,
    };
    return normalizedItem;
  });

  return normalizedData;
}

let normalizedLungCancerData = null;
let inputTensor = [];
let model = null;
let ys = null;
let xs = null;

async function trainModel() {
  fs.createReadStream("lung_cancer.csv")
    .pipe(csv())
    .on("data", (row) => {
      lungCancerData.push(row);
    })
    .on("end", async () => {
      console.log("Lung cancer data loaded successfully");

      // Normalize the lung cancer data
      normalizedLungCancerData = await normalize(lungCancerData);

      // Convert the data into tensors
      if (normalizedLungCancerData) {
        xs = tf.tensor2d(
          normalizedLungCancerData.map((item) => [
            item.GENDER === 1 ? 1 : 0,
            item.AGE,
            item.SMOKING === 2 ? 1 : 0,
            item.YELLOW_FINGERS === 2 ? 1 : 0,
            item.ANXIETY === 2 ? 1 : 0,
            item.PEER_PRESSURE === 2 ? 1 : 0,
            item["CHRONIC DISEASE"] === 2 ? 1 : 0,
            item["FATIGUE "] === 2 ? 1 : 0,
            item["ALLERGY "] === 2 ? 1 : 0,
            item.WHEEZING === 2 ? 1 : 0,
            item["ALCOHOL CONSUMING"] === 2 ? 1 : 0,
            item.COUGHING === 2 ? 1 : 0,
            item["SHORTNESS OF BREATH"] === 2 ? 1 : 0,
            item["SWALLOWING DIFFICULTY"] === 2 ? 1 : 0,
            item["CHEST PAIN"] === 2 ? 1 : 0,
          ])
        );

        ys = tf.tensor2d(
          normalizedLungCancerData.map((item) => [item.LUNG_CANCER])
        );

        // Define the model
        model = tf.sequential();

        model.add(
          tf.layers.dense({
            units: 16,
            inputShape: [15],
            activation: "sigmoid",
          })
        );
        model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));
        model.compile({ loss: "binaryCrossentropy", optimizer: "adam" });

        // Train the model
        console.log("Waiting for model to be trained . . .");
        await model.fit(xs, ys, { epochs: 500 });
        console.log("Mode Trained");
      }
    });
}

trainModel();

async function trainAndPredict(data, userdata, res) {
  console.log(userdata);

  inputTensor = tf.tensor2d(userdata, [1, userdata.length]);
  const prediction = model.predict(inputTensor);
  const probability = prediction.dataSync()[0];
  const percentage = (probability * 100).toFixed(2);

  res.send(percentage);
}

// Load the lung cancer dataset
const lungCancerData = [];

// Make a prediction using the loaded model
async function predict(data, res) {
  trainAndPredict(normalizedLungCancerData, data, res);
}

const handleRiskPrediction = async (req, res) => {
  const {
    gender,
    age,
    smoking,
    yellowFingers,
    anxiety,
    peerPressure,
    chronicDisease,
    fatigue,
    allergy,
    wheezing,
    alcoholConsuming,
    coughing,
    shortnessOfBreath,
    swallowingDifficulty,
    chestPain,
  } = req.body;

  // Convert user answers to a normalized array
  const userInput = [
    gender === "M" ? 1 : 0,
    (age - 30) / 50,
    smoking === "2" ? 1 : 0,
    yellowFingers === "2" ? 1 : 0,
    anxiety === "2" ? 1 : 0,
    peerPressure === "2" ? 1 : 0,
    chronicDisease === "2" ? 1 : 0,
    fatigue === "2" ? 1 : 0,
    allergy === "2" ? 1 : 0,
    wheezing === "2" ? 1 : 0,
    alcoholConsuming === "2" ? 1 : 0,
    coughing === "2" ? 1 : 0,
    shortnessOfBreath === "2" ? 1 : 0,
    swallowingDifficulty === "2" ? 1 : 0,
    chestPain === "2" ? 1 : 0,
  ];
  // Make a prediction using the loaded model and the user inpu

  // const model = await loadModel();

  const prediction = await predict(userInput, res);
};

module.exports = {
  handleRiskPrediction: handleRiskPrediction,
};
