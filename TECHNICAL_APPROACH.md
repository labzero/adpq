# Technical Approach
## Development Process
We use the GitFlow branching model and create feature branches off of the develop branch for all new changes. All 
commits should adhere to the guidelines described in our [commit guide](https://github.com/labzero/guides/blob/master/process/commit_guide.md). 
Each feature branch is pushed to Github and a pull request is created, built and tested in CircleCI before peer-review 
is performed by other developers on the team. Upon final approval by the dev lead, the branch will be squash-merged back 
into develop.

## CI Process
PR phase looks for success for all of these steps:
* Compilation and Docker container build
* Credo (code quality/style analyser)
* Unit tests

## Continuous Delivery
* Commits to develop trigger deployment to our Test environment
* Upon deployment post-deploy automated testing it performed

## Release Process
Using GitFlow tooling, we create a release branch and tag. The tag is then used to create a new container image. A job 
in Circle CI is used to deploy the tagged container to ECS in AWS.

## Architectural Approach
This web application will be built as a modern React.js app (Single Page Application) that consumes a JSON API backend 
written in Elixir using the Phoenix framework and talking to a Postgres database. We considered using Shopify or Spree 
but ultimately decided to build the prototype from scratch so that we could demonstrate our ability to write good custom
 software with usable user interfaces that was designed after speaking with real users.
 
![Cloud Architecture](/docs/ADPQ-PrototypeA-Architecture.png)

## Infrastructure Approach
This application will be built in a cloud-first manner on AWS, but will be deployed as a Docker container in order to 
allow cloud portability. However, if AWS offers a managed service for something we need, we will prefer the managed 
service to rolling our own infrastructure. I.e. Postgres via RDS instead of running our own Postgres servers in EC2. 

Our VPC and security blueprints will be maintained as CloudFormation templates and checked into Git.