import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {  
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        cabana: 'cabana.html',
        contacto: 'contacto.html',
        terminos: 'terminos.html',
        'tours-nacionales': 'tours-nacionales.html',
        'tours-internacionales': 'tours-internacionales.html',
        'calendario': 'calendario.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})