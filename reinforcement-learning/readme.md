# Reinforcement Learning

## Contents

- [强化学习数学符号](./notation.ipynb)：介绍强化学习中会使用的数学符号。
- [强化学习介绍](./introduction1.ipynb)：介绍强化学习的基本概念，四元素等。
- [马尔科夫决策过程MDP](./markov_decision.ipynb)：介绍马尔科夫决策过程（Markov decision process），其核心在于假设**下一个状态与奖励只由当前状态与选择的动作所决定**，这个假设就大大简化了强化学习问题，便于建模与计算。
- [动态规划](./dynamic_program.ipynb)：介绍通用策略迭代(DPI)，其是强化学习的核心思想，主要在两个循环交互的过程，**迭代策略评估**和**迭代策略优化**。
- [蒙特卡洛方法（Monte Carlo Methods）](monte_carlo.ipynb)：是一种**基于采样**来计算结果的方法，其用在强化学习中策略评估时候模拟采样用以加快训练，缺点是需要很多次迭代。
- [各种算法介绍](algorithms.ipynb)：包含各种RL算法介绍，如Q-Learning，Sarsa，Sarsa(lambda)，DQN，Policy Gradients，Actor-critic等。

## References

- [强化学习博客](https://www.cnblogs.com/steven-yang/tag/%E5%BC%BA%E5%8C%96%E5%AD%A6%E4%B9%A0/)