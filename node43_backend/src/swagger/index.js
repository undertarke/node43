// định nghĩa các API được viết theo cú pháp swagger qui định



/**
 * @swagger
 * /video/get-video:
 *    get:
 *      description: responses
 *      tags: [User]
 *      responses:
 *          200: 
 *              description: success   
 */



/**
 * @swagger
 * /api/v1/user/updateUser/{id}:
 *   put:
 *      description: responses
 *      tags: [User]
 *      parameters:
 *      - in: path
 *        name: id
 *      - in: body
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *      responses:
 *          200: 
 *              description: res   
 */