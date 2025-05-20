const app = require("./src/app")
const request = require("supertest");
const { User } = require("./models")
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

