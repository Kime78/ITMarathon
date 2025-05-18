import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0', // Specify the OpenAPI version
        info: {
            title: 'My Express API with Swagger (TypeScript)', // Your API title
            version: '1.0.0', // Your API version
            description:
                'A simple CRUD API application made with Express and documented with Swagger, built with TypeScript.', // A short description
            contact: {
                name: 'Your Name/Company',
                url: 'yourwebsite.com',
                email: 'your.email@example.com',
            },
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`, // Adjust to your base URL
                description: 'Development server (v1)',
            },
            // You can add more servers here
        ],
        // components: { // Optional: for global security schemes
        //   securitySchemes: {
        //     bearerAuth: {
        //       type: 'http',
        //       scheme: 'bearer',
        //       bearerFormat: 'JWT',
        //     },
        //   },
        // },
        // security: [ // Optional: apply security globally
        //   {
        //     bearerAuth: [],
        //   },
        // ],
    },
    // Path to the API docs
    // Use glob patterns to specify your route files
    apis: ['./routes/*.ts', './app.ts'], // Adjust to your project structure
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;