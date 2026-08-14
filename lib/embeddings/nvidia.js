// lib/embeddings/nvidia.js
// Plain utility for calling NVIDIA's embedding API. No MongoDB, model, or
// Next.js imports here so this module is callable from both server routes
// and standalone scripts (e.g. scripts/seed.js).

// inputType follows the NVIDIA embed API contract: "passage" when embedding
// stored content (seed time), "query" when embedding a search query.
export async function getEmbedding(text, inputType = "query") {
  const apiKey = process.env.NVIDIA_API_KEY;
  const model = process.env.NVIDIA_EMBEDDING_MODEL;
  const baseUrl = process.env.NVIDIA_EMBEDDING_URL;

  if (!apiKey || !model || !baseUrl) {
    throw new Error(
      "Missing NVIDIA embedding configuration. Set NVIDIA_API_KEY, NVIDIA_EMBEDDING_MODEL, and NVIDIA_EMBEDDING_URL environment variables."
    );
  }

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      input: [text],
      model,
      input_type: inputType,
      encoding_format: "float",
      truncate: "NONE",
    }),
  });

  if (!response.ok) {
    let detail = "";
    try {
      detail = await response.text();
    } catch {
      // ignore body read failure; status alone is still useful
    }
    throw new Error(
      `NVIDIA embedding request failed: ${response.status} ${response.statusText}${detail ? ` - ${detail}` : ""}`
    );
  }

  const data = await response.json();
  const embedding = data?.data?.[0]?.embedding;

  if (!Array.isArray(embedding)) {
    throw new Error(
      "NVIDIA embedding response did not contain an embedding array."
    );
  }

  return embedding;
}
