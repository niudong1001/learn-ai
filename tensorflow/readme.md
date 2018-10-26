# Learn-Tensorflow

存储在学习Tensoflow过程中的概念说明与例子代码。

## 内容列表

- [基本概念](./tf_basic_concept.ipynb):

  - 关于Tensorflow
  - 使用步骤:

    - 构建图
    - 执行图计算

- [函数功能说明](./tf_functions.ipynb):

  - Graph相关:
  
    - `tf.Graph.as_default()`: 将某个图设置为默认图。
    - `tf.Session()`: 运行图，用于评估图中节点的输出结果。
    - `tf.ConfigProto()`: 为`tf.Session()`添加一些设置。
    - `tf.GPUOptions()`: 设置`tf.ConfigProto()`中GPU部分。

  - Tensor变换:
  
    - `tf.concat()`: 在某个维度上连接一组`Tensor`。

## 使用例子

- [鸢尾花使用](./tf-official/eager_execution_start.ipynb)
- [莫烦教程例子](./tf-mofan/)
