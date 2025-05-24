# 🕺 Human Pose Estimation using HRNet + YOLO

## 📌 Overview

This project implements an advanced **Human Pose Estimation (HPE)** system by combining the **HRNet** model for high-resolution keypoint detection with **YOLO** for real-time human detection. It supports multiple modalities like image, video, and webcam input and is suitable for applications such as fall detection, sports analytics, and rehabilitation.

---

## 🎯 Project Aim

- Design a robust pose estimation system using deep learning.
- Detect human keypoints in real-time using YOLO + HRNet.
- Apply to real-world scenarios: fall detection, movement analysis, etc.
- Offer user-friendly interfaces for both desktop and web deployment.

---

## 🧠 Technologies Used

- **HRNet** (High-Resolution Network) for keypoint detection
- **YOLO** for fast and accurate human detection
- **OpenCV**, **NumPy**, **CustomTkinter**
- **COCO Dataset** for model training
- **TensorFlow.js**, **React** for web deployment

---

## 🏗️ System Workflow

1. **Data Preprocessing**:
   - Exclude non-human and blurry images.
   - Resize and annotate datasets to HRNet-compatible format.

2. **Human Detection + Pose Estimation**:
   - Use YOLO to detect humans.
   - Pass cropped person image to HRNet to predict keypoints.

3. **Postprocessing**:
   - Keypoint extraction, angle calculation, and visualization (skeleton, heatmaps).

4. **Fall Detection Module**:
   - Detect lying-down/fall events based on body keypoint alignment.

5. **Deployment**:
   - Desktop App: CustomTkinter-based GUI.
   - Web App: React + TensorFlow.js for browser-based pose estimation.

---

## 🧪 Features

- ✅ Single/Multi-person Pose Estimation (Image/Video/Webcam)
- ✅ Real-time fall detection
- ✅ Angle calculation for biomechanics/sports use
- ✅ 2D skeleton overlay visualization
- ✅ GUI and Web-based interaction

---

## 📈 Evaluation Metrics

- **Object Keypoint Similarity (OKS)**
- **Percentage of Correct Keypoints (PCK)**
- **Mean Squared Error (MSE)**

---

## 💡 Key Achievements

- Integrated real-time HPE with GUI/Web interfaces.
- Implemented full-body fall detection system.
- Successfully visualized pose estimation results across multiple scenarios.
- Optimized for multi-person environments using tracking (e.g., DeepSORT).

---

## 🚀 How to Run

### Desktop App
1. Clone the repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the GUI:
   ```bash
   python app.py
   ```

### Web App
1. Install Node.js and npm
2. Navigate to the frontend directory
3. Run:
   ```bash
   npm install
   npm run build
   ```

---

## 📂 Project Structure

```bash
├── models/
│   ├── hrnet_coco_w48_384x288.onnx
│   └── yolov6.onnx
├── app/
│   ├── gui/
│   └── scripts/
├── frontend/
│   ├── src/
│   └── public/
├── data/
│   └── annotated_images/
└── README.md
```

---

## 🔮 Future Enhancements

- ✅ 3D Pose Estimation with depth cameras
- ✅ Edge-device deployment (wearables, smart cameras)
- ✅ Real-time alert integration for medical emergencies
- ✅ Expandable support for sports-specific biomechanics

---

## 🤝 Acknowledgment

Thanks to the contributors and open-source developers behind HRNet, YOLO, and the COCO dataset.

> _"Estimating motion, preventing injury, and powering the future of real-time human understanding."_

