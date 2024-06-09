import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://localhost:8000/",
        changeOrigin: true, // 表示开启代理, 允许跨域请求数据
        secure: false,  // 如果是https接口，需要配置这个参数    
        // rewrite: path => path.replace(/^\/api/, '') // 设置重写路径, 去掉path 
      
			},
		},
	},
})
