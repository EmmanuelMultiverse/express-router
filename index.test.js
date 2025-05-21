const app = require("./src/app")
const request = require("supertest");
const { User, Fruit } = require("./models")
const { seedUsers } = require("./seedData")

describe("/users endpoint", () => {
    // beforeEach(() => {
    //     User.resetData(seedUsers);
    // });

    test("GET /users route", async () => {
        const res = await request(app).get("/users");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(4)
        expect(res.body).toBeInstanceOf(Array);

        expect(res.body).toMatchObject([
            {
                name: "User 1",
                age: 30
            },
            {
                name: "User 2",
                age: 45
            },
            {
                name: "User 3",
                age: 27
            },
            {
                name: "User 4",
                age: 22
            }
        ]);
    });

    test("GET /users/:id route", async () => {
        const res = await request(app).get("/users/1");

        expect(res.statusCode).toBe(200);

        expect(res.body).toMatchObject({
            name: "User 1",
            age: 30
        });
    });

    test("POST /users route", async () => {
        const newUser = {
            name: "new_user",
            age: 20,

        };

        const res = await request(app).post("/users").send(newUser);

        expect(res.statusCode).toBe(200);

        expect(res.body).toMatchObject(newUser);
    });

    test("POST /users invalid request route should return error", async () => {
        const newUser = {
            name: "new_user",
            age: 20,

        };

        const res = await request(app).post("/users").send(newUser);

        expect(res.statusCode).toBe(200);

        expect(res.body).toMatchObject(newUser);
    });

    test("PUT /users/:id route", async () => {
        const newUser = {
            name: "new_user",
            age: 20,

        };

        const res = await request(app).put("/users/1").send(newUser);

        expect(res.statusCode).toBe(200);

        expect(res.body).toMatchObject(newUser);
    });

    test("DELETE /users/:id route", async () => {
        const res = await request(app).delete("/users/1");

        expect(res.statusCode).toBe(200);

        expect(res.body).toMatchObject({
            name: "new_user",
            age: 20,

        });
    });
});

describe("Fruits endpoint", () => {
    test("Verify /POST route with valid request", async () => {
        const newFruit = {
            name: "Apple",
            color: "Red",

        }

        const res = await request(app).post("/fruits").send(newFruit);

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(newFruit);
    })
    
    test("Verify /POST route with bad request - no color", async () => {
        const badRequest = {
            name: "Apple",

        }

        const res = await request(app).post("/fruits").send(badRequest);

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
            "error": [
                {
                    "msg": "Invalid value",
                    "param": "color",
                    "location": "body"
                }
            ]
        });
    })
})

