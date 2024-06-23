import { Schema, model } from "mongoose";

const testingSchema = new Schema<any>(
  {
    st: String,
    ts: Date,
    position: {
      type: {
        type: String,
        enum: ["Point"],
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
    elevation: Number,
    callLetters: String,
    qualityControlProcess: String,
    dataSource: String,
    type: String,
    airTemperature: {
      value: Number,
      quality: String,
    },
    dewPoint: {
      value: Number,
      quality: String,
    },
    pressure: {
      value: Number,
      quality: String,
    },
    wind: {
      direction: {
        angle: Number,
        quality: String,
      },
      type: String,
      speed: {
        rate: Number,
        quality: String,
      },
    },
    visibility: {
      distance: {
        value: Number,
        quality: String,
      },
      variability: {
        value: String,
        quality: String,
      },
    },
    skyCondition: {
      ceilingHeight: {
        value: Number,
        quality: String,
        determination: String,
      },
      cavok: String,
    },
    sections: [String],
    precipitationEstimatedObservation: {
      discrepancy: String,
      estimatedWaterDepth: Number,
    },
    pastWeatherObservationManual: [
      {
        atmosphericCondition: {
          value: String,
          quality: String,
        },
        period: {
          value: Number,
          quality: String,
        },
      },
    ],
    skyConditionObservation: {
      totalCoverage: {
        value: String,
        opaque: String,
        quality: String,
      },
      lowestCloudCoverage: {
        value: String,
        quality: String,
      },
      lowCloudGenus: {
        value: String,
        quality: String,
      },
      lowestCloudBaseHeight: {
        value: Number,
        quality: String,
      },
      midCloudGenus: {
        value: String,
        quality: String,
      },
      highCloudGenus: {
        value: String,
        quality: String,
      },
    },
    atmosphericPressureChange: {
      tendency: {
        code: String,
        quality: String,
      },
      quantity3Hours: {
        value: Number,
        quality: String,
      },
      quantity24Hours: {
        value: Number,
        quality: String,
      },
    },
    presentWeatherObservationManual: [
      {
        condition: String,
        quality: String,
      },
    ],
    waveMeasurement: {
      method: String,
      waves: {
        period: Number,
        height: Number,
        quality: String,
      },
      seaState: {
        code: String,
        quality: String,
      },
    },
  },
  {
    timestamps: true,
    collection: "testing_weather",
  }
);

export const testingModel = model<any>("Testing_weather" , testingSchema);
