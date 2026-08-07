"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('OctoFit API', () => {
    it('returns the health status', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/health');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: 'ok' });
    });
    it('returns the backend message', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/api');
        expect(response.status).toBe(200);
        expect(response.body.message).toContain('OctoFit');
    });
    it('returns workout suggestions', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/api/workouts');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(3);
    });
});
//# sourceMappingURL=api.test.js.map