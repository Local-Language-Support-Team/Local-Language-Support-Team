package com.thoughtworks.ondc.poc.pocwrapper.cache;

import org.springframework.stereotype.Component;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Cache;

@Component
public class CacheHelper {
    CacheManager manager;

    private void readFileFromResources() throws IOException {
        InputStream ioStream = this.getClass()
                .getClassLoader()
                .getResourceAsStream("ehcache.xml");
        if (ioStream == null) {
            throw new IllegalArgumentException("Resource file is not found");
        }
        this.manager = CacheManager.newInstance(ioStream);
    }

    private CacheManager getCacheManagerInstance() {
        try {
            if (manager == null) {
                readFileFromResources();
                return manager;
            }
        } catch (IOException e) {
            return null;
        }
        return manager;
    }


    public Cache getAI4BharatCacheFile() {
        manager = this.getCacheManagerInstance();
        return manager.getCache("translateCacheFile");
    }

    public Cache getRasaCacheFile(){
        manager = this.getCacheManagerInstance();
        return this.manager.getCache("contextCacheFile");
    }

}