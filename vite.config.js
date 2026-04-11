import { rmSync } from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron/simple';
import pkg from './package.json';
export default defineConfig(function (_a) {
    var command = _a.command;
    rmSync('dist-electron', { recursive: true, force: true });
    var isServe = command === 'serve';
    var isBuild = command === 'build';
    var sourcemap = isServe;
    return {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src'),
                '@shared': path.join(__dirname, 'shared'),
            },
        },
        plugins: [
            react(),
            electron({
                main: {
                    entry: 'electron/main/index.ts',
                    onstart: function (_a) {
                        var startup = _a.startup;
                        startup();
                    },
                    vite: {
                        build: {
                            sourcemap: sourcemap,
                            minify: isBuild,
                            outDir: 'dist-electron/main',
                            rollupOptions: {
                                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
                            },
                        },
                    },
                },
                preload: {
                    input: 'electron/preload/index.ts',
                    vite: {
                        build: {
                            sourcemap: sourcemap ? 'inline' : undefined,
                            minify: isBuild,
                            outDir: 'dist-electron/preload',
                            rollupOptions: {
                                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
                            },
                        },
                    },
                },
                renderer: {},
            }),
        ],
        clearScreen: false,
    };
});
