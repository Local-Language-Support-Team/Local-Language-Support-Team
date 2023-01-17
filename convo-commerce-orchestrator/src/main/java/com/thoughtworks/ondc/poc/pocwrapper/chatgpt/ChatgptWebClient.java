package com.thoughtworks.ondc.poc.pocwrapper.chatgpt;

import io.netty.resolver.DefaultAddressResolverGroup;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.util.HashMap;
import java.util.Map;

@Service
public class ChatgptWebClient implements InitializingBean {

    @Value("${api.chatgpt.url}")
    private String baseUrl;

    private WebClient webClient;

    @Autowired
    private WebClient.Builder webClientBuilder;

    public String translate(String text) {
        Map<String, String> bodyMap = new HashMap();
        bodyMap.put("message", text);
        return this.webClient.post()
                .uri("/chatgpt")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(bodyMap))
                .retrieve()
                .bodyToMono(String.class)
                .block();

    }

    @Override
    public void afterPropertiesSet() throws Exception {
        HttpClient httpClient = HttpClient.create().baseUrl(baseUrl).resolver(DefaultAddressResolverGroup.INSTANCE);
        this.webClient = webClientBuilder.clientConnector(new ReactorClientHttpConnector(httpClient)).build();
    }
}
