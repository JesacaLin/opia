import React, { useEffect, useState } from "react";
import analyzeImage, {
  isConfigured as isAnalysisConfigured,
} from "./azure-image-analysis";
import generateImage, {
  isConfigured as isGenerationConfigured,
} from "./azure-image-generation";

function DisplayResults({ result, url, image }) {
  if (!result) {
    return null;
  }

  return (
    <div>
      <h2>Analysis Results</h2>
      <img
        src={image}
        alt="Analyzed"
        style={{
          maxWidth: "700px",
          borderRadius: "8px",
          padding: "4px",
        }}
      />
      <pre
        style={{
          maxWidth: "700px",
          overflowX: "auto",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          padding: "5px",
        }}
      >
        Caption: {result.description.captions[0].text}
        <br />
        Confidence: {result.description.captions[0].confidence}
        <br />
        Description: {result.description.tags.join(", ")}
        <br />
        URL: {url}
        <br />
        Format: {result.metadata.format}
        {/* {JSON.stringify(result, null, 2)} */}
      </pre>
    </div>
  );
}

function DisplayGeneratedResults({ result, generatedImage, userPrompt }) {
  if (!result) {
    return null;
  }
  console.log(`Result: ${result.revised_prompt}`);
  console.log(`generatedImage: ${generatedImage}`);
  console.log(`value: ${userPrompt}`);

  return (
    <div>
      <h2>Generated Results</h2>
      <img
        src={generatedImage}
        alt="Generated"
        style={{
          maxWidth: "700px",
          borderRadius: "8px",
          padding: "4px",
        }}
      />

      <pre
        style={{
          maxWidth: "700px",
          overflowX: "auto",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          padding: "5px",
        }}
      >
        User Prompt: {userPrompt}
        {/* Can remove this later and replace with css */}
        <br />
        Revised Prompt: {result.revised_prompt}
        <br />
        URL: {generatedImage}
        {/* {JSON.stringify(result, null, 2)} */}
      </pre>
    </div>
  );
}

function App() {
  //tracking state
  const [value, setValue] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const [lastClicked, setLastClicked] = useState(null);
  const [userPrompt, setUserPrompt] = useState("");
  //related to api calls
  const [imageAnalysis, setImageAnalysis] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [generatedResult, setGeneratedResult] = useState(null);
  const [isConfigured, setIsConfigured] = useState(true);

  const title = "Opia: The Power of AI Vision";

  useEffect(() => {
    try {
      isAnalysisConfigured();
      isGenerationConfigured();
    } catch (error) {
      console.error(error);
      setIsConfigured(false);
    }
  }, []);

  if (!isConfigured) {
    return (
      <p>
        The app is not configured properly. Please check your environment
        variables. Good Luck!
      </p>
    );
  }

  return (
    <div className="box-border p-8 space-y-5 space-x-2">
      <h1 className="font-titleFont font-bold text-2xl">{title}</h1>
      <h3 className="font-subtitleFont font-bold text-1xl">
        Analyze or Generate Images with One Click
      </h3>
      <p>Directions:</p>
      <p>
        To analyze an image: Paste the URL of an image and click 'Analyze'. Our
        AI will provide insights into what the image contains.
      </p>
      <p>
        To generate an image: Enter a detailed textural prompt and click
        'Generate'. Our AI, powered by OpenAI's All-e-3, will create a unique
        image based on your description.
      </p>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter URL or Prompt"
        style={{
          width: "500px",
          height: "30px",
          borderRadius: "8px",
          border: "1px solid #000",
          padding: "4px",
        }}
      />
      <br />
      <button
        className="font-titleFont font-bold bg-yellow-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
        onClick={() => {
          setImage(value);
          setImageUrl(value);
          setIsLoading(true);
          analyzeImage(value)
            .then((result) => {
              setImageAnalysis(result);
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              setIsLoading(false);
              setValue("");
              setLastClicked("analyze");
            });
        }}
      >
        Analyze
      </button>

      <button
        className="font-titleFont font-bold bg-yellow-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
        onClick={() => {
          setIsLoading(true);
          setUserPrompt(value);
          generateImage(value)
            .then((result) => {
              setGeneratedResult(result);
              setGeneratedImage(result.url);
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              setIsLoading(false);
              setValue("");
              setLastClicked("generate");
            });
        }}
      >
        Generate
      </button>

      {isLoading && <p>Loading your results...</p>}

      {lastClicked === "analyze" && imageAnalysis && (
        // <>
        //   {isLoading && <p>Loading...</p>}
        <DisplayResults result={imageAnalysis} image={image} url={imageUrl} />
        // </>
      )}

      {lastClicked === "generate" && (
        // <>
        //   {isLoading && <p>Loading...</p>}
        <DisplayGeneratedResults
          result={generatedResult}
          generatedImage={generatedImage}
          userPrompt={userPrompt}
        />
        // </>
      )}
    </div>
  );
}

export default App;
