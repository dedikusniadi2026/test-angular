# EmployeeManagementMandiri

Aplikasi **Employee Management** yang dibuat menggunakan **Angular 21** dengan **Standalone Components** dan **SCSS**.

## Requirements

Pastikan telah menginstall:

* Node.js (sesuai requirement Angular 21)
* npm
* Angular CLI 21.x

Cek versi:

```bash
node -v
npm -v
ng version
```

## Installation

Clone repository kemudian install dependency:

```bash
npm install
```

## Default Login

Gunakan akun berikut untuk masuk ke aplikasi:

| Username  | Password     |
| --------- | ------------ |
| **admin** | **admin123** |

## Development Server

Untuk menjalankan aplikasi secara lokal, gunakan salah satu perintah berikut:

```bash
npm run start
```

atau

```bash
ng serve
```

Setelah server berhasil dijalankan, buka browser:

```
http://localhost:4200
```

> **Catatan:** Jika port **4200** sedang digunakan, Angular akan otomatis menawarkan port lain.

## Project Stack

* Angular 21
* Standalone Components
* SCSS
* Angular Material
* Bootstrap
* RxJS
* TypeScript

## Build Production

Untuk melakukan build production:

```bash
ng build
```

Hasil build akan tersimpan pada folder:

```
dist/
```

## Generate Component

Membuat component baru:

```bash
ng generate component component-name
```

Untuk melihat seluruh schematic Angular CLI:

```bash
ng generate --help
```

## Running Unit Test

Menjalankan unit test menggunakan Vitest:

```bash
ng test
```

## Running End-to-End Test

Menjalankan e2e test:

```bash
ng e2e
```

Secara default Angular CLI tidak menyediakan framework e2e. Anda dapat menggunakan framework seperti:

* Cypress
* Playwright

## Additional Resources

Dokumentasi resmi Angular CLI:

* https://angular.dev/tools/cli

Repository ini dibuat sebagai contoh aplikasi CRUD Employee Management menggunakan Angular 21 dengan autentikasi login, dashboard, responsive layout, sidebar, topbar, dan manajemen data karyawan.
