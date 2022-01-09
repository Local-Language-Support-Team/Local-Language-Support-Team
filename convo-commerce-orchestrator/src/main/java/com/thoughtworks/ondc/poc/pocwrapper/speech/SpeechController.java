package com.thoughtworks.ondc.poc.pocwrapper.speech;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/v1/speech")
public class SpeechController {
    private final SpeechService speechService;

    @Autowired
    public SpeechController(SpeechService speechService) {
        this.speechService = speechService;
    }

    @PostMapping("/text")
    ResponseEntity<AudioResponse> getAudioToText(@RequestBody AudioInput input) throws InterruptedException {
        String response = speechService.getText(input);
        return ResponseEntity.ok(AudioResponse.builder()
                .text(response)
                .build());
    }

    @PostMapping("/text/file")
    ResponseEntity<AudioResponse> getAudioToText(@RequestParam("file") MultipartFile file ) throws Exception {
        String response = speechService.getTextFromFile(file);
        return ResponseEntity.ok(AudioResponse.builder()
                .text(response)
                .build());
    }
}
