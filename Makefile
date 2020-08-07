
PHONY:

build_image:
	docker build -t deno-api

test:
	docker-compose -f docker-compose-test.yml up --exit-code-from test
