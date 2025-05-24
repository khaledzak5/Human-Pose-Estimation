import tkinter as tk
from tkinter import filedialog, messagebox
import cv2
import mediapipe as mp
import numpy as np
from PIL import Image, ImageTk
import os

# Initialize Mediapipe Pose
mp_pose = mp.solutions.pose
mp_draw = mp.solutions.drawing_utils
pose = mp_pose.Pose()

def save_landmarks(landmarks, output_file):
    """Save landmarks to a text file."""
    with open(output_file, "w") as f:
        for i, landmark in enumerate(landmarks):
            f.write(f"Landmark {i}: {landmark}\n")

def extract_landmarks(result, image_shape):
    """Extract pose landmarks in pixel coordinates."""
    landmarks = []
    if result.pose_landmarks:
        h, w, _ = image_shape
        for landmark in result.pose_landmarks.landmark:
            x, y, z = int(landmark.x * w), int(landmark.y * h), landmark.z
            landmarks.append((x, y, z))
    return landmarks

def process_image(image_path):
    """Process a single image for pose estimation and landmark extraction."""
    image = cv2.imread(image_path)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    result = pose.process(image_rgb)

    landmarks = []
    if result.pose_landmarks:
        landmarks = extract_landmarks(result, image.shape)

        # Draw landmarks on the original image
        mp_draw.draw_landmarks(
            image,
            result.pose_landmarks,
            mp_pose.POSE_CONNECTIONS,
            mp_draw.DrawingSpec(color=(255, 0, 0), thickness=2, circle_radius=2),
            mp_draw.DrawingSpec(color=(255, 0, 255), thickness=2, circle_radius=2),
        )

    # Save landmarks to file
    output_file = os.path.splitext(image_path)[0] + "_landmarks.txt"
    save_landmarks(landmarks, output_file)
    messagebox.showinfo("Success", f"Landmarks saved to {output_file}")

    # Display the result
    cv2.imshow("Pose Estimation - Image", image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def process_video(video_path=None):
    """Process a video or webcam feed for pose estimation and landmark extraction."""
    if video_path is None:
        cap = cv2.VideoCapture(0)  # Webcam
    else:
        cap = cv2.VideoCapture(video_path)  # Video file

    output_file = "video_landmarks.txt" if video_path is None else os.path.splitext(video_path)[0] + "_landmarks.txt"
    with open(output_file, "w") as f:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            result = pose.process(frame_rgb)

            if result.pose_landmarks:
                landmarks = extract_landmarks(result, frame.shape)
                for i, landmark in enumerate(landmarks):
                    f.write(f"Frame {cap.get(cv2.CAP_PROP_POS_FRAMES)} - Landmark {i}: {landmark}\n")

                # Draw landmarks on the frame
                mp_draw.draw_landmarks(
                    frame,
                    result.pose_landmarks,
                    mp_pose.POSE_CONNECTIONS,
                    mp_draw.DrawingSpec(color=(255, 0, 0), thickness=2, circle_radius=2),
                    mp_draw.DrawingSpec(color=(255, 0, 255), thickness=2, circle_radius=2),
                )

            cv2.imshow("Pose Estimation - Video", frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):  # Press 'q' to quit
                break

    messagebox.showinfo("Success", f"Landmarks saved to {output_file}")
    cap.release()
    cv2.destroyAllWindows()

def open_image():
    """Open an image file for processing."""
    file_path = filedialog.askopenfilename(
        filetypes=[("Image Files", "*.jpg;*.jpeg;*.png;*.bmp")]
    )
    if file_path:
        process_image(file_path)

def open_video():
    """Open a video file for processing."""
    file_path = filedialog.askopenfilename(
        filetypes=[("Video Files", "*.mp4;*.avi;*.mov;*.mkv")]
    )
    if file_path:
        process_video(file_path)

def open_webcam():
    """Process live webcam feed."""
    process_video()

# Build Tkinter GUI
root = tk.Tk()
root.title("Pose Estimation with Landmark Extraction")
root.geometry("400x300")

# Add a logo or placeholder image
placeholder_image = ImageTk.PhotoImage(Image.new("RGB", (300, 150), color="gray"))
image_label = tk.Label(root, image=placeholder_image)
image_label.pack(pady=10)

# Add buttons for different actions
btn_open_image = tk.Button(root, text="Process Image", command=open_image, width=20, bg="#4CAF50", fg="white", font=("Arial", 12))
btn_open_image.pack(pady=5)

btn_open_video = tk.Button(root, text="Process Video", command=open_video, width=20, bg="#4CAF50", fg="white", font=("Arial", 12))
btn_open_video.pack(pady=5)

btn_open_webcam = tk.Button(root, text="Open Webcam", command=open_webcam, width=20, bg="#2196F3", fg="white", font=("Arial", 12))
btn_open_webcam.pack(pady=5)

btn_exit = tk.Button(root, text="Exit", command=root.quit, width=20, bg="#f44336", fg="white", font=("Arial", 12))
btn_exit.pack(pady=5)

# Run the Tkinter event loop
root.mainloop()
