# -*- coding:utf-8 -*-
import numpy as np
import cv2
from matplotlib import pyplot as plt

# 读取图片
# params 2:
# cv2.IMREAD_COLOR(Loads a color image) -> default  -1
# cv2.IMREAD_GRAYSCALE(Loads image in grayscale mode)  0
img = cv2.imread("dog.jpg", cv2.IMREAD_COLOR)
# img = cv2.imread("dog.jpg", -1)

# print(img.shape)

# 显示图片
cv2.imshow("image", img)

# 等待key, 0代表无限等待, 64bit machine: modify to k = cv2.waitKey(0) & 0xFF
k = cv2.waitKey(0)
if k == 27:  # esc
    cv2.destroyAllWindows()
elif k == ord("s"):  # key s
    # 保存图片
    cv2.imwrite("dog_save.png", img)
    cv2.destroyAllWindows()








