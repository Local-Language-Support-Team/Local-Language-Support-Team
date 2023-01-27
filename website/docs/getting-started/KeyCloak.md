Keycloak is an open-source Identity and Access Management (IAM) solution aimed at modern applications and services.

We will be using spring-boot-starter-oauth2-resource-server which is a resource server library to auto configure our Spring Boot application for integration with Keycloak. Our SpringBoot application(orchestrator) will be an API Server which handles authenticated requests after other applications/UIs obtain an access token.

1. ` cd keycloak-config `
2. ` docker build . -t keycloak `
3. ` docker run -p 8082:8082 keycloak `
4. Hit this url to get the access token

    Select x-www-form-urlencoded

    - client\_id : ` local-language-support-client `

    - client\_secret : ` ********** `

    - grant\_type : client\_credentials

    [http://localhost:8082/realms/local-language-support-realm/protocol/openid-connect/token](http://localhost:8082/realms/local-language-support-realm/protocol/openid-connect/token)

To create new client id in local-language-support-realm

    1. Log into keycloak admin console in browser - (http://localhost:8082)
    2. Select local-language-support-realm
    3. Click create client and select client type as openid connect and provide client-id
    4. Click next, toggle the client authentication and check the service accounts roles
    5. Click save
    6. Next click on the client-id -\> credentials to see the client-secret

