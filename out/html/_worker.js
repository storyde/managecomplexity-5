const MODEL = "@cf/mistralai/mistral-small-3.1-24b-instruct";

function json(data, init) {
  return Response.json(data, init);
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
        if (!env.AI) {
          return Response.json(
            { error: "Missing AI binding." },
            { status: 500 }
          );
        }

        const requestBody = await request.json();
        const messages = Array.isArray(requestBody?.messages)
          ? requestBody.messages
          : null;

        if (!messages || messages.length === 0) {
          return json({ error: "Missing `messages` array." }, { status: 400 });
        }

        const model =
          typeof requestBody?.model === "string" && requestBody.model.trim()
            ? requestBody.model.trim()
            : MODEL;
        const temperature =
          typeof requestBody?.temperature === "number"
            ? requestBody.temperature
            : 0.2;
        const max_tokens =
          typeof requestBody?.max_tokens === "number" ? requestBody.max_tokens : 700;

        const result = await env.AI.run(model, {
          messages,
          temperature,
          max_tokens,
        });

        const responseText =
          typeof result?.response === "string" ? result.response : "";

        if (!responseText) {
          return json({ error: "The AI did not return any response." }, { status: 502 });
        }

        return json({ response: responseText });
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
