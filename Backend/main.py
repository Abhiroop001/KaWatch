import os
import shutil
import numpy as np
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from PIL import Image
import tensorflow as tf
import joblib
import pandas as pd

# === Config ===
MODEL_PATH = "best_densenet121.h5"
CLASSICAL_MODEL_PATH = "my_model.pkl"
IMG_SIZE = (224, 224)
UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"
CLASS_NAMES = ['stable', 'unstable']  # Update if needed

# === Setup ===
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

app.mount("/files", StaticFiles(directory=UPLOAD_DIR), name="files")
app.mount("/outputs", StaticFiles(directory=OUTPUT_DIR), name="outputs")

# === Load Models ===
print("✅ Loading models...")
cnn_model = None
try:
    if os.path.exists(MODEL_PATH):
        cnn_model = tf.keras.models.load_model(MODEL_PATH, compile=False)
        print("✅ CNN model loaded!")
    else:
        print(f"❌ CNN model file not found at: {MODEL_PATH}")
except Exception as e:
    print("❌ Error loading CNN model:", e)

try:
    classical_model = joblib.load(CLASSICAL_MODEL_PATH)
    print("✅ Classical ML model loaded!")
except Exception as e:
    print("❌ Error loading classical model:", e)
    classical_model = None

# === CNN Helper Functions ===
def preprocess_image(img_path):
    try:
        img = Image.open(img_path).convert("RGB")
        img = img.resize(IMG_SIZE, Image.BICUBIC)
        arr = np.asarray(img).astype("float32") / 255.0
        return np.expand_dims(arr, axis=0)
    except Exception as e:
        print(f"❌ Error preprocessing image: {e}")
        return None

def predict_image(img_path):
    if cnn_model is None:
        return {"error": "CNN model not loaded"}
    
    x = preprocess_image(img_path)
    if x is None:
        return {"error": "Image preprocessing failed"}

    try:
        preds = cnn_model.predict(x)

        if preds.shape[-1] == 1:
            prob = float(preds[0][0])
            probs = [1 - prob, prob]
            pred_idx = int(prob >= 0.5)
        else:
            probs = preds[0].tolist()
            pred_idx = int(np.argmax(probs))

        predicted_label = CLASS_NAMES[pred_idx] if pred_idx < len(CLASS_NAMES) else f"class_{pred_idx}"

        print(f"\n=== CNN Prediction ===\nFile: {img_path}\nLabel: {predicted_label}\nProbabilities: {probs}\n=====================\n")

        return {
            "prediction": predicted_label,
            "prediction_index": pred_idx,
            "probabilities": probs,
        }
    except Exception as e:
        print(f"❌ Error during CNN prediction: {e}")
        return {"error": "CNN prediction failed"}

# === API Endpoints ===

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/upload_and_predict/")
async def upload_and_predict(file: UploadFile = File(...)):
    png_path = os.path.join(UPLOAD_DIR, file.filename)
    try:
        with open(png_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        result = predict_image(png_path)
        result["png_url"] = f"/files/{file.filename}"
        return JSONResponse(result)
    except Exception as e:
        return JSONResponse({"error": f"Upload failed: {str(e)}"}, status_code=500)

class Features(BaseModel):
    Height: float
    Roughness: float
    Slope_Angle: float
    Overhang_Ratio: float
    Block_Size: float
    Joint_Density: float
    PAP_mean_orientation: float
    PAP_spread: float
    Grasselli_mean_orientation: float
    Grasselli_spread: float

@app.post("/predict")
def predict(features: Features):
    if classical_model is None:
        return {"error": "Classical ML model not loaded"}

    data = pd.DataFrame([[ 
        features.Height, features.Roughness, features.Slope_Angle,
        features.Overhang_Ratio, features.Block_Size, features.Joint_Density,
        features.PAP_mean_orientation, features.PAP_spread,
        features.Grasselli_mean_orientation, features.Grasselli_spread
    ]], columns=[
        "Height","Roughness","Slope_Angle","Overhang_Ratio","Block_Size",
        "Joint_Density","PAP_mean_orientation","PAP_spread",
        "Grasselli_mean_orientation","Grasselli_spread"
    ])

    prediction = classical_model.predict(data)[0]
    try:
        probs = classical_model.predict_proba(data)[0].tolist()
    except Exception:
        probs = [1.0 if i == prediction else 0.0 for i in range(len(set(classical_model.classes_)))]

    print(f"\n=== Classical ML Prediction ===\nFeatures: {data.to_dict(orient='records')[0]}\nPrediction: {prediction}\nProbabilities: {probs}\n=====================\n")

    return {
        "prediction": str(prediction),
        "probabilities": probs
    }

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        return {"file_url": f"/files/{file.filename}"}
    except Exception as e:
        return JSONResponse({"error": f"Upload failed: {str(e)}"}, status_code=500)

@app.get("/files/{filename}")
async def get_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    return FileResponse(file_path)
