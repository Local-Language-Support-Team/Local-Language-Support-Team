# Run with Docker

Follow the following steps to build docker images of each module.

#### convo-commerce-orchestrator

- `  cd convo-commerce-orchestrator `
- ` docker build . -t orchestrator `

#### convo-commerce-t2t

- ` cd convo-commerce-t2t `
- ` docker build . -t t2t `

{ Note: indic2models are copied into image instead of mounting as it is taking too much time }

#### convo-commerce-business context

- ` cd convo-commerce-businesscontext `
- ` docker build . -t rasa-module ` 

This docker image exposes three ports for three processes of the rasa module : 8081, 5005, 5055.

After building all docker images, In the project directory run

- ``` docker-compose up ```

##