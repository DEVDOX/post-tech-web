#!/usr/bin/env bash

# backend
docker-compose build
docker-compose run --rm api mix deps.get
docker-compose run --rm api mix ecto.reset

# frontend
docker-compose run --rm nuxt yarn install
