# CombinedSportapp
This is a combinded version of Sportapp and SportappFrontend

# Docker commands
$ docker-compose down -v

$ docker-compose -f docker-compose.prod.yml up -d --build

$ docker-compose -f docker-compose.prod.yml exec web python manage.py migrate --noinput

$ docker-compose -f docker-compose.prod.yml exec web python manage.py collectstatic --no-input --clear

$ sudo docker-compose logs -f