package com.thoughtworks.ondc.poc.pocwrapper.context.mlapi;

import com.thoughtworks.ondc.poc.pocwrapper.context.ContextResponse;
import com.thoughtworks.ondc.poc.pocwrapper.context.ContextService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MLContextService implements ContextService {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    MLContextWebClient mlContextWebClient;

    @Override
    public ContextResponse getContext(String contextInput) {
        MLContextResponse mlContextResponse = mlContextWebClient.getContext(contextInput);
        return modelMapper.map(mlContextResponse, ContextResponse.class);
    }

}
