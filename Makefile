.PHONY: dev build preview dbis

dev:
	@cd lotus && npm run dev

build:
	@cd lotus && npm run build

preview:
	@cd lotus && npm run preview

dbis:
	@cd lotus && npm run dbis