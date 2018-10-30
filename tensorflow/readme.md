# Learn-Tensorflow

介绍TF的基本概念，常用函数说明及一些TF的应用例子。

## 内容列表

- [基本概念](./tf_basic_concept.ipynb):

  - 关于Tensorflow
  - 使用步骤:

    - 构建图
    - 执行图计算
  - 交互式使用
  - 变量的创建，初始化，保存和加载

- 函数功能说明:
  
  - [Graph相关](./tf_graph_ops.ipynb):
  
    - `tf.Graph.as_default()`: 将某个图设置为默认图。
    - `tf.Session()`: 运行图，用于评估图中节点的输出结果。
    - `tf.ConfigProto()`: 为`tf.Session()`添加一些设置。
    - `tf.GPUOptions()`: 设置`tf.ConfigProto()`中GPU部分。

  - [Tensor变换](./tf_tensor_ops.ipynb):
  
    - `tf.concat()`: 在某个维度上连接一组`Tensor`。
    - `tf.transpose()`: 对张量中的维度进行调换，当张量为2维，相当于转置。
    - `tf.convert_to_tensor()`: 将一个非Tensor数据值转化为`Tensor`类型。
    - `tf.cast`: 转换一个Tensor的数据类型。

  - [NN神经网络相关](./tf_nn_ops.ipynb):
  
    - `tf.nn.softmax()`: 计算Tensor某一维度上的softmax激活值。

  - [Train相关](./tf_train_ops.ipynb):

    - `tf.train.string_input_producer`: 相较于`feed_dict`的另一种数据输入方式。输出字符串列表(如文件名称)到一个输入管道队列中。
    - `tf.train.batch`: 创建张量Batch。

## 使用例子

- [鸢尾花使用](./tf-official/eager_execution_start.ipynb)
- [莫烦教程例子](./tf-mofan/)
