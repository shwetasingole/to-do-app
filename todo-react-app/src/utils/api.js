import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const WEATHERSTACK_API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
const WEATHER_API_URL = "https://api.weatherstack.com/current";


export const getWeather = async () => {
  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        access_key: WEATHERSTACK_API_KEY,
        query: "Pune", 
      },
    });

    return response.data.current; 
  } catch (error) {
    console.error("Weather API Error:", error);
    return null;
  }
};


export const getTaskSuggestion = async (taskText, priority) => {
  try {
    let weatherData = null;


    const outdoorKeywords = [
      "outdoor","outside","out", "nature", "adventure", "park", "travel", "hiking", "running", 
      "cycling", "camping", "trekking", "backpacking", "wildlife", "kayaking", 
      "rafting", "climbing", "mountaineering", "skiing", "snowboarding", "fishing", 
      "boating", "surfing", "scuba diving", "snorkeling", "birdwatching", "road trip", 
      "off-roading", "beach", "forest", "lake", "mountain", "national park", "stargazing",
      "hospital", "clinic", "doctor visit", "shopping", "grocery", "market", "commute",
      "work", "school", "university", "concert", "festival", "sports event", "gym", 
      "restaurant", "cafe", "picnic", "zoo", "museum", "amusement park"
    ];
    
    const isOutdoor = outdoorKeywords.some((keyword) =>
      taskText.toLowerCase().includes(keyword)
    );


    if (isOutdoor) {
      weatherData = await getWeather();
    }

    const prompt = {
      task: taskText,
      priority: priority,
      category: isOutdoor ? "Outdoor Activity" : "Indoor/General Task",
      suggestionContext: isOutdoor
        ? "Since this task involves going outside, consider the weather conditions and safety precautions."
        : "This is an indoor or general task. Provide helpful insights, strategies, or efficiency tips.",
      ...(isOutdoor && weatherData
        ? {
            weather: {
              city: "Pune",
              description: weatherData.weather_descriptions?.[0] || "Unknown",
              temperature: `${weatherData.temperature}°C`,
              feelsLike: `${weatherData.feelslike}°C`,
            },
            instruction:
              "Analyze the weather and suggest whether it's a good time for this outdoor activity. Provide safety tips if necessary. make suggestion concise like 50-100 words only",
          }
        : {
            instruction: "Give useful insights on completing this task efficiently or making it more enjoyable. make suggestion concise like 50-100 words only",
          }),
    };
    


    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [{ text: JSON.stringify(prompt) }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No suggestion available.";
    return formatGeminiResponse(rawText); 
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error getting AI suggestion.";
  }
};


const formatGeminiResponse = (data) => {
  try {

    const cleanedData = data.replace(/\*\*|\*/g, '').trim();

    
    const suggestionStart = cleanedData.indexOf("Suggestion:");
    const recommendationStart = cleanedData.indexOf("Recommendation:");

    if (suggestionStart !== -1 && recommendationStart !== -1) {
      return cleanedData.substring(suggestionStart, recommendationStart).trim();
    }

    return cleanedData; 
  } catch (error) {
    console.error("Error formatting Gemini response:", error);
    return "Couldn't process AI suggestion.";
  }
};
