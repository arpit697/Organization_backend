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
    fullName: string;

    @ApiModelProperty({
        description: "email of user",
        required: true,
        type: '',
    })
    email: string;

    @ApiModelProperty({
        description: "password of user",
        required: true,
        type: '',
    })
    password: string;
}

