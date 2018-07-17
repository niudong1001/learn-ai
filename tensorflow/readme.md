# learnTensorflow
> 参考网址：https://morvanzhou.github.io/tutorials/machine-learning/tensorflow/

## 依赖
```
tensorflow
python 3+
```

## Tensorflow概述
### 总述
先定义结构，再放入数据运算与Training。
采用数据流图（data flow graphs）。
节点（Node）为数学操作，线（edges）表示联系的多维数据数组，即张量（tensor）。
### 张量
0维张量即常量为：`[1.]`；1维张量即向量为：`[1, 2]`；2维张量即矩阵：`[[1, 2], [3, 4]]`。
### 激励函数
如：relu, sigmoid, tanh等