import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      // Enable SharedArrayBuffer for @imgly multi-threading
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      },
      proxy: {
        '/api/hf': {
          target: 'https://api-inference.huggingface.co',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/hf/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              // Add HF token from env
              if (env.VITE_HUGGING_FACE_TOKEN) {
                proxyReq.setHeader('Authorization', `Bearer ${env.VITE_HUGGING_FACE_TOKEN}`);
              }
            });
          }
        }
      }
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    worker: {
      format: 'es'
    }
  };
});
