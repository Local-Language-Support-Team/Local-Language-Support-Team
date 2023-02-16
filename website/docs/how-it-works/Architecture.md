
# How it works

Going to the basics of Product Management, let's put the customer at the center. Which in this case will be your neighborhood kirana or a commoner in your village. For this product, market fit, simplicity and minimalist design should take precedence over the fanciness of a regular consumer-facing application that has all the correct scalable building blocks. Blocks that can be taken out and individually plugged in as a stand-alone application. While our showcase deals with a voice driven application, the same construct can be directly extended to text and other facets required to support Indic languages.

a) **Step 1** : Speech to Text - We ride on Sunbird Vakyansh that enables us to perform a voice to text translation in about 10 different Indian Languages. We have limited ourselves to Hindi, Telugu and Malayalam largely because the team speaks those languages and it's easier for us to judge the model's perfection.


   **Tech** : Wav file Input → Indic Text Output

b) **Step 2** : Indic text to Base language - To maintain a common language that can be used for command executions, we have selected English as our base language. Here we bring in another Indian open sourcetranslation model with AI4Bharat. These are translation models that help in both way translations - Indic to English and English to Indic

**Tech:** Indic text input → English Text Output

And this is a great example of how this model can be directly used for supporting a search based on Indic language text.

c) **Step 3** : Business Context Wrapper - This is where the English translation is broken down into Context and Actions. We are using an Open Source framework called Rasa to achieve this. It basically does these things:
- Breaks the sentence into a grammatical word cloud 
- Derives an intent 
- Executes actions defined for that intent

What it also does is provide confidence levels of other potential intents just in case we get it wrong. We can tune the model accordingly.

This is a multi purpose component and additional use cases like smart-search can be built on top of it.

d) UI layer/Orchestrator - This is a simple view of bringing in all the building blocks together. It orchestrates the handshake between multiple components and provides the end user with a seamless experience of talking to an application to get a response to their query on the UI unaware of what happens in the backend.

##
# Architecture

Explaining the components individually:

- The AI4 Bharat Wrapper layer can be used for pure text translation to and from English text.
- The Context Wrapper could be plugged to any conversational bot and used as a chat oriented interaction for example WhatsApp, Telegram bots Etc.

**High Level flow**


![img alt](/img/architecture.png)

![img alt](/img/deployment.jpeg)

