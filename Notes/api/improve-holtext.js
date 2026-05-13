const MODEL = "@cf/mistralai/mistral-small-3.1-24b-instruct";

export async function onRequestPost({ request, env }) {
  try {
    const requestBody = await request.json();
    const sourceText = typeof requestBody?.text === "string" ? requestBody.text.trim() : "";

    if (!sourceText) {
      return Response.json(
        { error: "Please enter some text first." },
        { status: 400 }
      );
    }

    if (sourceText.length > 4000) {
      return Response.json(
        { error: "Please keep the text under 4000 characters." },
        { status: 400 }
      );
    }

    const result = await env.AI.run(MODEL, {
      messages: [
        {
          role: "system",
          content:
            "Improve the text for clarity and flow without changing its meaning or tone. Return only the improved text.",
        },
        {
          role: "user",
          content: sourceText,
        },
      ],
      temperature: 0.2,
      max_tokens: 700,
    });

    const improvedText =
      typeof result?.response === "string" ? result.response.trim() : "";

    if (!improvedText) {
      return Response.json(
        { error: "The AI did not return any improved text." },
        { status: 502 }
      );
    }

    return Response.json({ improvedText });
  } catch (error) {
    return Response.json(
      {
        error:
          error && typeof error.message === "string"
            ? error.message
            : "Unable to improve the text right now.",
      },
      { status: 500 }
    );
  }
}
