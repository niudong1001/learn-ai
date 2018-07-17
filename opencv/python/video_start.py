# -*- coding:utf-8 -*-
import numpy as np
import cv2
from matplotlib import pyplot as plt

# can use cap.isOpened() to detect if frame is been opened
# can use cap.get(propId) get some features
# propId: https://docs.opencv.org/2.4/modules/highgui/doc/reading_and_writing_images_and_video.html#videocapture-get
# number is camera index
cap = cv2.VideoCapture("test.mp4")

# read frame
while True:
    ret, frame = cap.read()  # Capture frame-by-frame (ret:True|False)
    gray_img = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  # cvt2gray
    # display
    cv2.imshow("test", gray_img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()