import { describe, it, expect } from 'vitest';
import theme from './theme';

describe('theme', () => {
  it('exports a theme object', () => {
    expect(theme).toBeDefined();
    // Check palette mode
    // MUI theme structure can be deep, but checking palette exists is good
    expect(theme.palette).toBeDefined();
    expect(theme.palette.mode).toBe('dark');
  });
});
