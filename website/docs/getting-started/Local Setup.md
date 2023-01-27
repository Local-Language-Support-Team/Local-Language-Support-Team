
There are 4 modules which are separated and each have to be run independently of the other :

- Orchestrator
- Business context
- UI
- T2T

## Prerequisites

- Python 3.8

    - check python -V or python3 -V and pip -V or pip3 -V
    - Make sure the pip must be compatible with the python 3.8, any other versions will result in installation errors

- Docker
- Node
- Npm
- Yarn

## Local Setup

## convo-commerce-ui

### Steps to run

1. ``` cd convo-commerce-ui ```
2. ``` yarn link-all ```
3. ``` yarn install ```
4. Run ``` yarn workspace client start ``` to see the react client at http://localhost:3000

## cd convo-commerce-orchestrator
1. Steps to build ``` ./gradlew clean build ```

2. Steps to run ``` ./gradlew bootRun ```

## convo-commerce-t2t

1. ``` cd convo-commerce-t2t ```
2. Create python venv and install requirements

- ` /usr/bin/python3 -m venv ~/envs/convo-comm-t2t `
- ` source ~/envs/convo-comm-t2t/bin/activate `
- ` pip install -r requirements.txt `

1. Install fairseq packages

- ` pip install fairseq `

1. Install AI4Bharat inference package

- git clone https://github.com/AI4Bharat/indicTrans.git
- ` cp -r indicTrans/inference inference/ `
- ` cp -r indicTrans/model\_configs . `
- create 2 new files in inference directory =\> setup.cfg and pyproject.toml copy paste the below code in respective files

    In setup.cfg

        [metadata]

        name = inference

        version = 0.0.1

        author = tw

        summary = Using the AI4B indicTrans/inference package

        classifiers =

        Programming Language :: Python :: 3

        Operating System :: OS Independent

        [options]

        packages = find:

        python\_requires = \>=3.7

        include\_package\_data = True

 In pyproject.toml

        [build-system]

        requires = [

        "setuptools\>=54",

        "wheel"

        ] 
        build-backend = "setuptools.build\_meta"
        

- ` pip install ./inference `

- Download AI4Bharat indic2 models and update environment variables. Download both the models from below link in the path and export it to T2T\_MODEL\_PATH from [https://github.com/AI4Bharat/indicTrans#download-indictrans-models](https://github.com/AI4Bharat/indicTrans#download-indictrans-models) and place it inside indic2models directory inside your project

 ` export T2T\_MODEL\_PATH=\<path\_to\_project\>/indic2models `

-  Run the application

 `  python api.py `

## convo-commerce-business context

- ` cd convo-commerce-businesscontext `
- Install required libraries

 ` pip3 install -r requirements.txt `

- Install rasa

 ` pip3 install rasa `

- Train the rasa agent and run the agent

 ` rasa train `

- Run the duckling docker (in a new shell)

 ` cd convo-commerce-businesscontext`
 ` docker run -p 8000:8000 rasa/duckling `

- Run the custom action server (in a new shell)

 ` cd convo-commerce-businesscontext`
 ` rasa run actions `

- Run the agent and enable api calls (in a new shell)

 ` cd convo-commerce-businesscontext `

 ` rasa run -m models --enable-api --cors "\*" `

- Run the python api agent to communicate with the orchestration layer (in a new shell)

 ` cd convo-commerce-businesscontext `

 ` python api/main.py `

## sunbird-vakyansh

- Create a \<project\_directory\>

 ` cd \<project\_directory\> `

- Inside \<project\_directory\>/container\_vol do the following

- Create deployed\_models/\<language\_name\>
- Create model\_dict.json and add language configurations. Example (for Hindi):
    ```
    {
    "hi" : {

    "path": "/deployed\_models/hindi/hindi.pt",

    "enablePunctuation" : false,

    "enableITN": false

    }

    }
    ```
- Inside \<project\_directory\>/container\_vol/ download desired language models from [https://storage.googleapis.com/asr-public-models/data-sources-deployment](https://storage.googleapis.com/asr-public-models/data-sources-deployment)

    Example(for Hindi)

    - wget https://storage.googleapis.com/asr-public-models/data-sources-deployment/hindi/dict.ltr.txt
    - wget https://storage.googleapis.com/asr-public-models/data-sources-deployment/hindi/hindi.pt
    - wget https://storage.googleapis.com/asr-public-models/data-sources-deployment/hindi/lexicon.lst
    - wget [https://storage.googleapis.com/asr-public-models/data-sources-deployment/hindi/lm.binary](https://storage.googleapis.com/asr-public-models/data-sources-deployment/hindi/lm.binary)

- Pull the docker image

    ` docker pull gcr.io/ekstepspeechrecognition/speech\_recognition\_model\_api:3.0.4 `

- Once these are setup,you can run sunbird Vakyansh using the Docker image available on gcr.io using the following command
    ```
  docker run -m 80000m -itd -p 50051:50051 --name speech\_recognition\_open\_api -v \<your-project-path\>/container\_vol:/opt/speech\_recognition\_open\_api/deployed\_models/ gcr.io/ekstepspeechrecognition/speech\_recognition\_model\_api:3.0.4 
    ```