import os
import requests
from flask import Flask, request
import openai

app = Flask(__name__)
# Load your API key from an environment variable or secret management service
openai.api_key = "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"

@app.route("/chatgpt", methods=['POST'])
def process_req():
    req_json = request.json
    prompt = req_json["message"]
    response = openai.Completion.create(model="text-davinci-003", prompt=prompt, temperature=0.3, max_tokens=150)
    res = response["choices"][0]["text"]
    formattedResponse=""
    for i in res:
        if(i != "\n"):
            formattedResponse += i
    print(response)
    return formattedResponse

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 4000)))