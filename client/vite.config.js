import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , tailwindcss()],
  server:{
    proxy:{
      '/droidcam':{
        // target: 'http://192.168.0.101:4747', //change ip according to that palce and wifi
        // changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/droidcam/, '')

        // target: 'http://192.168.0.101:4747',
        // target: 'http://192.168.0.101:4748',
        target: 'http://10.21.84.17:4748',
        changeOrigin: true,
        secure: false, // Add this
        ws: true, // Add this for WebSocket support
        rewrite: (path) => path.replace(/^\/droidcam/, ''),
        // Add timeout settings
        proxyTimeout: 30000,
        timeout: 30000,
        // headers: {
        //   Connection: "keep-alive"
        // } //for camera video

        headers: {
          'Access-Control-Allow-Origin': "'*'",
          'Access-Control-Allow-Methods': "'GET'",
          'Access-Control-Expose-Headers': "'Content-Length'"
        }
      }
    }
  }
})
