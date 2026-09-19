This project was completed along with the LinkedIn Learning course `Mastering Observability with OpenTelemetry`. by Daniel Khan

Things learned doing this project and course :

- How to set up and configure OpenTelemetry for collecting telemetry data (traces, metrics, logs) from cloud applications.
- Instrumentation techniques for Node.js and Python applications to enable distributed tracing.
- Using tools like Jaeger for trace analysis and Grafana for visualizing metrics and logs.
- Installing and configuring the OpenTelemetry Collector to manage telemetry data.
- Practical steps for running observability tools with Docker and integrating them into your development environment.

Tools and Tech required :
Install Visual Studio Code as your IDE, Node.js (latest LTS), Python 3, and Docker for container management.
Use Docker to run a MongoDB container

### Architecture 
<img width="1078" height="430" alt="image" src="https://github.com/user-attachments/assets/b042c033-ee81-44ae-9afe-a910125a2ebd" />

### How to start Services 

For the Node.js front end:
```
cd node-frontend
npm install
npm start
```

For the Node.js backend service (blue):
```
cd node-service-blue
npm install
npm start
```

For the Python service gateway:
```
cd python-service-gateway
flask run --port 3001
```

For the Python service green:
```
cd python-service-green
flask run --port 3010

```


