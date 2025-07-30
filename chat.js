const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function(event) {
  try {
    const body = JSON.parse(event.body);
    const userMessage = body.message;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Ти помічник сайту. Відповідай українською та стисло." },
        { role: "user", content: userMessage }
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: chatCompletion.data.choices[0].message.content }),
    };
  } catch (error) {
    console.error("Помилка:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Сталася помилка при запиті до OpenAI." }),
    };
  }
};
