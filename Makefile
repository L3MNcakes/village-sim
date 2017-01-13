start:
	gulp && sudo docker build -t l3mncakes/village-sim . && sudo docker run --name village-sim -d -p 1234:80 -v `pwd`/dist/:/usr/share/nginx/html:ro l3mncakes/village-sim

stop:
	sudo docker stop village-sim && sudo docker rm village-sim

restart:
	make stop && make start
