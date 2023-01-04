package com.thoughtworks.ondc.poc.pocwrapper.context.mlapi;
import net.sf.ehcache.Cache;
import net.sf.ehcache.Element;
import com.thoughtworks.ondc.poc.pocwrapper.cache.CacheHelper;

import com.thoughtworks.ondc.poc.pocwrapper.context.ContextResponse;
import com.thoughtworks.ondc.poc.pocwrapper.context.ContextService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MLContextService implements ContextService {

    @Autowired
    CacheHelper cacheHelper;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    MLContextWebClient mlContextWebClient;

    @Override
    public ContextResponse getContext(String contextInput) {
        MLContextResponse response;
        Cache cache = cacheHelper.getRasaCacheFile();
        if(cache.get(contextInput)==null) {
            MLContextResponse mlContextResponse = mlContextWebClient.getContext(contextInput);
            cache.put(new Element(contextInput, mlContextResponse));
            response = mlContextResponse;
        }
        else
        {
            Object object = cache.get(contextInput).getObjectValue();
            response = (MLContextResponse)object;
        }
        return modelMapper.map(response, ContextResponse.class);
    }

}
