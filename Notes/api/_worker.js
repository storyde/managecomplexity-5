const MODEL = "@cf/mistralai/mistral-small-3.1-24b-instruct";

function json(data, init) {
  return Response.json(data, init);
}

function parseAiResponse(responseText) {
  if (typeof responseText !== "string") {
    return null;
  }

  const trimmed = responseText.trim();
  if (!trimmed) {
    return null;
  }

  try {
    return JSON.parse(trimmed);
  } catch (error) {
    const jsonMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (!jsonMatch) {
      return null;
    }

    try {
      return JSON.parse(jsonMatch[1]);
    } catch (nestedError) {
      return null;
    }
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/ai/improve-text") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          headers: {
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "POST, OPTIONS",
            "access-control-allow-headers": "content-type",
          },
        });
      }

      if (request.method !== "POST") {
        return json({ error: "Method not allowed." }, { status: 405 });
      }

      try {
        const requestBody = await request.json();
        const sourceText =
          typeof requestBody?.text === "string" ? requestBody.text.trim() : "";

        if (!sourceText) {
          return json({ error: "Please enter some text first." }, { status: 400 });
        }

        if (sourceText.length > 4000) {
          return json(
            { error: "Please keep the text under 4000 characters." },
            { status: 400 }
          );
        }

        if (!env.AI) {
          return Response.json(
            { error: "Missing AI binding. Add a Workers AI binding named AI in Cloudflare Pages." },
            { status: 500 }
          );
        }

        const result = await env.AI.run(MODEL, {
          messages: [
            {
              role: "system",
              content:
                'Improve the text for clarity and flow without changing its meaning or tone. Also provide a short review of the changes. Return valid JSON only in this shape: {"improvedText":"...","review":"..."}. Keep `review` under 25 words.',
            },
            {
              role: "user",
              content: sourceText,
            },
          ],
          temperature: 0.2,
          max_tokens: 700,
        });

        const parsedResponse = parseAiResponse(result?.response);
        const improvedText =
          typeof parsedResponse?.improvedText === "string"
            ? parsedResponse.improvedText.trim()
            : "";
        const review =
          typeof parsedResponse?.review === "string"
            ? parsedResponse.review.trim()
            : "";

        if (!improvedText) {
          return json(
            { error: "The AI did not return any improved text." },
            { status: 502 }
          );
        }

        return json({ improvedText, review });
      } catch (error) {
        return json(
          {
            error:
              error && error.message
                ? error.message
                : "Unable to improve the text right now.",
          },
          { status: 500 }
        );
      }
    }

    return env.ASSETS.fetch(request);
  },
};
