#aws login
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=

#backup
psql.config

```
[postgresql]
host=
port=5432
db=blog
user=postgres
password=

```

python backup.py --configfile psql.config --action backup --verbose VERBOSE


#image push
aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin 486645269554.dkr.ecr.us-west-1.amazonaws.com
docker build -t protohub .
docker tag protohub:latest 486645269554.dkr.ecr.us-west-1.amazonaws.com/protohub:latest
docker push 486645269554.dkr.ecr.us-west-1.amazonaws.com/protohub:latest

#ECS
--> service --> task --> stop task --> new task
#EC2 (network load balancer --> target group)
--> target group --> update target group to new private IP of ECS task
