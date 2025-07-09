check-deadcode = yarn knip
check-format = yarn dprint check
db-migrate = npx prisma migrate dev
dedupe = yarn dedupe
lint-css = yarn stylelint 'src/**/*.css'
lint-ts = yarn eslint src prisma --max-warnings=0 --cache --cache-location node_modules/.cache/eslint
optimize-svg = yarn svgo -f public -r
test = yarn vitest
typecheck = yarn astro check

all: help
build: ## Construire l'application qui va être déployée en production
	yarn astro build
check: ## Lancer la CI
	$(dedupe) --check
	# $(check-deadcode)
	$(check-format)
	$(typecheck)
	$(lint-css)
	$(lint-ts)
	$(test) run
check-deadcode: ## Analyser le code mort
	$(check-deadcode)
check-dependencies: ## Analyser les dépendances inutiles
	yarn depcheck
check-format: ## Analyser le formatage du code
	$(check-format)
db-dev: ## Ouvrir la CLI de la base de données de dev
	docker compose up -d postgres-dev && docker exec -it socle_db_dev psql -U socle socle
db-migrate: ## Lancer la migration de la base de données
	$(db-migrate)
db-test: ## Ouvrir la CLI de la base de données de test
	docker compose up -d postgres-test && docker exec -it socle_db_test psql -U socle socle
db-start: ## Lancer les containeurs
	docker compose down && docker compose up -d && while ! docker compose logs | grep -q 'listening on IPv4 address'; do echo 'Waiting for database'; sleep 0.5; done;
db-reset: ## Réinitialiser la base de données
	npx prisma migrate reset -f
dedupe: ## Dédupliquer yarn.lock
	$(dedupe)
dev: ## Démarrer l'environnement de dev
	$(db-migrate)
	yarn astro dev
format: ## Formater le code
	yarn dprint fmt
help: ## Fournir de l'aide sur les commandes (par défaut)
	awk 'BEGIN {FS = ":.*##"; printf "Usage: make \033[36m<command>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
lint-css: ## Détecter les erreurs CSS selon nos règles
	$(lint-css)
lint-ts: ## Détecter les erreurs TypeScript selon nos règles
	$(lint-ts)
optimize-svg: ## Réduire le poids des SVGs
	$(optimize-svg)
start: ## Démarrer l'environnement de production
	node run-server.mjs
test: ## Lancer les tests
	$(test) run
test-watch: ## Lancer les tests et se met à jour lors d'un changement de code
	$(test) $(FILE)
test-coverage: ## Lancer la couverture de tests
	$(test) run --coverage
test-mutation: ## Lancer les tests de mutation
	yarn stryker run
typecheck: ## Analyser le typage
	$(typecheck)
