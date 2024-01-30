# Socialify

## Local deployment steps

For the backend(You need PHP and Composer installed):
```
composer install
```
and after setting up .env variables
```
php artisan migrate
php artisan serve
```
(If you don't have ssl certification setup -> vendor/guzzlehttp/guzzle/src/Client.php -> in configureDefaults() in $defaults change verify to false)
---
For the frontend(You need Node.js installed):
```
npm run dev
```