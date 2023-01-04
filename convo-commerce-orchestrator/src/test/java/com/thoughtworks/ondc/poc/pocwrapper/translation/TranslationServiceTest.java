package com.thoughtworks.ondc.poc.pocwrapper.translation;

import com.thoughtworks.ondc.poc.pocwrapper.cache.CacheHelper;
import com.thoughtworks.ondc.poc.pocwrapper.cache.CacheManagerConfig;
import net.sf.ehcache.Cache;
import net.sf.ehcache.Element;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
class TranslationServiceTest {
    @Mock
    TranslationWebClient translationWebClient = new TranslationWebClient();
    @Mock
    TranslationResponse translationResponse = new TranslationResponse();
    TranslationService translationService = new TranslationService(translationWebClient);

    @InjectMocks
    private static CacheHelper cacheHelper;

    @InjectMocks
    public static CacheManagerConfig cacheManagerConfig;


    @Test
    public void shouldTranslateFromIndicToEnglishWhenNotInCache() {
//        String text = "कश्मीरी सेब-प्रति किलोग्राम";
//        String source = "hi";
//        String response = "Kashmiri Apple - per Kg";
//
//        cacheManagerConfig.getCacheManager();
//        cacheHelper = new CacheHelper();
//        cacheHelper.cacheManagerConfig = cacheManagerConfig;
//        translationService.cacheHelper = cacheHelper;
//        Cache cache = cacheHelper.getAI4BharatCacheFile();
//
//
//        System.out.println(translationService + "trser");
//
////        translationResponse = translationWebClient.translate(text,source,"en");
////        System.out.println(translationResponse.getTranslatedText()+"FDVDFV");
//        doReturn(TranslationResponse(translatedText=).when(translationWebClient).translate(text, source, "en");
////        assert(translationService.translateFromIndicToEnglish(text,source)).equals(response);
//        translationService.translateFromIndicToEnglish(text, source);
//
//        Object object = cache.get(text).getObjectValue();
//        String actualResponse = (String) object;
//        assertEquals(actualResponse,response);

    }


    @Test
    public void shouldFetchFromCacheFileWhenTranslateFromIndicToEnglish() {
        String text = "कश्मीरी सेब-प्रति किलोग्राम";
        String source = "hi";
        String response = "Kashmiri Apple - per Kg";

        cacheManagerConfig.getCacheManager();
        cacheHelper = new CacheHelper();
        cacheHelper.cacheManagerConfig = cacheManagerConfig;
        translationService.cacheHelper = cacheHelper;
        Cache cache = cacheHelper.getAI4BharatCacheFile();
        cache.put(new Element(text,response));
        assert(translationService.translateFromIndicToEnglish(text,source)).equals(response);
    }

    @Test
    public void shouldFetchFromCacheFileWhenTranslateFromEnglishToIndic() {
        String response = "कश्मीरी सेब-प्रति किलोग्राम";
        String target = "hi";
        String text = "Kashmiri Apple - per Kg";

        cacheManagerConfig.getCacheManager();
        cacheHelper = new CacheHelper();
        cacheHelper.cacheManagerConfig = cacheManagerConfig;
        translationService.cacheHelper = cacheHelper;
        Cache cache = cacheHelper.getAI4BharatCacheFile();
        cache.put(new Element(text,response));
        assert(translationService.translateFromEnglishToIndic(text,target)).equals(response);
    }
}
