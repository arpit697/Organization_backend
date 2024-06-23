import {
    ApiModel,
    ApiModelProperty,
} from "swagger-express-ts";

@ApiModel({
    description: "Weather Data model",
    name: "WeatherDataModel",
})
export class WeatherData {
    @ApiModelProperty({
        description: "weather",
        required: false,
        type: '',
    })
    weather: object;
}
