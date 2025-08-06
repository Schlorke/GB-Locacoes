import { setProjectAnnotations } from '@storybook/nextjs';
import * as projectAnnotations from './preview';

// Provide Node.js globals for browser environment
if (typeof globalThis.process === 'undefined') {
  (globalThis as any).process = {
    env: {
      NODE_ENV: 'test',
    },
    browser: true,
    version: '',
    versions: {},
  };
}

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([projectAnnotations]);
