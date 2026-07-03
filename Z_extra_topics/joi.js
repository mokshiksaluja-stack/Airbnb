// this is used for schema validations for server side


/**********************************************************************

TOPIC: JOI

WHAT IS JOI?
- Joi is an npm package used for server-side data validation.
- It helps validate incoming request data before processing it.
- Commonly used in Express applications.
- It ensures that the client sends data in the correct format.

WHY USE JOI?
- Prevents invalid data from entering the database.
- Reduces manual validation code.
- Provides clear validation error messages.
- Makes APIs more secure and reliable.

INSTALLATION

npm install joi

BASIC FLOW

1. Create a Joi schema.
2. Validate incoming data against the schema.
3. If validation fails, return an error.
4. If validation passes, continue processing.

**********************************************************************/

const Joi = require("joi");

/**********************************************************************

BASIC SCHEMA

Suppose we expect:

{
    username: "Rahul",
    age: 21
}

**********************************************************************/

const userSchema = Joi.object({
    username: Joi.string().required(),
    age: Joi.number().required()
});

/**********************************************************************

VALIDATION

**********************************************************************/

const data = {
    username: "Rahul",
    age: 21
};

const result = userSchema.validate(data);

console.log(result);

/**********************************************************************

IF VALID

result.error => undefined

**********************************************************************/

/*
{
    value: {
        username: "Rahul",
        age: 21
    }
}
*/

/**********************************************************************

IF INVALID

**********************************************************************/

const invalidData = {
    username: "Rahul",
    age: "twenty one"
};

const result2 = userSchema.validate(invalidData);

/*
result2.error contains validation details

Example Message:

"age" must be a number

*/

/**********************************************************************

COMMONLY USED JOI VALIDATORS

**********************************************************************/

const schema = Joi.object({

    // String
    username: Joi.string(),

    // Number
    age: Joi.number(),

    // Required Field
    email: Joi.string().required(),

    // Minimum Length
    password: Joi.string().min(8),

    // Maximum Length
    title: Joi.string().max(50),

    // Email Validation
    email: Joi.string().email(),

    // Positive Number
    price: Joi.number().positive(),

    // Array
    tags: Joi.array(),

    // Boolean
    isAdmin: Joi.boolean()

});

/**********************************************************************

PRACTICAL EXPRESS EXAMPLE

**********************************************************************/

const listingSchema = Joi.object({

    title: Joi.string().required(),

    description: Joi.string().required(),

    price: Joi.number()
        .required()
        .min(0),

    location: Joi.string().required(),

    country: Joi.string().required()

});

/**********************************************************************

USAGE INSIDE A ROUTE

**********************************************************************/

/*

const { error } = listingSchema.validate(req.body);

if(error){
    throw new Error(error.details[0].message);
}

*/

/**********************************************************************

IMPORTANT INTERVIEW POINTS

1. Joi performs server-side validation.
2. Validation happens before database operations.
3. Joi schemas define expected data structure.
4. validate() returns an object containing:
      - value
      - error
5. error.details contains detailed validation messages.
6. Commonly used with Express middleware.

**********************************************************************/

/**********************************************************************

QUICK MEMORY TRICK

Client sends data
        ↓
Joi validates data
        ↓
Valid ? ---- YES ----> Continue
        ↓
        NO
        ↓
Return Validation Error

**********************************************************************/