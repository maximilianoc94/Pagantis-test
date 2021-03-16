FROM python:3.8-slim-buster

RUN apt update -y

COPY . ./

RUN pip install -r requirements.txt

ENV FLASK_RUN_HOST 0.0.0.0
ENV FLASK_RUN_PORT 5000
ENV FLASK_ENV=development

ENTRYPOINT [ "flask", "run"]
