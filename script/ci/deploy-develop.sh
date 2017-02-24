#!/usr/bin/env bash

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

export MIX_ENV="develop"
export PATH="$HOME/dependencies/erlang/bin:$HOME/dependencies/elixir/bin:$PATH"

configure_aws_cli(){
  aws --version
  aws configure set default.region us-west-1
  aws configure set default.output json
}

deploy_cluster() {

    family="adpq-task-family"

    make_task_def
    register_definition
    if [[ $(aws ecs update-service --cluster ADPQ --service adpq-web --task-definition $revision | \
                   $JQ '.service.taskDefinition') != $revision ]]; then
        echo "Error updating service."
        return 1
    fi
    # Skip stale version check. remove this and uncomment below if desired
    echo "Deployed!"
    return 0
    # # wait for older revisions to disappear
    # # not really necessary, but nice for demos
    # for attempt in {1..30}; do
    #     if stale=$(aws ecs describe-services --cluster QDPQ --services adpq-web | \
    #                    $JQ ".services[0].deployments | .[] | select(.taskDefinition != \"$revision\") | .taskDefinition"); then
    #         echo "Waiting for stale deployments:"
    #         echo "$stale"
    #         sleep 5
    #     else
    #         echo "Deployed!"
    #         return 0
    #     fi
    # done
    # echo "Service update took too long."
    # return 1
}

make_task_def(){
  task_template='[
    {
      "name": "adpq-web",
      "image": "%s.dkr.ecr.us-west-1.amazonaws.com/adpq:%s",
      "essential": true,
      "memory": 200,
      "cpu": 10,
      "portMappings": [
        {
          "containerPort": 4000,
          "hostPort": 80,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "MIX_ENV",
          "value": "%s"
        },
        {
          "name": "RDS_PASSWORD",
          "value": "%s"
        }
      ]
    }
  ]'
  task_def=$(printf "$task_template" $AWS_ACCOUNT_ID $CIRCLE_SHA1 $MIX_ENV $RDS_DEVELOP_PASSWORD)
}

push_ecr_image(){
  eval $(aws ecr get-login --region us-west-1)
  docker push $AWS_ACCOUNT_ID.dkr.ecr.us-west-1.amazonaws.com/adpq:$CIRCLE_SHA1
}

register_definition() {

    if revision=$(aws ecs register-task-definition --container-definitions "$task_def" --family $family | $JQ '.taskDefinition.taskDefinitionArn'); then
        echo "Revision: $revision"
    else
        echo "Failed to register task definition"
        return 1
    fi

}
configure_aws_cli
docker build --rm=false --build-arg MIX_ENV=develop --build-arg RDS_PASSWORD=$RDS_DEVELOP_PASSWORD -t $AWS_ACCOUNT_ID.dkr.ecr.us-west-1.amazonaws.com/adpq:$CIRCLE_SHA1 .
push_ecr_image
deploy_cluster