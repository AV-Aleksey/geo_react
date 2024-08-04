import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { extname } from 'path';
import { defineConfig } from 'vite';
import inspect from 'vite-plugin-inspect';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ command, mode }) => {
  const isServe = command === 'serve';

  const isDev = mode === 'development';

  const server =
      isDev && isServe
          ? {
            port: 41009,
            host: '127.0.0.1',
          }
          : {};

  return {
    define: {
      __BUILD_DATE__: JSON.stringify(
          new Date().toLocaleString('ru', { timeZone: 'Europe/Moscow' }),
      ),
    },
    base: '/',
    plugins: [
      svgr(),
      react(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      tsconfigPaths(),
      inspect(),
    ],
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: ({ name: fileName = '' }) => {
            const ext = extname(fileName);

            if (ext === '.css') {
              return 'static/css/[name]-[hash].[ext]';
            }

            return 'static/media/[name]-[hash].[ext]';
          },
        },
      },
    },
    server,
  };
});
