export const swaggerDocument = {
  "openapi": "3.0.1",
  "info": {
    "title": "Brezaa Backend Task",
    "description": "This is the documentation for Brezaa Backend Task API.  The home page of the API is [here](https://brezaa-backend-task.herokuapp.com/). .",
    "contact": {
      "email": "luisa.rebelopinto@gmail.com"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://brezaa-backend-task.herokuapp.com/"
    },
    {
      "url": "http://brezaa-backend-task.herokuapp.com/"
    }
  ],
  "tags": [
    {
      "name": "user",
      "description": "Access and manage users"
    },
    {
      "name": "seller",
      "description": "Access and manage sellers"
    },
    {
      "name": "review",
      "description": "Access and manage reviews"
    }
  ],
  "paths": {
    "/users/signup": {
      "post": {
        "tags": [
          "user"
        ],
        "summary": "Add a new user to the store",
        "operationId": "addUser",
        "requestBody": {
          "description": "User object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "$ref": "#/components/schemas/User",
                "required": true
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successfull operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "User added"
                    },
                    "user": {
                      "type": "object",
                      "$ref": "#/components/schemas/User",
                      "description": "The user that has been deleted"
                    },
                    "users": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/User"
                      },
                      "description": "The user that has been deleted"
                    }
                  }
                }
              }
            }
          },
          "409": {
            "description": "Email already registered",
            "content": {
              "application/json": {
                "example": {
                  "message": "Email already registered,",
                  "email": "example@email.com"
                }
              }
            }
          },
          "417": {
            "description": "Missing profession | Missing password",
            "content": {
              "application/json": {
                "example": {
                  "message": "Missing profession"
                }
              }
            }
          }
        }
      }
    },
    "/users/login": {
      "post": {
        "tags": [
          "user"
        ],
        "summary": "Login the user to the store",
        "operationId": "loginUser",
        "requestBody": {
          "description": "User object that needs to be logged in to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/User"
              },
              "example": {
                "email": "string",
                "password": "string"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Successfull operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "user": {
                      "type": "object",
                      "$ref": "#/components/schemas/UserWithToken",
                      "description": "The user that has been logged in"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Username or password is incorrect",
            "content": {
              "application/json": {
                "example": {
                  "message": "Username or password is incorrect"
                }
              }
            }
          }
        }
      }
    },
    "/users": {
      "get": {
        "tags": [
          "user"
        ],
        "summary": "Get a list of all users",
        "operationId": "getUsers",
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "users": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/User"
                      },
                      "description": "The list of users"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/edit-user/{id}": {
      "put": {
        "tags": [
          "user"
        ],
        "summary": "Update the user with the given `id`.",
        "description": "The user with the specified `id` will be updated.",
        "operationId": "updateUser",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "User `id`",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "User object that needs to be updated on the store",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string",
                    "example": "User updated"
                  },
                  "user": {
                    "type": "object",
                    "$ref": "#/components/schemas/User",
                    "description": "The user that has been updated"
                  },
                  "users": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/User"
                    },
                    "description": "The list of users"
                  }
                }
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "User deleted"
                    },
                    "user": {
                      "type": "object",
                      "$ref": "#/components/schemas/User",
                      "description": "The user that has been deleted"
                    },
                    "users": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/User"
                      },
                      "description": "The user that has been deleted"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/users/{id}": {
      "delete": {
        "tags": [
          "user"
        ],
        "summary": "Delete a user by `id`.",
        "description": "The user with the specified `id` will be removed from the data store.",
        "operationId": "deleteUser",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "User `id`",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "User deleted"
                    },
                    "user": {
                      "type": "object",
                      "$ref": "#/components/schemas/User",
                      "description": "The user that has been deleted"
                    },
                    "users": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/User"
                      },
                      "description": "The user that has been deleted"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/users/getAllSellers": {
      "get": {
        "tags": [
          "seller"
        ],
        "summary": "Find all users that are sellers",
        "description": "All the returned users will be sellers",
        "operationId": "getSellers",
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "users": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Seller"
                      },
                      "description": "A list of users that are all sellers"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/getNearestSellers/": {
      "get": {
        "tags": [
          "seller"
        ],
        "summary": "Finds nearest sellers by longitude, latitude and within max distance.",
        "description": "A longitude, latitude and max distance must be provided.",
        "operationId": "getNearestSellers",
        "parameters": [
          {
            "name": "longitude",
            "in": "query",
            "description": "Longitude to filter by",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "latitude",
            "in": "query",
            "description": "Latitude to filter by",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "maxDistance",
            "in": "query",
            "description": "Max distance to filter by",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "nearestSellers": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Seller"
                      },
                      "description": "A list sellers withing the specified location radius"
                    }
                  }
                }
              }
            }
          },
          "417": {
            "description": "Missing longitude | latitude | maxDistance"
          }
        }
      }
    },
    "/review/": {
      "post": {
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "tags": [
          "review"
        ],
        "summary": "Add a review about a seller",
        "description": "Adds a review about a seller. A valid sellerId must be provided as query parameter.",
        "operationId": "addReview",
        "parameters": [
          {
            "name": "sellerId",
            "in": "query",
            "description": "A valid `sellerId`",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "Review that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Review"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Review added"
                    },
                    "review": {
                      "type": "object",
                      "$ref": "#/components/schemas/Review",
                      "description": "The review that has been just added to the store"
                    },
                    "reviews": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Review"
                      },
                      "description": "The list of reviews for the given seller"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Seller not found"
          },
          "417": {
            "description": "Invalid `sellerId`"
          }
        }
      }
    },
    "/getSellerReviews/": {
      "get": {
        "tags": [
          "review"
        ],
        "summary": "Finds seller reviews by `sellerId`.",
        "description": "A valid sellerId must be provided as query parameter",
        "operationId": "getSellerReviews",
        "parameters": [
          {
            "name": "sellerId",
            "in": "query",
            "description": "Seller ID to filter by",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "reviews": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Review"
                      },
                      "description": "The list of reviews for a given `sellerId`"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Seller not found"
          },
          "417": {
            "description": "Invalid sellerId"
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "Review": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "reviewValue": {
            "type": "integer",
            "minimum": 1,
            "maximum": 5
          },
          "comment": {
            "type": "string"
          }
        }
      },
      "User": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "username": {
            "type": "string"
          },
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "typeOfUser": {
            "type": "integer",
            "description": "1: Seller | 2: Client",
            "format": "int32"
          },
          "profession": {
            "type": "string",
            "description": "Can be null if user is of type 2: client"
          },
          "latitude": {
            "type": "string"
          },
          "longitude": {
            "type": "string"
          }
        }
      },
      "UserWithToken": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "username": {
            "type": "string"
          },
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "typeOfUser": {
            "type": "integer",
            "description": "1: Seller | 2: Client",
            "format": "int32"
          },
          "profession": {
            "type": "string",
            "description": "Can be null if user is of type 2: client"
          },
          "latitude": {
            "type": "string"
          },
          "longitude": {
            "type": "string"
          },
          "token": {
            "type": "string"
          }
        }
      },
      "Seller": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "username": {
            "type": "string"
          },
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "typeOfUser": {
            "enum": [
              "1"
            ],
            "type": "string"
          },
          "profession": {
            "type": "string",
            "description": "Can be null if user is of type 2: client"
          },
          "latitude": {
            "type": "string"
          },
          "longitude": {
            "type": "string"
          },
          "token": {
            "type": "string"
          }
        }
      },
      "ApiResponse": {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "type": {
            "type": "string"
          },
          "message": {
            "type": "string"
          }
        }
      }
    }
  }
}