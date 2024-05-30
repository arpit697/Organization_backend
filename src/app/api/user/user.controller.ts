import { NextFunction, Request, Response } from "express";
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiOperationDelete,
} from "swagger-express-ts";
import { usersService } from "./user.service";

@ApiPath({
  path: "/users",
  name: "Users",
})
class UserController {
  @ApiOperationGet({
    description: "Get all user",
    summary: "Get all user",
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
    parameters: {
      query: {
        name: {
          type: "string",
          required: false,
          description: "Name of the user",
        },
        email: {
          type: "string",
          required: false,
          description: "Name of the user",
        },
      },
    },
  })
  async getUsers(req: Request, res: Response, next: NextFunction) {
    usersService
      .getUsers(req.query)
      .then((data) => {
        res.success("Data", data);
      })
      .catch((err) => next());
  }

  @ApiOperationPost({
    description: "Register User",
    summary: "Register User",
    parameters: {
      body: {
        description: "User Register Data",
        required: true,
        model: "RegisterDataModel",
      },
    },
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
  })
  async registerUser(req: Request, res: Response, next: NextFunction) {
    const { user_name, user_email, user_password, confirm_password } = req.body;
    await usersService
      .findUser({ user_email: user_email })
      .then((data) => {
        if(data){
          res.status(409).json({ message: "User Already Exist" })
        }else{
          if(user_name && user_email && user_password && confirm_password){
            if(user_password === confirm_password){

            }else{
              res.status(400).json({ message: "Password And Confirm Password" })
            }
          }
        }
      })
      .catch((err) => res.status(400).json({ message: "Error" }));
      
    // console.log(user , 'uuuuuuuuuuuuuuuuuuuuuuuuuu')
    // usersService
    //   .registerUser(payload)
    //   .then((data) => res.status(200).json(data))
    //   .catch((err) => res.status(400).json({ message: "Error" }));
  }

  // static userRegistration = async (req, res) => {
  //   const { name, email, password, password_confirmation} = req.body
  //   const user = await UserModel.findOne({ email: email })
  //   if (user) {
  //     res.send({ "status": "failed", "message": "Email already exists" })
  //   } else {
  //     if (name && email && password && password_confirmation) {
  //       if (password === password_confirmation) {
  //         try {
  //           const salt = await bcrypt.genSalt(10)
  //           const hashPassword = await bcrypt.hash(password, salt)
  //           const doc = new UserModel({
  //             name: name,
  //             email: email,
  //             password: hashPassword,
  //           })
  //           await doc.save()
  //           const saved_user = await UserModel.findOne({ email: email })
  //           // Generate JWT Token
  //           const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
  //           res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
  //         } catch (error) {
  //           console.log(error)
  //           res.send({ "status": "failed", "message": "Unable to Register" })
  //         }
  //       } else {
  //         res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
  //       }
  //     } else {
  //       res.send({ "status": "failed", "message": "All fields are required" })
  //     }
  //   }
  // }

  @ApiOperationPut({
    description: "Update User",
    summary: "Update User",
    parameters: {
      body: {
        description: "User Update Data",
        model: "UpdateDataModel",
      },
    },
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
  })
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      // Implement the update logic using usersService
      res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
      next(err);
    }
  }

  @ApiOperationDelete({
    description: "Delete User",
    summary: "Delete User",
    parameters: {
      query: {
        email: {
          type: "string",
          required: true,
          description: "user email",
        },
      },
    },
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
  })
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    usersService
      .deleteUser(req.query)
      .then((data) => {
        if (data.deletedCount > 0) {
          res
            .status(200)
            .json({ message: "User deleted successfully", ...data });
        } else {
          res.status(400).json({ message: "User not found", ...data });
        }
      })
      .catch((err) => res.status(400).json({ message: "Error" }));
  }
}

// @ApiPath({
//     path: '/ram',
//     name: 'ram'
// })
// class no {
//     @ApiOperationGet({
//         description: 'Get User By Name',
//         summary: 'Get User By Name',
//         responses: {}
//     })

//     async getUserByName(req: Request, res: Response, next: NextFunction) {
//         const name = req.params.name;
//         // Call your service method to get user by name
//         // For example:
//         // const user = await usersService.getUserByName(name);
//         // res.success('User found', user);
//     }

// }
// export const No = new no();

export const userController = new UserController();
