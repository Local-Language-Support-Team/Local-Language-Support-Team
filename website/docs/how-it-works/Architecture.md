
## How it works

Going to the basics of Product Management, let's put the customer at the center. Which in this case will be your neighborhood kirana or a commoner in your village. For this product, market fit, simplicity and minimalist design should take precedence over the fanciness of a regular consumer-facing application that has all the correct scalable building blocks. Blocks that can be taken out and individually plugged in as a stand-alone application. While our showcase deals with a voice driven application, the same construct can be directly extended to text and other facets required to support Indic languages. Let's go over them:

**Step 1 :** Speech to Text - We ride on Sunbird Vakyansh that enables us to perform a voice to text translation in about 10 different Indian Languages - we have limited ourselves to Hindi, Telugu and Malayalam - largely because the team speaks those languages and it's easier for us to judge the model's perfection - and it's definitely surprised us.
**Tech** : Wav file Input → Indic Text Output

**Step 2 :** 
 Indic text to Base language - To maintain a common language that can be used for command executions, we have selected English as our base language. Here we bring in another Indian open sourcetranslation model with AI4Bharat. These are translation models that help in both way translations - Indic to English and English to Indic.
    **Tech:** Indic text input → English Text Output

And this is a great example of how this model can be directly used for supporting a search based on Indic language text.

**Step 3 :** Business Context Wrapper - Now this is where the English translation that is received from step 2 is broken down into Context and Actions. We are using an Open Source framework called rasa to achieve this. It basically does a bunch of things,
  1. Breaks the sentence into a grammatical word cloud
  2. Derives an Intent
  3. Executes actions defined for that intent

    What it also does is provide confidence levels of other potential intents; just in case we get it wrong - we can tune the model accordingly.

    This is a multi purpose component and additional use cases like smart search can be built on top of it. This is correct, right? Basically it makes the query smarter.

** UI layer/Orchestrator -** Now this is a simple view of bringing in all the building blocks together. It orchestrates the handshake between the multiple components and provides the end user with a seamless experience of Talking to an application to get a response to their query on the UI - unaware of what all happens in the backend.

Look how simple it looks, just one button to click and what would be the probability of someone making a mistake in this user journey

## Architecture

If we look at these components individually

- The AI4 Bharat Wrapper layer that we have built - Can be used for pure Text translation to and from English

- The Context Wrapper - This could be plugged to any conversational bot and used as a Chat oriented Interaction - With whatsApp, Telegram bots…

**High Level flow**


![img alt](/img/architecture.png)

