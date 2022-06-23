start-backend:
		cd server && npm start
start-frontend:
		cd application && npm start
install:
		cd server
		npm ci
		cd ..
		cd application
		npm ci
