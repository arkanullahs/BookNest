#!/bin/sh

# Install Composer manually
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer

# Run Composer install
composer install --no-dev --optimize-autoloader

# Start Laravel application
php artisan migrate --force
php artisan config:cache
php artisan serve --host=0.0.0.0 --port=8000
