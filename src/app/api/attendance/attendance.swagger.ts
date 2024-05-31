import {
    ApiModel,
    ApiModelProperty,
} from "swagger-express-ts";

@ApiModel({
    description: "Attendance Data model",
    name: "AttendanceDataModel",
})
export class AttendanceData {
    @ApiModelProperty({
        description: "attendance",
        required: true,
        type: '',
    })
    attendance: object;
}
