import { useState } from "react";

export default function Prediction() {
  const [form, setForm] = useState({
    Height: "",
    Roughness: "",
    Slope_Angle: "",
    Overhang_Ratio: "",
    Block_Size: "",
    Joint_Density: "",
    PAP_mean_orientation: "",
    PAP_spread: "",
    Grasselli_mean_orientation: "",
    Grasselli_spread: "",
  });

  const [result, setResult] = useState(null);
  const [probabilities, setProbabilities] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Backend URL (CHANGE THIS IF NEEDED)
  const BACKEND_URL = "https://gerbera-backend.onrender.com/predict";

  const cluster_map = {
    0: "Stable",
    1: "Moderate",
    2: "Unstable",
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(form).map(([k, v]) => [k, parseFloat(v)])
          )
        ),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();

      setResult(data.prediction);
      setProbabilities(data.probabilities);
    } catch (err) {
      console.error("Error:", err);
      setError("Unable to connect to backend");
      setResult(null);
      setProbabilities(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-800 text-center">
        Slope Stability Prediction
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type="number"
            step="any"
            name={key}
            placeholder={key.replace(/_/g, " ")}
            value={form[key]}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400"
            required
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">
          {error}
        </div>
      )}

      {result !== null && (
        <div className="mt-6 p-6 border rounded bg-gray-50 shadow">
          <h2 className="font-semibold text-lg text-gray-800">
            Prediction Result
          </h2>

          <p className="text-blue-700 font-bold mt-3 text-xl text-center">
            {cluster_map[result] || result}
          </p>

          {probabilities && (
            <div className="mt-4">
              <h3 className="font-medium text-gray-700 mb-2">
                Class Probabilities:
              </h3>
              <ul className="space-y-2">
                {probabilities.map((p, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    {cluster_map[i]}:{" "}
                    <span className="font-semibold text-blue-600">
                      {(p * 100).toFixed(2)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
