package com.thoughtworks.ondc.poc.pocwrapper.context.mlapi;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;

@Service
public class MLContextWebClient implements InitializingBean {

    @Value("${api.context.url}")
    private String baseUrl;

    private WebClient webClient;

    @Autowired
    private WebClient.Builder builder;

    public MLContextResponse getContext(String text) {
        Map<String, String> request = new HashMap<>();
        request.put("message", text);
        request.put("sender_id", "convo-commerce-ui");

        return webClient.post()
                .uri("/next-step")
                .body(BodyInserters.fromValue(request))
                .retrieve()
                .bodyToMono(MLContextResponse.class)
                .block();
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        this.webClient = builder
                .baseUrl(baseUrl)
                .build();
    }
}
