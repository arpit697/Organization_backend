import {
    ApiModel,
    ApiModelProperty,
} from "swagger-express-ts";

@ApiModel({
    description: "Register User Data",
    name: "RegisterDataModel",
})
export class RegisterData {
    @ApiModelProperty({
        description: "name of user",
        required: true,
        type: '',

    })
    user_name: string;

    @ApiModelProperty({
        description: "email of user",
        required: true,
        type: '',
    })
    user_email: string;

    @ApiModelProperty({
        description: "password of user",
        required: true,
        type: '',
    })
    user_password: string;
}


export class AttendanceDataModel {
    @ApiModelProperty({
        description: "attendance",
        required: true,
        type: '',

    })
    attendance: object;
}
