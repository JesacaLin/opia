const apiKey = import.meta.env.VITE_APP_API_KEY;

export function isConfigured() {
  if (!apiKey) {
    throw new Error("Missing API key");
  }
}

const analyzeImage = async (imageUrl) => {
  const response = await fetch(
    "https://eastus.api.cognitive.microsoft.com/vision/v3.0/analyze?visualFeatures=Description&details=Landmarks&language=en",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiKey,
      },
      body: JSON.stringify({ url: imageUrl }),
    }
  );

  if (!response.ok) {
    throw new Error(`Image analysis failed: ${response.statusText}`);
  }

  return await response.json();
};

export default analyzeImage;
