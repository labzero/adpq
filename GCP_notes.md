
### Google Cloud Platform

- Install gcloud sdk for command line tools
  https://cloud.google.com/sdk/downloads

- General observations
  - More CLI oriented / better CLI tools than AWS
  - Better documentation (may just be less outdated)
  - Presents a higher level abstraction than AWS (projects / resources / APIs). I assume you can drop down if you need to

#### Google App Engine
- *Standard Environment*
  - managed runtime / sandbox
  - different programming model - access to OS and Cloud services via APIs
  - limited language support (Java, Go, Python, PHP)
  - 
- *Flexible Environment*
  - Managed Docker containers running on GCE VMs (with convenient tooling)
  - Officially supported - Ruby, Node, .NET (+ above)
    - bundle a standard set of native dependencies for that platform (e.g. imagemagick, libxml, libpg for ruby)  
  - Custom runtimes - as long as you can describe how to build a container that can run your app
    - i.e. can add arbitrary native code dependencies etc.
  - Elixir custom runtime authored by Google but not officially supported yet. 
  https://github.com/GoogleCloudPlatform/elixir-runtime
  - works with Distillery. Deploys Distillery releases.
  - automatically does a sensible build for Phoenix apps (builds assets etc.), but build steps can be customized

  - **app.yaml**
```yaml
env: flex
runtime: gs://elixir-runtime/elixir.yaml
runtime_config:
  release_app: adpq
env_variables:
  foo: "bar"
  ...
automatic_scaling:
  min_num_instances: 1
  max_num_instances: 1
```

- Deployment is just `gcloud app deploy`

- Summary: extremely nifty and easy to use but limited (no websockets).

#### Google Cloud SQL

- Managed RDBMS (MySQL or Postgres)
- Convenient connectivity provided via a *Cloud SQL proxy* process
  - Don't have to mess w/ networking / firewall rules etc.
  - Can easily run against Cloud DB locally
  - GAE flexible environment spins up a container for it alongside your app.
  - In GKE you explicitly add one to your deployment

#### Google Container Repository

#### Google Container Builder
  - Takes your source code and dockerfile and builds / stores your image

#### Google Kubernetes Engine

  - like ECS except w/ standard k8s tooling / concepts
  - Cluster - group of VMs to run your containers
  - Pods - basic unit of deployment 
  - Services - basic unit of exposed functionality
  - GKE also has a facility for storing secrets
    - Refer to stored secrets in your deployment config
    - Made available as ENV vars to your app config


  - How-To
    - Create a cluster
      - `gcloud container clusters create adpq-cluster --num-nodes=2 --zone=us-central1-a`
    - `gcloud config set container/cluster adpq-cluster`
    - add necessary secrets to the cluster.
      - `kubectl create secret generic cloudsql-instance-credentials 
    --from-file=credentials.json=cloud-sql-service-account.json`
      - `kubectl create secret generic cloudsql-db-credentials 
    --from-literal=username=proxyuser --from-literal=password=IjpdBOc6jaq86h7u`

    - Build it on Google Container Builder
      - `gcloud container builds submit --tag=gcr.io/elixir-futzing/adpq:v1 .`

    - Create a `deployment.yaml` file (similar to `docker-compose.yml`).
    - Apply this configuration to your cluster 
      - `kubectl apply -f deployment.yaml`

    - Expose your cluster to the outside world
      - `kubectl expose deployment adpq --type=LoadBalancer --port 80 --target-port 8080`

    - Wait for it to come up
     - `kubectl get service`
