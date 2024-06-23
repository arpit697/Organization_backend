import { NextFunction, Request, Response } from "express";
import { testingService } from "./testing.service";
import { ApiOperationGet, ApiOperationPost, ApiPath } from "swagger-express-ts";

@ApiPath({
    path : '/weather',
    name : 'Weather'
})
class TestingController {

    @ApiOperationGet({
        description: "Weather",
        summary: "Get Weather Data Country Wise",
        responses: {
          200: {
            description: "Success",
            type: "String",
          },
        },
        parameters: {
            query: {
              page: {
                type: "string",
                required: false,
                description: "Page Numbre",
              },
              limit: {
                type: "string",
                required: false,
                description: "Limit",
              },
            },
          },
      })
      async getWeatherData(req: Request, res: Response, next: NextFunction) {
        const page = req.query.page ? parseInt(req.query.page as string) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
        testingService.getWeatherData(page, limit)
            .then((data) => {
                res.success("Data", data);
            })
            .catch((err) => next());
    }
    @ApiOperationPost({
        description: "Add Weather Data",
        summary: "Add Weather Data",
        parameters: {
          body: {
            description: "Add Weather Data",
            required: true,
            model: "WeatherDataModel"
          },
        },
        responses: {
          200: {
            description: "Success",
            type: "String",
          },
        },
      })

    async addWeatherData(req:Request , res:Response , next: NextFunction){
        const payload =  req.body;
        await testingService.addWeatherData(payload)
        res.success("attendance added successfully" )
    }
    
}

export const testingController = new TestingController()