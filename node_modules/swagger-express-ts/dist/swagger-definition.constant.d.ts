export declare class SwaggerDefinitionConstant {
    private static JSON;
    private static XML;
    private static ZIP;
    private static PDF;
    private static X_WWW_FORM_URLENCODED;
    private static FORM_DATA;
    private static TEXT_PLAIN;
    private static TEXT_HTML;
    private static PNG;
    private static GIF;
    private static JPEG;
    private static STRING;
    private static NUMBER;
    private static INTEGER;
    private static BOOLEAN;
    private static ARRAY;
    private static OBJECT;
    private static QUERY;
    static Produce: {
        JSON: string;
        XML: string;
        ZIP: string;
        PDF: string;
        X_WWW_FORM_URLENCODED: string;
        FORM_DATA: string;
        TEXT_PLAIN: string;
        TEXT_HTML: string;
        PNG: string;
        GIF: string;
        JPEG: string;
    };
    static Scheme: {
        HTTP: string;
        HTTPS: string;
    };
    static Consume: {
        XML: string;
        JSON: string;
    };
    static Model: {
        Type: {
            OBJECT: string;
            ARRAY: string;
        };
        Property: {
            Type: {
                STRING: string;
                NUMBER: string;
                INTEGER: string;
                BOOLEAN: string;
                ARRAY: string;
                OBJECT: string;
            };
            ItemType: {
                STRING: string;
                NUMBER: string;
                INTEGER: string;
                BOOLEAN: string;
            };
            Format: {
                INT_64: string;
            };
        };
    };
    static Parameter: {
        Type: {
            STRING: string;
            NUMBER: string;
            INTEGER: string;
            BOOLEAN: string;
            ARRAY: string;
            OBJECT: string;
        };
        In: {
            PATH: string;
            QUERY: string;
            BODY: string;
            FORM_DATA: string;
        };
    };
    static Response: {
        Type: {
            STRING: string;
            NUMBER: string;
            INTEGER: string;
            BOOLEAN: string;
            ARRAY: string;
            OBJECT: string;
        };
    };
    static Security: {
        Type: {
            BASIC_AUTHENTICATION: string;
            API_KEY: string;
        };
        In: {
            HEADER: string;
            QUERY: string;
        };
    };
}
