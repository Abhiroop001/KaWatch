# KaWatch

KaWatch is a modern, real-time **Rockfall & Slope Stability Monitoring System** designed for geotechnical safety and hazard assessment. The application integrates an interactive 3D spatial terrain viewer, GIS mapping, real-time analytics, a FastAPI microservice, and a dual AI/ML inference engine utilizing a fine-tuned **DenseNet121** deep learning model alongside a classical Scikit-Learn slope risk predictor.

---

### 🛠️ Tech Stack & Technologies

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet_GIS-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python_3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)

---

## Technical Stack

| Component | Technologies Used |
| :--- | :--- |
| **Frontend UI** | React 19, Vite, Tailwind CSS, Shadcn UI / Radix UI, Lucide Icons |
| **Geospatial & 3D Engine** | Three.js (`@react-three/fiber`, `@react-three/drei`), Leaflet (`react-leaflet`) |
| **Data Analytics** | Recharts, Chart.js, Axios, React Router v7 |
| **Backend API Gateway** | Python 3.10+, FastAPI, Pydantic, Uvicorn |
| **AI / ML Microservice** | TensorFlow 2.x (DenseNet121 CNN), Joblib, Scikit-Learn, NumPy, Pandas, Pillow |

---

## Core System Features

- **3D Slope & Terrain Viewer**: Interactive 3D web rendering of mountain slopes and rockfall zones powered by Three.js and `@react-three/fiber`.
- **Geospatial GIS Mapping**: Real-time Leaflet map integration displaying hazard locations, slope coordinates, and regional risk alerts.
- **DenseNet121 Computer Vision Engine**: Automated image-based rockfall risk classification (Stable vs. Unstable) using a fine-tuned DenseNet121 convolutional neural network.
- **Classical ML Slope Predictor**: Machine learning model evaluating geotechnical metrics (slope angle, soil moisture, rock friction) to predict landslide probability.
- **Real-Time Analytics Dashboard**: Live metrics visualization using Recharts for monitoring sensor feeds, risk indices, and historical trend analysis.

---

## Architecture Diagram

```mermaid
flowchart TD
    subgraph Frontend Client
        A[React 19 + Vite Dashboard]
        B[Three.js 3D Terrain Viewer]
        C[Leaflet GIS Map Interface]
    end

    subgraph FastAPI Backend
        D[FastAPI REST API Server]
        E[Image Preprocessing & Static Files]
    end

    subgraph AI / ML Inference Engine
        F[DenseNet121 CNN Classifier]
        G[Scikit-Learn Slope Risk Model]
    end

    A -->|Hazard Image Upload & Sensor Data| D
    B -->|Render 3D Terrain| A
    C -->|GIS Spatial Data| A
    D -->|Image File Processing| E
    E -->|Inference Query| F
    D -->|Geotechnical Data| G
    F -->|Classification Output| D
    G -->|Risk Index Score| D
```

---

## 👥 Contributors & Key Contributions

### 🔹 [Anirban Sil](https://github.com/Anirban-Sil) — *Frontend & Geospatial/3D Visualization Engineer*
- Designed and engineered the React 19 + Vite frontend dashboard using Tailwind CSS and Shadcn UI components.
- Developed the 3D terrain and slope viewer using Three.js (`@react-three/fiber` and `@react-three/drei`) for interactive spatial rockfall rendering.
- Integrated Leaflet GIS mapping (`react-leaflet`) for interactive hazard location tracking and regional heatmaps.
- Built real-time analytics widgets and chart dashboards using Recharts to visualize geotechnical metrics and risk indices.

### 🔹 [Abhiroop Mukherjee](https://github.com/Abhiroop001) — *AI/ML Architect & Backend Engineer*
- Architected the high-performance FastAPI backend REST API with asynchronous endpoints and static file serving.
- Trained and integrated the fine-tuned DenseNet121 CNN model (`best_densenet121.h5`) for automated rockfall stability classification.
- Developed the classical Scikit-Learn machine learning pipeline (`slope_model.pkl`) for predicting slope failure risk based on numerical geological data.
- Built the automated image upload processing, bounding annotation, and JSON inference response pipeline.

---

## Repository Structure

```
KaWatch/
├── Frontend/           # React 19 + Vite client application
│   ├── src/            # Components, 3D Canvas, Maps, Charts
│   └── package.json
├── Backend/            # FastAPI microservice & AI/ML models
│   ├── main.py         # FastAPI application & ML endpoints
│   ├── best_densenet121.h5  # Trained DenseNet121 CNN model
│   ├── slope_model.pkl # Trained Scikit-Learn risk model
│   ├── uploads/        # Uploaded test images
│   └── outputs/        # Processed inference outputs
└── README.md
```

---

## Setup & Local Execution

### 1. Prerequisites
- **Node.js**: v18+
- **Python**: v3.10+
- **pip**: Package manager for Python

---

### 2. Frontend Setup (React + Vite)

```bash
cd Frontend
npm install
npm run dev
```
*Runs locally on `http://localhost:5173` (or default Vite port)*

---

### 3. Backend Setup (FastAPI + AI Models)

```bash
cd Backend
pip install fastapi uvicorn tensorflow joblib pandas numpy pillow pydantic
uvicorn main:app --reload --port 8000
```
*Runs locally on `http://localhost:8000`*

---

## API Summary

### FastAPI Server (`http://localhost:8000`)
- `GET /` — API health check and service status.
- `POST /predict-cnn` — Upload an image to run DenseNet121 CNN inference (returns `stable` vs `unstable` classification & confidence).
- `POST /predict-classical` — Send numerical slope parameters to evaluate geological failure probability.
- `GET /files/{filename}` — Serve uploaded source files.
- `GET /outputs/{filename}` — Serve processed output annotations.

---

## License

Distributed under the MIT License.
