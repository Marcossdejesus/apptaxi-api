"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedDataSource = void 0;
const typeorm_1 = require("typeorm");
const _1710864000001_SeedMotoristas_1 = require("./seeds/1710864000001-SeedMotoristas");
const _1710864000002_SeedPassageiros_1 = require("./seeds/1710864000002-SeedPassageiros");
const _1710864000003_SeedCorridas_1 = require("./seeds/1710864000003-SeedCorridas");
exports.SeedDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'AppTaxi',
    entities: ['dist/**/*.entity.js'],
    migrations: [
        _1710864000001_SeedMotoristas_1.SeedMotoristas1710864000001,
        _1710864000002_SeedPassageiros_1.SeedPassageiros1710864000002,
        _1710864000003_SeedCorridas_1.SeedCorridas1710864000003
    ],
    synchronize: false,
    logging: true,
});
//# sourceMappingURL=data-source-seed.js.map