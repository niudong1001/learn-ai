import numpy as np
import cv2

# Capture video from file
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if ret:
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        cv2.imshow('frame', gray)
        if cv2.waitKey(30) & 0xFF == ord('q'):
            break

    else:
        break

cap.release()
cv2.destroyAllWindows()