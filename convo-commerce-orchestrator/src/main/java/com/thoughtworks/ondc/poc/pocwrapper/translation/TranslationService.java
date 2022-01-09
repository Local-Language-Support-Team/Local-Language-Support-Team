package com.thoughtworks.ondc.poc.pocwrapper.translation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TranslationService {
    private TranslationWebClient translationWebClient;

    @Autowired
    public TranslationService(TranslationWebClient translationWebClient) {
        this.translationWebClient = translationWebClient;
    }

    public String translateFromHindiToEnglish(String text) {
        return translateFromIndicToEnglish(text, "hi");
    }

    public String translateFromIndicToEnglish(String text, String source) {
        return translationWebClient.translate(text, source, "en").getTranslatedText();
    }

    public List<String> translateFromEnglishToIndic(List<String> text, String target) {
        return translationWebClient.translateEnglishToIndic(text, target).getTranslatedText();
    }
}
