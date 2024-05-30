"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SwaggerDefinitionConstant = /** @class */ (function () {
    function SwaggerDefinitionConstant() {
    }
    SwaggerDefinitionConstant.JSON = "application/json";
    SwaggerDefinitionConstant.XML = "application/xml";
    SwaggerDefinitionConstant.ZIP = "application/zip";
    SwaggerDefinitionConstant.PDF = "application/pdf";
    SwaggerDefinitionConstant.X_WWW_FORM_URLENCODED = "application/x-www-form-urlencoded";
    SwaggerDefinitionConstant.FORM_DATA = "multipart/form-data";
    SwaggerDefinitionConstant.TEXT_PLAIN = "text/plain";
    SwaggerDefinitionConstant.TEXT_HTML = "text/html";
    SwaggerDefinitionConstant.PNG = "image/png";
    SwaggerDefinitionConstant.GIF = "image/gif";
    SwaggerDefinitionConstant.JPEG = "image/jpeg";
    SwaggerDefinitionConstant.STRING = "string";
    SwaggerDefinitionConstant.NUMBER = "number";
    SwaggerDefinitionConstant.INTEGER = "integer";
    SwaggerDefinitionConstant.BOOLEAN = "boolean";
    SwaggerDefinitionConstant.ARRAY = "array";
    SwaggerDefinitionConstant.OBJECT = "object";
    SwaggerDefinitionConstant.QUERY = "query";
    SwaggerDefinitionConstant.Produce = {
        JSON: SwaggerDefinitionConstant.JSON,
        XML: SwaggerDefinitionConstant.XML,
        ZIP: SwaggerDefinitionConstant.ZIP,
        PDF: SwaggerDefinitionConstant.PDF,
        X_WWW_FORM_URLENCODED: SwaggerDefinitionConstant.X_WWW_FORM_URLENCODED,
        FORM_DATA: SwaggerDefinitionConstant.FORM_DATA,
        TEXT_PLAIN: SwaggerDefinitionConstant.TEXT_PLAIN,
        TEXT_HTML: SwaggerDefinitionConstant.TEXT_HTML,
        PNG: SwaggerDefinitionConstant.PNG,
        GIF: SwaggerDefinitionConstant.GIF,
        JPEG: SwaggerDefinitionConstant.JPEG
    };
    SwaggerDefinitionConstant.Scheme = {
        HTTP: "http",
        HTTPS: "https"
    };
    SwaggerDefinitionConstant.Consume = {
        XML: SwaggerDefinitionConstant.XML,
        JSON: SwaggerDefinitionConstant.JSON
    };
    SwaggerDefinitionConstant.Model = {
        Type: {
            OBJECT: SwaggerDefinitionConstant.OBJECT,
            ARRAY: SwaggerDefinitionConstant.ARRAY
        },
        Property: {
            Type: {
                STRING: SwaggerDefinitionConstant.STRING,
                NUMBER: SwaggerDefinitionConstant.NUMBER,
                INTEGER: SwaggerDefinitionConstant.INTEGER,
                BOOLEAN: SwaggerDefinitionConstant.BOOLEAN,
                ARRAY: SwaggerDefinitionConstant.ARRAY,
                OBJECT: SwaggerDefinitionConstant.OBJECT
            },
            ItemType: {
                STRING: SwaggerDefinitionConstant.STRING,
                NUMBER: SwaggerDefinitionConstant.NUMBER,
                INTEGER: SwaggerDefinitionConstant.INTEGER,
                BOOLEAN: SwaggerDefinitionConstant.BOOLEAN
            },
            Format: {
                INT_64: "int64"
            }
        }
    };
    SwaggerDefinitionConstant.Parameter = {
        Type: {
            STRING: SwaggerDefinitionConstant.STRING,
            NUMBER: SwaggerDefinitionConstant.NUMBER,
            INTEGER: SwaggerDefinitionConstant.INTEGER,
            BOOLEAN: SwaggerDefinitionConstant.BOOLEAN,
            ARRAY: SwaggerDefinitionConstant.ARRAY,
            OBJECT: SwaggerDefinitionConstant.OBJECT
        },
        In: {
            PATH: "path",
            QUERY: SwaggerDefinitionConstant.QUERY,
            BODY: "body",
            FORM_DATA: "formData"
        }
    };
    SwaggerDefinitionConstant.Response = {
        Type: {
            STRING: SwaggerDefinitionConstant.STRING,
            NUMBER: SwaggerDefinitionConstant.NUMBER,
            INTEGER: SwaggerDefinitionConstant.INTEGER,
            BOOLEAN: SwaggerDefinitionConstant.BOOLEAN,
            ARRAY: SwaggerDefinitionConstant.ARRAY,
            OBJECT: SwaggerDefinitionConstant.OBJECT
        }
    };
    SwaggerDefinitionConstant.Security = {
        Type: {
            BASIC_AUTHENTICATION: "basic",
            API_KEY: "apiKey"
        },
        In: {
            HEADER: "header",
            QUERY: SwaggerDefinitionConstant.QUERY
        }
    };
    return SwaggerDefinitionConstant;
}());
exports.SwaggerDefinitionConstant = SwaggerDefinitionConstant;
