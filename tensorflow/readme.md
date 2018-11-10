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
    - `tf.cast()`: 转换一个Tensor的数据类型。
    - `tf.get_variable()`: 获取一个已经存在的变量或者建立一个新的变量. 这个函数可以配合variable scope进行变量重用.
    - `tf.clip_by_value()`:将tensor剪切到特定的min与max之间.
    - `tf.map_fn()`: 对`elems`在第0维度展开后组成的每一项运用`fn`函数
    - `tf.gather()`: 根据索引从参数轴上收集切片.
    - `tf.gradients()`: 计算`ys`张量列表对于`xs`张量列表的偏导数.
    - `tf.zeros_like()`: 建立跟输入张量`dtype`与`shape`一样但所有元素都是0的张量.

  - [NN神经网络相关](./tf_nn_ops.ipynb):
  
    - `tf.nn.softmax()`: 计算Tensor某一维度上的softmax激活值。
    - `tf.nn.conv2d()`: 根据4-D的input与filter计算2-D的卷积运算.
    - `tf.nn.dropout()`: 计算dropout, 输出有`keep_prob`的概率会乘以系数$\dfrac{1}{\text{keep_drop}}$, 否则输出置为0.

  - [Train相关](./tf_train_ops.ipynb):

    - `tf.train.string_input_producer`: 相较于`feed_dict`的另一种数据输入方式。输出字符串列表(如文件名称)到一个输入管道队列中。
    - `tf.train.batch`: 创建张量Batch。

  - [Distribution相关](./tf_distribution_ops.ipynb)
    - `tf.random_normal`: 返回正太分布区域的随机值.
    - `tf.truncated_normal`: 返回截断正太分布区域的随机值. 所谓截断表示**如果生成的值大于平均值周围2个标准偏差的值则丢弃重新选择**。
  
  - [contrib相关](./tf_contrib.ipynb)
    - `tf.contrib.layers.xavier_initializer()`: 返回一个初始化器, 其可以对权值实现的Xavier初始化.
    - `tf.contrib.layers.batch_norm()`: 对`conv2d`或者`fullu_connected`层进行batch归一化.

  - [tf dbg调试](./tf_dbg.py): 一种tensorflow带的调试方法.

## 使用例子

- [鸢尾花使用](./tf-official/eager_execution_start.ipynb)
- [莫烦教程例子](./tf-mofan/)

## 参考文档

- [W3CTF文档](https://www.w3cschool.cn/tensorflow_python/)
- [TF官方文档](https://www.tensorflow.org/api_docs/python/)