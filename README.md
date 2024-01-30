# Socialify

## Local deployment steps

For the backend(You need PHP and Composer installed):
```
composer install
```
for the peridoic user data/token refresh - you need to add a cron entry that invokes the php artisan schedule:run every minute
Example:
```
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```
for the API_KEY in .env - let Laravel generate it:
```
php artisan key:generate
```
and after setting up .env variables(If you don't have ssl certification setup -> vendor/guzzlehttp/guzzle/src/Client.php -> in configureDefaults() in $defaults change verify to false)
```
php artisan migrate
php artisan serve
```
---
For the frontend(You need Node.js installed):
```
npm install
npm run dev
```