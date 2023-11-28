const apiKey = import.meta.env.VITE_APP_API_KEY2;

export function isConfigured() {
  if (!apiKey) {
    throw new Error("Missing API key");
  }
}

//what if I allow a user to specify the style and size of the generated image?
//DALL·E-3 accepts three different image sizes: 1024px by 1024px, 1792px by 1024px, and 1024px by 1792px.

const generateImage = async (prompt) => {
  const requestBody = {
    model: "dall-e-3",
    prompt: prompt,
    quality: "hd",
    style: "natural",
    n: 1,
    size: "1024x1792",
  };

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    if (data && data.data) {
      return data.data[0]; // Return the first generated image
    } else {
      console.error("Unexpected response format");
    }
  } else {
    console.error(`Error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  return result.data[0]; // Return the first generated image
};

export default generateImage;
