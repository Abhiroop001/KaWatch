import React, { useState } from "react";
import axios from "axios";

export default function DeployCNN() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const classLabels = ["Stable", "Unstable"];

  const handleUpload = async () => {
    if (!file) return alert("Please select a PNG file");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/upload_and_predict/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Backend response:", res.data);
      setResult(res.data);
    } catch (err) {
      console.error("Prediction failed:", err);
      alert("Prediction failed, check backend logs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 space-y-6">
      <h1 className="text-2xl font-bold text-blue-900">
        Deploy CNN Rockfall Model (PNG)
      </h1>

      <input
        type="file"
        accept="image/png"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 rounded w-72"
      />

      <button
        type="button"
        onClick={handleUpload}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Predicting..." : "Upload & Predict"}
      </button>

      {result && (
        <div className="mt-6 p-6 border rounded-lg shadow w-full max-w-xl text-center bg-white">
          <h2 className="text-lg font-semibold text-gray-800">
            Prediction Result
          </h2>

          <p
            className={`mt-2 text-xl font-bold ${
              result.prediction_index === 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {classLabels[result.prediction_index] || result.prediction}
          </p>

          {file && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded input"
                className="mx-auto rounded-lg shadow-md max-h-96"
              />
            </div>
          )}

          {result.probabilities && Array.isArray(result.probabilities) ? (
            <>
              <h3 className="mt-6 text-md font-medium text-gray-700">
                Class Probabilities
              </h3>
              <div className="mt-2 space-y-3">
                {result.probabilities.slice(0, 2).map((prob, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{classLabels[idx]}</span>
                      <span className="font-semibold">
                        {(prob * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          idx === 0 ? "bg-green-500" : "bg-red-500"
                        }`}
                        style={{ width: `${prob * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-4 text-red-500 text-sm">
              ⚠️ No probability data returned from backend.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
