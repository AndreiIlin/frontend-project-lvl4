start-backend:
	make -C server start
start-frontend:
	make -C application start
install:
	make -C server install
	make -C application install
