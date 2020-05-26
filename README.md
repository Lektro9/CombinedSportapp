# CombinedSportapp

This is a combinded version of Sportapp and SportappFrontend

# How to start everything

```bash
cd CombinedSportapp/mysite
sudo docker-compose down -v
sudo docker-compose -f docker-compose.prod.yml up -d --build

sudo docker-compose -f docker-compose.prod.yml exec web python manage.py migrate --noinput

sudo docker-compose -f docker-compose.prod.yml exec web python manage.py collectstatic --no-input --clear

sudo docker-compose logs -f
```
