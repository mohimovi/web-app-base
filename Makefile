CODE_SNIFFER_OPTIONS = --colors --standard="psr2" --encoding="utf-8"

.PHONY: install install-dev server cs fmt test

composer.phar:
	php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
	php composer-setup.php
	php -r "unlink('composer-setup.php');"

install: composer.phar
	./composer.phar install --no-dev --prefer-dist --optimize-autoloader --no-interaction

install-dev: composer.phar
	./composer.phar install --dev --prefer-dist --no-interaction

server:
	php -S 0.0.0.0:8000 -t public/

cs:
	php vendor/bin/phpcs $(CODE_SNIFFER_OPTIONS) lib/

fmt:
	php vendor/bin/phpcbf $(CODE_SNIFFER_OPTIONS) lib/

test:
	php vendor/bin/phpunit --bootstrap test/bootstrap.php test/
