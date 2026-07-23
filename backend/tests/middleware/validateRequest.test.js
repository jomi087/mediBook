import { validateRequest } from "../../middleware/validateRequest.js";
import { signupSchema } from "../../validations/authSchema.js";
import { AppError } from "../../errors/AppError.js";
import { jest } from "@jest/globals";

describe("validateRequest Middleware", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = { body: {} };
        res = {};
        next = jest.fn();
    });

    test("should call next() for valid request body", async () => {
        req.body = {
            name: "John Doe",
            email: "john@example.com",
            password: "Password@123",
        };

        await validateRequest(signupSchema)(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);

        expect(req.body).toEqual({
            name: "John Doe",
            email: "john@example.com",
            password: "Password@123",
        });
    });

    test("should throw ZodError for invalid email", async () => {
        req.body = {
            name: "John Doe",
            email: "invalid-email",
            password: "Password@123",
        };

        await expect(
            validateRequest(signupSchema)(req, res, next)
        ).rejects.toThrow();

        expect(next).not.toHaveBeenCalled();
    });

    test("should throw ZodError for weak password", async () => {
        req.body = {
            name: "John Doe",
            email: "john@example.com",
            password: "123",
        };

        await expect(
            validateRequest(signupSchema)(req, res, next)
        ).rejects.toThrow();

        expect(next).not.toHaveBeenCalled();
    });

    test("should throw ZodError when required fields are missing", async () => {
        req.body = {};

        await expect(
            validateRequest(signupSchema)(req, res, next)
        ).rejects.toThrow();

        expect(next).not.toHaveBeenCalled();
    });

    test("should throw AppError when request body is missing", async () => {
        req.body = null;

        await expect(
            validateRequest(signupSchema)(req, res, next)
        ).rejects.toBeInstanceOf(AppError);

        expect(next).not.toHaveBeenCalled();
    });

    test("should validate request params when location is 'params'", async () => {
        req.params = {
            id: "123",
        };

        const schema = {
            parseAsync: jest.fn().mockResolvedValue({
                id: "123",
            }),
        };

        await validateRequest(schema, "params")(req, res, next);

        expect(schema.parseAsync).toHaveBeenCalledWith({
            id: "123",
        });

        expect(next).toHaveBeenCalledTimes(1);
    });
});