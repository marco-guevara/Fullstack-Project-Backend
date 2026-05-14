import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Baldo E-commerce API",
    version: "1.0.0",
    description: "Backend API for the Baldo academic e-commerce project.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
  tags: [
    {
      name: "Health",
      description: "API status checks",
    },
    {
      name: "Auth",
      description: "Registration, login, logout, and current session",
    },
    {
      name: "Products",
      description: "Protected product catalogue endpoints",
    },
    {
      name: "Cart",
      description: "Protected shopping cart endpoints",
    },
    {
      name: "Checkout",
      description: "Protected simulated checkout endpoint",
    },
    {
      name: "Users",
      description: "Protected user profile endpoints",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Unable to complete request.",
          },
          error: {
            type: "string",
            example: "Detailed error message",
          },
        },
      },
      User: {
        type: "object",
        properties: {
          userId: {
            type: "string",
            format: "uuid",
          },
          email: {
            type: "string",
            format: "email",
          },
          firstName: {
            type: "string",
            nullable: true,
          },
          lastName: {
            type: "string",
            nullable: true,
          },
          address: {
            type: "string",
            nullable: true,
          },
          city: {
            type: "string",
            nullable: true,
          },
          postalCode: {
            type: "string",
            nullable: true,
          },
          country: {
            type: "string",
            nullable: true,
          },
          phone: {
            type: "string",
            nullable: true,
          },
        },
      },
      Product: {
        type: "object",
        properties: {
          productId: {
            type: "string",
            format: "uuid",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
            nullable: true,
          },
          price: {
            type: "string",
            example: "49.99",
          },
          sizes: {
            type: "array",
            items: {
              type: "string",
            },
          },
          colors: {
            type: "array",
            items: {
              type: "string",
            },
          },
          stock: {
            type: "integer",
            example: 20,
          },
          imageUrl: {
            type: "string",
            nullable: true,
          },
          category: {
            type: "string",
            nullable: true,
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      CartItem: {
        type: "object",
        properties: {
          cartItemId: {
            type: "string",
            format: "uuid",
          },
          cartId: {
            type: "string",
            format: "uuid",
          },
          productId: {
            type: "string",
            format: "uuid",
          },
          quantity: {
            type: "integer",
            example: 2,
          },
          selectedSize: {
            type: "string",
            nullable: true,
            example: "M",
          },
          selectedColor: {
            type: "string",
            nullable: true,
            example: "Black",
          },
          product: {
            $ref: "#/components/schemas/Product",
          },
        },
      },
      Cart: {
        type: "object",
        nullable: true,
        properties: {
          cartId: {
            type: "string",
            format: "uuid",
          },
          userId: {
            type: "string",
            format: "uuid",
          },
          status: {
            type: "string",
            enum: ["active", "completed"],
          },
          items: {
            type: "array",
            items: {
              $ref: "#/components/schemas/CartItem",
            },
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      AuthRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "customer@example.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "password123",
          },
        },
      },
      RegisterRequest: {
        allOf: [
          {
            $ref: "#/components/schemas/AuthRequest",
          },
          {
            type: "object",
            properties: {
              firstName: {
                type: "string",
                example: "Alex",
              },
              lastName: {
                type: "string",
                example: "Rivera",
              },
              address: {
                type: "string",
                example: "123 Gran Via",
              },
              city: {
                type: "string",
                example: "Madrid",
              },
              postalCode: {
                type: "string",
                example: "28013",
              },
              country: {
                type: "string",
                example: "Spain",
              },
              phone: {
                type: "string",
                example: "+34 600 000 000",
              },
            },
          },
        ],
      },
      UserUpdateRequest: {
        type: "object",
        properties: {
          firstName: {
            type: "string",
          },
          lastName: {
            type: "string",
          },
          address: {
            type: "string",
          },
          city: {
            type: "string",
          },
          postalCode: {
            type: "string",
          },
          country: {
            type: "string",
          },
          phone: {
            type: "string",
          },
        },
      },
      AddCartItemRequest: {
        type: "object",
        required: ["productId"],
        properties: {
          productId: {
            type: "string",
            format: "uuid",
            example: "00000000-0000-4000-8000-000000000001",
          },
          quantity: {
            type: "integer",
            minimum: 1,
            default: 1,
            example: 1,
          },
          selectedSize: {
            type: "string",
            nullable: true,
            example: "M",
          },
          selectedColor: {
            type: "string",
            nullable: true,
            example: "Black",
          },
        },
      },
      UpdateCartItemRequest: {
        type: "object",
        required: ["quantity"],
        properties: {
          quantity: {
            type: "integer",
            minimum: 1,
            example: 3,
          },
        },
      },
    },
  },
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Check API status",
        responses: {
          200: {
            description: "API is running",
          },
        },
      },
    },
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterRequest",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
          },
          400: {
            description: "Missing required fields",
          },
          409: {
            description: "Email already exists",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Log in a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AuthRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "User logged in successfully",
          },
          400: {
            description: "Missing required fields",
          },
          401: {
            description: "Invalid credentials",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Log out the current user",
        responses: {
          200: {
            description: "User logged out successfully",
          },
        },
      },
    },
    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get the authenticated user",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Authenticated user",
          },
          401: {
            description: "Invalid or missing authentication token",
          },
        },
      },
    },
    "/products": {
      get: {
        tags: ["Products"],
        summary: "Get all products",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Product list",
          },
          401: {
            description: "Invalid or missing authentication token",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/products/{productId}": {
      get: {
        tags: ["Products"],
        summary: "Get one product by id",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "productId",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "Product detail",
          },
          401: {
            description: "Invalid or missing authentication token",
          },
          404: {
            description: "Product not found",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/cart": {
      get: {
        tags: ["Cart"],
        summary: "Get the active cart",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Active cart or null",
          },
          401: {
            description: "Invalid or missing authentication token",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/cart/items": {
      post: {
        tags: ["Cart"],
        summary: "Add a product to the active cart",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AddCartItemRequest",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Product added to cart",
          },
          400: {
            description: "Invalid product, quantity, size, or color",
          },
          401: {
            description: "Invalid or missing authentication token",
          },
          404: {
            description: "Product not found",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/cart/items/{cartItemId}": {
      patch: {
        tags: ["Cart"],
        summary: "Update a cart item quantity",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "cartItemId",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateCartItemRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Cart item updated",
          },
          400: {
            description: "Invalid quantity",
          },
          401: {
            description: "Invalid or missing authentication token",
          },
          404: {
            description: "Cart item not found",
          },
          500: {
            description: "Server error",
          },
        },
      },
      delete: {
        tags: ["Cart"],
        summary: "Remove a cart item",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "cartItemId",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "Cart item removed",
          },
          401: {
            description: "Invalid or missing authentication token",
          },
          404: {
            description: "Cart item not found",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/checkout": {
      post: {
        tags: ["Checkout"],
        summary: "Complete the active cart checkout",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Checkout completed successfully",
          },
          400: {
            description: "Cart is empty",
          },
          401: {
            description: "Invalid or missing authentication token",
          },
          404: {
            description: "Active cart not found",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/users/me": {
      get: {
        tags: ["Users"],
        summary: "Get current user profile",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Current user profile",
          },
          401: {
            description: "Invalid or missing authentication token",
          },
        },
      },
      patch: {
        tags: ["Users"],
        summary: "Update current user profile",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserUpdateRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "User updated successfully",
          },
          400: {
            description: "No valid user fields provided",
          },
          401: {
            description: "Invalid or missing authentication token",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
  },
};

const swaggerSpec = swaggerJSDoc({
  definition: swaggerDefinition,
  apis: [],
});

export default swaggerSpec;
