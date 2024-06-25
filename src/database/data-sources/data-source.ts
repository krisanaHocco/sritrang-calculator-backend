import { DataSource } from 'typeorm';

import { dataSourceOptions } from 'src/database/data-sources/data-source-options';

export const dataSource = new DataSource({
  ...dataSourceOptions,
  entities: ['dist/**/**/*.entity.js'],
  migrations: ['dist/src/migration/*.js'],
});
