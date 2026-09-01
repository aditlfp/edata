# E-DATA

> Sistem operasional dan payroll berbasis web untuk mengelola karyawan, relasi mitra, kontrak, absensi, serta slip gaji bulanan.

## Tentang

E-DATA menyatukan data operasional dalam satu dashboard admin. Modul payroll mendukung input manual, import Excel/CSV, export data, serta pembuatan slip gaji.

## Fitur

- Dashboard admin dengan navigasi berbasis role
- Manajemen data karyawan dan pengguna
- Relasi mitra/client, divisi, jabatan, dan kontrak
- Pengelolaan slip gaji bulanan
- Import slip gaji dari `.xls`, `.xlsx`, atau `.csv`
- Export template serta data slip gaji
- Generate slip gaji PDF
- Filter, pencarian, pagination, dan status payroll
- Autentikasi, verifikasi email, reset password, dan Sanctum

## Stack

| Area | Teknologi |
| --- | --- |
| Backend | Laravel 12, PHP 8.2+ |
| Frontend | React, Inertia.js, Vite |
| UI | Tailwind CSS, DaisyUI |
| Database | MySQL |
| Export | Laravel Excel |
| PDF | Dompdf |
| Auth | Laravel Breeze, Sanctum |

## Prasyarat

- PHP `8.2+`
- Composer
- Node.js `18+`
- MySQL

## Instalasi

```bash
git clone https://github.com/aditlfp/edata.git
cd edata
composer install
cp .env.example .env
php artisan key:generate
npm install
```

Atur koneksi database pada `.env`, lalu jalankan migration:

```bash
php artisan migrate
npm run build
```

## Konfigurasi database

Aplikasi memakai koneksi database utama serta koneksi operasional tambahan. Sesuaikan `.env` berdasarkan environment deployment:

```env
APP_NAME=E-DATA
APP_ENV=production
APP_DEBUG=false
APP_URL=https://domain.example

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=edata
DB_USERNAME=username
DB_PASSWORD=password

DB_CONNECTION_SECOND=mysql
DB_HOST_SECOND=127.0.0.1
DB_DATABASE_SECOND=absensi
DB_USERNAME_SECOND=username
DB_PASSWORD_SECOND=password
```

> Jangan commit `.env`. Gunakan secret manager atau environment variables pada server.

## Development

Jalankan backend dan frontend secara terpisah:

```bash
php artisan serve
npm run dev
```

Atau gunakan script development:

```bash
composer run dev
```

Bersihkan cache konfigurasi setelah mengubah `.env`:

```bash
php artisan optimize:clear
```

## Testing

```bash
php artisan test
```

Test memerlukan database yang sesuai dengan konfigurasi environment testing. Jangan menjalankan test terhadap database production.

## Deployment checklist

```bash
composer install --no-dev --optimize-autoloader
php artisan migrate --force
npm run build
php artisan optimize
```

Pastikan sebelum go-live:

- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_KEY` tersedia
- database backup tersedia
- storage dapat ditulis
- web server mengarah ke `public/`
- queue worker aktif jika aplikasi memakai queue
- `.env`, `vendor/`, `node_modules/`, dan asset build lokal tidak di-commit

## Struktur utama

```text
app/
├── Exports/       Export Excel
├── Http/          Controller, request, middleware
├── Imports/       Import Excel/CSV
├── Models/        Model Eloquent
└── Notifications/ Notifikasi aplikasi

database/
├── migrations/    Struktur database
└── seeders/       Data awal

resources/js/
├── Components/    Komponen React
├── Layouts/       Layout aplikasi
└── Pages/         Halaman Inertia
```

## Keamanan

- Simpan credential hanya pada `.env` atau secret manager.
- Gunakan HTTPS pada production.
- Batasi akses modul payroll berdasarkan role.
- Backup database sebelum migration production.
- Jalankan audit dependency berkala:

```bash
composer audit
npm audit
```

## Lisensi

Lisensi project ditentukan oleh pemilik repository.
