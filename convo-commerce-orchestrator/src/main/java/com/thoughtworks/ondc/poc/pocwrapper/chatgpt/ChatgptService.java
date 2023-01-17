package com.thoughtworks.ondc.poc.pocwrapper.chatgpt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatgptService {

    private ChatgptWebClient chatgptWebClient;

    @Autowired
    public ChatgptService(ChatgptWebClient chatgptWebClient) {
        this.chatgptWebClient = chatgptWebClient;
    }

    public String chatResponse(String text){
        return chatgptWebClient.translate(text);
    }
}
