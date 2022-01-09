package com.thoughtworks.ondc.poc.pocwrapper.speech;

import com.ekstep.endpoints.speech_recognition.Language;
import com.ekstep.endpoints.speech_recognition.RecognitionConfig;
import com.ekstep.endpoints.speech_recognition.SpeechRecognitionResult;
import com.google.protobuf.ByteString;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeUnit;

@Service
public class SpeechService {

    @Value("${api.speech.url}")
    private String baseUrl;

    public String getText(AudioInput input, Language.LanguageCode sourceLang) throws InterruptedException {
        String target = baseUrl;
        ManagedChannel channel = ManagedChannelBuilder.forTarget(target)
                .usePlaintext()
                .build();
        try {
            SpeechRecognitionClient client = new SpeechRecognitionClient(channel);
            ByteString audioBytes = ByteString.copyFrom(input.getAudio());
            SpeechRecognitionResult result = client.transcribeAudioBytes(audioBytes, sourceLang, RecognitionConfig.AudioFormat.wav, RecognitionConfig.TranscriptionFormatEnum.transcript);
            return new String(result.getOutput(0).getSource().getBytes(StandardCharsets.UTF_8),StandardCharsets.UTF_8);
        } finally {
            channel.shutdownNow().awaitTermination(5, TimeUnit.SECONDS);
        }
    }

    public String getText(AudioInput input) throws InterruptedException {
        return getText(input, Language.LanguageCode.hi);
    }

    public String getTextFromFile(MultipartFile multipartFile) throws InterruptedException, IOException {
        return getTextFromFile(multipartFile, Language.LanguageCode.hi);
    }

    public String getTextFromFile(MultipartFile multipartFile,Language.LanguageCode sourceLang) throws InterruptedException, IOException {
        AudioFiles audioFiles = new AudioFiles();
        File tempFile = File.createTempFile("temp","temp");
        tempFile.deleteOnExit();
        multipartFile.transferTo(tempFile);
        byte[] data2 = audioFiles.readAudioFileData(tempFile);
        String response = getText(AudioInput.builder().audio(data2).build(), sourceLang);
        tempFile.delete();
        return response;
    }
}
