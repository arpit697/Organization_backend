import {
    ApiModel,
    ApiModelProperty,
} from "swagger-express-ts";

@ApiModel({
    description: "Authenticates a user with email and password, and creates a session.",
    name: "Login Model",
})
export class Login_Model{
    @ApiModelProperty({
        description: "Email",
        required: true,
        type: '',

    })
    email: string;

    @ApiModelProperty({
        description: "Password",
        required: true,
        type: '',
    })
    password: string;
}
@ApiModel({
    description: "Logs out a user by invalidating the session based on session ID",
    name: "Logout Model",
})
export class Logout_Model{
    @ApiModelProperty({
        description: "Session ID",
        required: true,
        type: '',

    })
    sessionId: string;
}

@ApiModel({
    description: "Logs out a user by invalidating the session based on session ID",
    name: "Account Registration Model",
})
export class Account_Registration_Model{
    @ApiModelProperty({
        description: "Full Name",
        required: true,
        type: '',

    })
    fullName: string;
    @ApiModelProperty({
        description: "Email",
        required: true,
        type: '',

    })
    email: string;

    @ApiModelProperty({
        description: "Password",
        required: true,
        type: '',

    })
    password: string;
}

@ApiModel({
    description: "Renews a user session using a refresh token and user type",
    name: "Renew Session Model",
})
export class Renew_Session_Model{
    @ApiModelProperty({
        description: "refresh token",
        required: true,
        type: '',

    })
    refreshToken: string;
    @ApiModelProperty({
        description: "user type",
        required: true,
        type: '',

    })
    userType: string;
}
