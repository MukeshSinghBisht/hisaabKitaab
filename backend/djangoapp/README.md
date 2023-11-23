# hisaabKitaab
Hisaab Kitaab means book keeping in a shop, Its is an app to ask price and log the things you sold, it will make easier to shop workers to get correct calculated price of the goods to be sold. It wil be in python pjango Also we can add delivery related functionalities later. We can put entry also of the goods we are purchasing. 

steps to run local
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

Superuser
sername (leave blank to use 'mukesh.bisht'): 
Email address: bishtmukeshsingh1993@gmail.com
Password:india@123

normal app: http://localhost:8000/
admin http://localhost:8000/admin
admin creds
username mukesh.bisht
pass: india@123

#to create a new app 
1.python manage.py startapp price
2.

#apis
https://0e4a-2401-4900-1f3a-3235-5-a210-9106-3bc9.ngrok-free.app/price/getPrice?query=gaaykadudh


if runnning server 
1.got to backend
2.venv\Scripts\activate
3.python manage.py runserver 

update backend\hisaabkitaabproject\settings.py with  ALLOWED_HOSTS = ['*']
 if you update new ngrok url

 useful links"
1. https://medium.com/ruralscript/install-and-setuppostgresql-on-ubuntu-amazon-ec2-5d1af79b4fca
2.https://www.knowledgehut.com/blog/web-development/install-django-on-ubuntu
3.https://awstip.com/how-to-deploy-django-application-on-aws-ubuntu-ec2-25a24ca439e2


##connecting to remote server :
 remote login from window to aws server :  ssh -i "hkapiserverkeypair.pem" ubuntu@ec2-43-205-129-116.ap-south-1.compute.amazonaws.com
inside directry pemforebs
then go to app/hisaabkitaab and git pull

## to see recent logs on server in python log files:
1.got to app/hisaabKitaab/backend and
2.run: tail -n 50 -f django.log




## for production server api starting:
prod url: http://43.205.129.116:8000
1.source venv-hkapi/bin/activate
2.gunicorn --bind 0.0.0.0:8000 hisaabkitaabproject.wsgi &// it will start server in prod
3.nohup gunicorn hisaabkitaabproject.wsgi:application --bind 0.0.0.0:8000 &
4.tail -f nohup.out // to see logs from nohub logs even real time logs will also be there

5. command to get pid on 8000 on prod ubuntu: sudo lsof -i :8000 -t
5.1. outut will be like this :
8470
8604
6.to kill process :sudo kill 8604

## restarting server on prod
1.go to app/hisaabKitaab/backend
2.source venv-hkapi/bin/activate
3.pip install -r requirements.txt
4.killall gunicorn
4.gunicorn --bind 0.0.0.0:8000 hisaabkitaabproject.wsgi &
5.nohup gunicorn hisaabkitaabproject.wsgi:application --bind 0.0.0.0:8000 &
6.tail -f nohup.out

7.TODO:
1.we can conevert hinglish to english , then convert hinglish words to numbers and units and then get the product name from the rest of the sentence
2.

