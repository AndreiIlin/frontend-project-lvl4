start-backend:
	npx start-server -p 5001
start-frontend:
	make -C application start
install:
	npm ci
	make -C application install
start:
	make start-backend & make start-frontend
