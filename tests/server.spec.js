const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    it ("Testear que la ruta GET /cafes devuelve un status code 200", async () => {
        const {statusCode, body: cafes} = await request(server).get("/cafes").send();
        expect(statusCode).toBe(200);
        expect(cafes).toBeInstanceOf(Array);
        expect(cafes.length).toBeGreaterThanOrEqual(1);
    })

    it(" obtener un código 404 al intentar eliminar un café con un id que no existe", async () => {
        const token = "token";
        const idTest = 123456789;
        const { statusCode } = await request(server).delete(`/cafes/${idTest}`).set("Authorization", token).send();
        expect(statusCode).toBe(404);
    })

    it("Probar que la ruta POST /cafes agrega un nuevo café y devuelve un código 201", async () => {
        const nuevoCafe = {
            id: Math.floor(Math.random() * 9999),
            nombre: "nuevo café"
        }
        const {statusCode, body: cafes} = await request(server).post("/cafes").send(nuevoCafe);
        expect(statusCode).toBe(201);
        expect(cafes).toContainEqual(nuevoCafe);
    })

    it("Probar que la ruta PUT /cafes devuelve un status code 400", async () => {
        const id = 1234;
        const cafeActualizado = {
            id: id + 1,
            nombre: "nuevo café"
        }
        const { statusCode } = await request(server).put(`/cafes/${id}`).send(cafeActualizado);
        expect(statusCode).toBe(400);
    })
});
