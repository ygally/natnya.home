SHELL := /bin/bash
.ONESHELL:
.DEFAULT_GOAL := build

APP_NAME := natya
IMAGE := $(APP_NAME)/web
TAG ?= $(shell git rev-parse --short HEAD 2>/dev/null || echo dev)
PORT ?= 3000

# GCP settings
GCP_PROJECT ?=
GCP_REGION ?= europe-west1
SERVICE_NAME ?= natya-web
REPO ?= europe-docker.pkg.dev/$(GCP_PROJECT)/containers/$(APP_NAME)
IMAGE_URI := $(REPO):$(TAG)

# Local
.PHONY: build
build: ## Build container image locally
	@docker build -t $(IMAGE):$(TAG) .

.PHONY: up
up: ## Run with docker compose
	@docker compose up --build -d
	@echo "App running at http://localhost:$(PORT)"

.PHONY: down
down: ## Stop compose
	@docker compose down

.PHONY: logs
logs:
	@docker compose logs -f --tail=200

.PHONY: clean
clean:
	@docker compose down -v || true
	@docker rmi $(IMAGE):$(TAG) || true

# GCP Auth and project
.PHONY: gcp:auth
gcp:auth: ## Authenticate to GCP (requires gcloud)
	@test -n "$(GCP_PROJECT)" || (echo "Set GCP_PROJECT env var" && exit 1)
	@gcloud auth login --update-adc
	@gcloud config set project $(GCP_PROJECT)

.PHONY: gcp:enable
gcp:enable: ## Enable required services
	@gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com iam.googleapis.com

.PHONY: gcp:repo
gcp:repo: ## Create Artifact Registry repo if missing
	@gcloud artifacts repositories create containers --repository-format=docker --location=$(GCP_REGION) || true

# Build & push with Cloud Build
.PHONY: gcp:cb:build
gcp:cb:build: ## Cloud Build image
	@test -n "$(GCP_PROJECT)" || (echo "Set GCP_PROJECT env var" && exit 1)
	@gcloud builds submit --tag $(IMAGE_URI) .

# Deploy to Cloud Run from container image
.PHONY: gcp:deploy
gcp:deploy: ## Deploy Cloud Run service
	@test -n "$(GCP_PROJECT)" || (echo "Set GCP_PROJECT env var" && exit 1)
	@gcloud run deploy $(SERVICE_NAME) \
	  --image $(IMAGE_URI) \
	  --region $(GCP_REGION) \
	  --allow-unauthenticated \
	  --platform managed \
	  --port 3000 \
	  --set-env-vars NEXT_TELEMETRY_DISABLED=1,NODE_ENV=production

# Build locally and push to Artifact Registry (manual path)
.PHONY: gcp:login
gcp:login: ## Docker login to Artifact Registry
	@test -n "$(GCP_PROJECT)" || (echo "Set GCP_PROJECT env var" && exit 1)
	@gcloud auth configure-docker $(GCP_REGION)-docker.pkg.dev

.PHONY: gcp:build:push
gcp:build:push: ## Build locally and push to AR
	@docker build -t $(IMAGE_URI) .
	@docker push $(IMAGE_URI)

# CI note: prefer GHA with Workload Identity Federation

help: ## Show this help
	@grep -E '^[a-zA-Z0-9_:\-]+:.*?## .*$$' $(MAKEFILE_LIST) | sed 's/: .*##/:/;s/\(.*\):/\x1b[36m\1\x1b[0m:/' | column -c2 -t -s :
