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
1.venv\Scripts\activate
2.python manage.py runserver 

update backend\hisaabkitaabproject\settings.py with  ALLOWED_HOSTS = ['*']
 if you update new ngrok url

 useful links"
 https://medium.com/ruralscript/install-and-setuppostgresql-on-ubuntu-amazon-ec2-5d1af79b4fca

 remote login from window to aws server :  ssh -i "hkapiserverkeypair.pem" ubuntu@ec2-43-205-129-116.ap-south-1.compute.amazonaws.com
inside directry pemforebs
then go to app/hisaabkitaab and git pull