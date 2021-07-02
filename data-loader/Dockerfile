# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

ENV APP_DIR /app_dir
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

ADD ./requirements.txt ${APP_DIR}
RUN pip install -r requirements.txt

COPY . ${APP_DIR}

ENTRYPOINT ${APP_DIR}/docker-entrypoint.sh