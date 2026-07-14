# Tiendapp Test

Aplicación full-stack para la gestión de marcas y productos de un inventario, con un backend en Laravel y un frontend en Next.js.

## Descripción

Este proyecto permite administrar de forma sencilla los registros de marcas y productos a través de una interfaz web y una API REST. Está diseñado para servir como base para un sistema de inventario básico, con una estructura clara entre frontend y backend.

## Tecnologías utilizadas

### Backend

- Laravel
- PHP
- API REST
- PHPUnit para pruebas

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Funcionalidades

- Gestión de marcas
- Gestión de productos
- CRUD básico a través de la interfaz
- Consumo de API desde el frontend

## Requisitos previos

- PHP 8.3 o superior
- Composer
- Node.js 20 o superior
- npm

## Instalación

### 1. Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
```

### 2. Frontend

```bash
cd frontend
npm install
```

## Ejecución

### 1. Backend

```bash
cd backend
php artisan serve
```

### 2. Frontend

```bash
cd frontend
npm run dev
```
