import * as migration_20261016_185911 from './20261016_185911';
import * as migration_20261112_155014_julegaver from './20261112_155014_julegaver';

export const migrations = [
  {
    up: migration_20261016_185911.up,
    down: migration_20261016_185911.down,
    name: '20261016_185911',
  },
  {
    up: migration_20261112_155014_julegaver.up,
    down: migration_20261112_155014_julegaver.down,
    name: '20261112_155014_julegaver'
  },
];
