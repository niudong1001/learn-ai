# Machine Learning

本目录用于存储在学习ML过程中的各种算法与代码实现。

## Overview

点击[这里](./machine_learning.ipynb)，查看机器学习的综述。

机器学习（Machine Learning）算法可分为：

- 监督算法：

  - [线性回归](./regression.ipynb)：一种使用线性假设函数来预测连续值的算法，可使用梯度下降（Gradient Descent）或正规方程（Normal Equation）来求解。
  - [逻辑回归(分类)](./classification.ipynb)：在回归的基础上套用一个非线性映射函数（如sigmoid）来实现分类效果，代价函数采用交叉熵思想，一般用梯度下降求解。
  - [SVM(分类)](./svm.ipynb)： 一种可寻找到最优决策面的分类算法，其求解可以转化为带有不等式约束的求最优解的问题。
  - [决策树(分类)](./decision_tree.ipynb) ：一种使用树结构来完成分类的算法，其关键步骤在于：属性的选择与属性的分裂。

- 无监督算法：

  - [SOM聚类](./som.ipynb)：一种自组织映射的聚类算法，其核心在于相似度比较与拓扑邻域内向目标值更新。
  - [K-Means聚类](./k_means.ipynb)：一种迭代的寻找聚类中心的算法，难点在于初始化问题与聚类数目的选择。
  - [PCA降维](./pca.ipynb)：寻找能更好表示数据集的特征，按照特征表达能力从优到劣选择合适的特征数目以实现降维，降维的目的一般为：数据压缩与数据可视化。

- [神经网络](./neural_network.ipynb)：为了应付传统机器学习处理不了的海量数据的情况，其代价函数与逻辑回归相似，并使用BP算法训练。

- [遗传算法](./ga.ipynb)：模仿生物进化的基因交叉，基因突变，适应度低的个体会逐渐淘汰，是一种求复杂问题最优解的算法，但它不保证一定能找到全局最优解。

- 集成学习算法：

  - [随机森林](./random_forest.ipynb)：通过多个决策树集成，并使用投票机制获得最好的分类结果。关键在于决策树生成过程的控制。
  - GBDT： -

## 附加内容

- [信息论](./information_theory.ipynb)：包含信息量，信息熵，相对熵，交叉熵等内容。
- [线性代数](./linear_algebra.ipynb)：包含向量叉乘点乘，矩阵运算，LP范数等内容。
- [ML辅助知识](./features_process.ipynb) ：包含特征缩放，正则化，梯度检验，方差(Variance)与偏差(Bias)等内容。
- [求带约束条件的最优解](./optimal_solution_with_constraint.ipynb)：包含拉格朗日乘子法，KKT条件，拉格朗日对偶等内容。
