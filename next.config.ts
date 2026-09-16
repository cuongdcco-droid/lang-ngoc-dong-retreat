import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
export default (phase: string): NextConfig => ({ output: 'export', images: { unoptimized: true }, distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next' });
