import numpy as np
import cv2
from matplotlib import pyplot as plt

img = cv2.imread('dog.jpg', 0)  # gray image
plt.imshow(img, cmap="gray", interpolation = 'bicubic')
# hide x and y axis
plt.xticks([])
plt.yticks([])

plt.show()
