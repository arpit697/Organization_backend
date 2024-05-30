"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app/app");
try {
    app_1.Application.init();
}
catch (error) {
    console.error(error.message);
}
