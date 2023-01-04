package com.thoughtworks.ondc.poc.pocwrapper.context;

import com.ekstep.endpoints.speech_recognition.Language;
import com.thoughtworks.ondc.poc.pocwrapper.speech.SpeechService;
import com.thoughtworks.ondc.poc.pocwrapper.translation.TranslationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

import java.io.IOException;
import java.util.ArrayList;

@RestController
@RequestMapping(path = "/v1/context")
@Slf4j
public class ContextController {
    private final ContextService contextService;
    private final TranslationService translationService;
    private final SpeechService speechService;

    public ContextController(ContextService contextService, TranslationService translationService, SpeechService speechService) {
        this.contextService = contextService;
        this.translationService = translationService;
        this.speechService = speechService;
    }

    @GetMapping("/en/text")
    ResponseEntity<ContextResponse> getContext(@RequestParam(name = "input") String input) {
        ContextResponse response = contextService.getContext(input);
        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/hindi")
    ResponseEntity<ContextResponse> getContextFromAudio(@RequestParam(name = "input") String input) {
        String translatedText = translationService.translateFromHindiToEnglish(input);
        log.info("Translated text : " + translatedText);
        ContextResponse response = contextService.getContext(translatedText);
        return ResponseEntity.ok(response);
    }

    @PostMapping(path = "/hi/audio")
    ContextResponse getContextFromAudio(
            @RequestParam(name = "senderId",required = false) String senderId,
            @RequestParam(name = "file") MultipartFile file) throws IOException, InterruptedException {
        return getContextFromAudio(senderId,"hi",file);
    }

    @PostMapping(path = "/audio")
    ContextResponse getContextFromAudio(
            @RequestParam(name = "senderId",required = false) String senderId,
            @RequestParam(name = "sourceLang") String sourceLang,
            @RequestParam(name = "file") MultipartFile file) throws IOException, InterruptedException {
        log.info("Audio size is : " + file.getSize());
        String indicText = speechService.getTextFromFile(file, Language.LanguageCode.valueOf(sourceLang));
        log.info("Audio to Text : " + indicText);

        if (indicText.isEmpty()) {
            return failedContentResponse();
        }
        log.info("Translating text... ");
        String translatedText = translationService.translateFromIndicToEnglish(indicText, sourceLang);
        log.info("Translated text : " + translatedText);
        if (translatedText.isEmpty()) {
            return failedContentResponse();
        }
        log.info("Fetching context... ");
        ContextResponse response = contextService.getContext(translatedText);

        if(response.getData().get(0).get("ProdName") == null){
            return response;
        }

        log.info("Translating to indic...");
        List<Map<String, String>> data= response.getData();
        for(int index = 0 ; index < data.size() ; index++){
            Map<String, String> product = data.get(index);
            String translatedIndicText = translationService.translateFromEnglishToIndic(product.get("ProdName"),sourceLang);
            product.replace("ProdName", translatedIndicText);
        }

        log.info("Done");
        response.setData(data);
        return response;
    }

    private ContextResponse failedContentResponse() {
        return ContextResponse.builder()
                .nextStep(
                        new ContextResponse
                                .NextStep(
                                        "I didn't catch that, please try again",
                                new ArrayList<>()
                        )
                ).build();
    }
}
