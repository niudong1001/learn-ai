# Deep-Learning

本目录用于存储在学习DL过程中的各种算法与代码实现。

## Overview

- [卷积神经网络CNN](./cnn.ipynb): 卷积神经网络(CNN), 是一种主要用于处理图像的深度神经网络. 其网络结构主要包括**卷积(Conv)操作**与**池化(Pool)操作**, 其中卷积操作可能涉及到**filter卷积核的学习**, **stride步长**与**padding填充**的选择.
- [CNN结构发展史](./cnn_history.ipynb): 介绍了CNN结构的发展历史, 介绍顺序依次是LeNet-5, AlexNet, VGG-net, GoogleNet, ResNet, DenseNet.
- [目标检测算法介绍](./object_detection.md)：介绍了常见的目标检测算法如：R-CNN，SPP Net, Fast R-CNN，Faster RCNN等。
- [循环神经网络RNN](./rnn.ipynb): RNN是一种主要用于处理**时序数据**的深度模型。文中通过命名实体识别这一任务来介绍RNN结构。
- [Autoencoder自编码器](./autoencoder.ipynb)：是一种**数据压缩**算法，输入信息通过一个Encoder结构变成一个**压缩的表征**，再通过Decoder重建输入来训练网络。主要运用在：**数据去燥**，**可视化降维**。

## 附加内容

- [DL Auxiliary](./dl_auxiliary.ipynb)：包括使用深度学习一些辅助知识，如Dropout,Spatial Softmax, Xavier权值初始化等。
- [Batchnorm](./batch_norm.ipynb)：深度网络中经常使用的一种加速神经网络训练的方法，它可以加速网络收敛的速度及稳定性。
