FROM quay.io/keycloak/keycloak:20.0.1
WORKDIR /opt/keycloak

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

ARG KEYCLOAK_ADMIN=admin
ARG KEYCLOAK_ADMIN_PASSWORD=admin
ENV KC_HTTP_PORT=8082
ENV KEYCLOAK_ADMIN ${KEYCLOAK_ADMIN}
ENV KEYCLOAK_ADMIN_PASSWORD ${KEYCLOAK_ADMIN_PASSWORD}

COPY realm-import /opt/keycloak/data/import

ENTRYPOINT ["/opt/keycloak/bin/kc.sh","start-dev","--import-realm"]

