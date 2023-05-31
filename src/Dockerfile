# Menggunakan node versi 14 sebagai base image
FROM node:14

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json untuk menginstal dependensi
COPY package*.json ./

# Menginstal dependensi
RUN npm install

# Menyalin seluruh source code ke dalam container
COPY . .

# Menjalankan perintah untuk build aplikasi
RUN npm run build

# Menjalankan perintah untuk mengexpose port yang digunakan oleh aplikasi
EXPOSE 8080

# Menjalankan perintah untuk menjalankan aplikasi saat container dijalankan
CMD [ "node", "server.js" ]
