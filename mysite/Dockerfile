# pull official base image
FROM python:3.8.0-alpine

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./Pipfile /usr/src/app/Pipfile
RUN pip install pipenv

# Install project dependencies
RUN pipenv install --skip-lock --system --dev

# copy project
COPY . /usr/src/app/