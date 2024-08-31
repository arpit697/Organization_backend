import { NextFunction, Request, Response } from "express";
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiOperationDelete,
} from "swagger-express-ts";
import bcrypt from "bcrypt";
import { usersService } from "./user.service";

@ApiPath({
  path: "/users",
  name: "Users",
})
class UserController {
  // @ApiOperationGet({
  //   description: "Get all user",
  //   summary: "Get all user",
  //   responses: {
  //     200: {
  //       description: "Success",
  //       type: "String",
  //     },
  //   },
  //   parameters: {
  //     query: {
  //       name: {
  //         type: "string",
  //         required: false,
  //         description: "Name of the user",
  //       },
  //       email: {
  //         type: "string",
  //         required: false,
  //         description: "Name of the user",
  //       },
  //     },
  //   },
  // })
  // async getUsers(req: Request, res: Response, next: NextFunction) {
  //   usersService
  //     .getUsers(req.query)
  //     .then((data) => {
  //       res.success("Data", data);
  //     })
  //     .catch((err) => next());
  // }

  // @ApiOperationGet({
  //   description: "Get all user",
  //   summary: "Get all user",
  //   responses: {
  //     200: {
  //       description: "Success",
  //       type: "String",
  //     },
  //   },
  //   parameters: {
  //     query: {
  //       name: {
  //         type: "string",
  //         required: false,
  //         description: "Name of the user",
  //       },
  //       email: {
  //         type: "string",
  //         required: false,
  //         description: "Name of the user",
  //       },
  //     },
  //   },
  // })

  // @ApiOperationGet({
  //   path: "/:userId",
  //   description: "Get user by ID",
  //   parameters: {
  //     path: {
  //       userId: {
  //         description: "ID of the user",
  //         required: true,
  //         type: "string"
  //       }
  //     }
  //   },
  //   responses: {
  //     200: { model: "User" },
  //     404: { description: "User not found" }
  //   }
  // })

  // @ApiOperationPost({
  //   description: "Register User",
  //   summary: "Register User",
  //   parameters: {
  //     body: {
  //       description: "User Register Data",
  //       required: true,
  //       model: "RegisterDataModel",
  //     },
  //   },
  //   responses: {
  //     200: {
  //       description: "Success",
  //       type: "String",
  //     },
  //   },
  // })
  // async registerUser(req: Request, res: Response, next: NextFunction) {
  //   const { user_name, user_email, user_password, confirm_password } = req.body;
  //   await usersService
  //     .findUser({ user_email: user_email })
  //     .then(async (data) => {
  //       if (data) {
  //         res.status(409).json({ message: "User Already Exist" });
  //       } else {
  //         if (user_name && user_email && user_password && confirm_password) {
  //           if (user_password === confirm_password) {
  //             try {
  //               const salt = await bcrypt.genSalt(100);
  //               const hashPassword = await bcrypt.hash(
  //                 user_password,
  //                 parseInt(salt)
  //               );
                
  //               usersService.registerUser({
  //                 user_name,
  //                 user_email,
  //                 user_password : hashPassword,
  //               }).then(
  //                 ()=>{
  //                   res.success("User Registerd Successfully in Data base", {
  //                     user_name,
  //                     user_email,
  //                   });
  //                 }
  //               );
                
  //             } catch (error) {}
  //           } else {
  //             res
  //               .status(400)
  //               .json({ message: "Password And Confirm Password" });
  //           }
  //         }
  //       }
  //     })
  //     .catch((err) => res.status(400).json({ message: "Error" }));
  // }

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

  // @ApiOperationPut({
  //   description: "Update User",
  //   summary: "Update User",
  //   parameters: {
  //     body: {
  //       description: "User Update Data",
  //       model: "UpdateDataModel",
  //     },
  //   },
  //   responses: {
  //     200: {
  //       description: "Success",
  //       type: "String",
  //     },
  //   },
  // })

  // async updateUser(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const payload = req.body;
  //     // Implement the update logic using usersService
  //     res.status(200).json({ message: "User updated successfully" });
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // @ApiOperationDelete({
  //   description: "Delete User",
  //   summary: "Delete User",
  //   parameters: {
  //     query: {
  //       email: {
  //         type: "string",
  //         required: true,
  //         description: "user email",
  //       },
  //     },
  //   },
  //   responses: {
  //     200: {
  //       description: "Success",
  //       type: "String",
  //     },
  //   },
  // })
  // async deleteUser(req: Request, res: Response, next: NextFunction) {
  //   usersService
  //     .deleteUser(req.query)
  //     .then((data) => {
  //       if (data.deletedCount > 0) {
  //         res
  //           .status(200)
  //           .json({ message: "User deleted successfully", ...data });
  //       } else {
  //         res.status(400).json({ message: "User not found", ...data });
  //       }
  //     })
  //     .catch((err) => res.status(400).json({ message: "Error" }));
  // }
}

export const userController = new UserController();
