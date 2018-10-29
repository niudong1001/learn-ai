# Learn-Tensorflow

介绍TF的基本概念，常用函数说明及一些TF的应用例子。

## 内容列表

- [基本概念](./tf_basic_concept.ipynb):

  - 关于Tensorflow
  - 使用步骤:

    - 构建图
    - 执行图计算

- 函数功能说明:
  
  - [Graph相关](./tf_graph_ops.ipynb):
  
    - `tf.Graph.as_default()`: 将某个图设置为默认图。
    - `tf.Session()`: 运行图，用于评估图中节点的输出结果。
    - `tf.ConfigProto()`: 为`tf.Session()`添加一些设置。
    - `tf.GPUOptions()`: 设置`tf.ConfigProto()`中GPU部分。

  - [Tensor变换](./tf_tensor_ops.ipynb):
  
    - `tf.concat()`: 在某个维度上连接一组`Tensor`。
    - `tf.transpose()`: 对张量中的维度进行调换，当张量为2维，相当于转置。
    
  - [神经网络](./tf_nn_ops.ipynb):
  
    - `tf.nn.softmax()`: 计算Tensor某一维度上的softmax激活值。

## 使用例子

- [鸢尾花使用](./tf-official/eager_execution_start.ipynb)
- [莫烦教程例子](./tf-mofan/)
