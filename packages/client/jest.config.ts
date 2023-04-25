import type { Config } from '@jest/types';

import baseConfig from '../../jest.config.js';

const config: Config.InitialOptions = {
  ...baseConfig,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', 'jest-matcher-specific-error'],
};

export default config;
