import * as migration_20261016_185911 from './20261016_185911';
import * as migration_20261112_155014_julegaver from './20261112_155014_julegaver';
import * as migration_20261112_171112_norsk_sortering from './20261112_171112_norsk_sortering';

export const migrations = [
  {
    up: migration_20261016_185911.up,
    down: migration_20261016_185911.down,
    name: '20261016_185911',
  },
  {
    up: migration_20261112_155014_julegaver.up,
    down: migration_20261112_155014_julegaver.down,
    name: '20261112_155014_julegaver',
  },
  {
    up: migration_20261112_171112_norsk_sortering.up,
    down: migration_20261112_171112_norsk_sortering.down,
    name: '20261112_171112_norsk_sortering'
  },
];
