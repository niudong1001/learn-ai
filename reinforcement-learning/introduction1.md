# 强化学习介绍

## 什么是强化学习(Reinforcement Learning)？

强化学习是一种通过学习可以找到与环境交互能获得最大奖励策略的算法。它不同于监督学习与无监督学习，监督学习是通过已有标签数据，来学习分类或回归的逻辑；非监督学习是通过未标签的数据，找到数据的分布规律。

### 强化学习(Reinforcement Learning)的特点

- 符合行为心理学。
- 需要寻找一种探索（exploration）与开发（exploitation）的权衡，一方面要开发已经发现的有效行动；另一方面也要探索那些没有被认可的行动，已期待找到更好的策略。
- 奖励是稀疏与延时的（要考虑一次奖励如何合理地分配给之前的每一个动作，这被称为信用分配问题（credit assignment problem））。

### 强化学习(Reinforcement Learning)的四元素

- Agent：智能体，学习者，决策者。
- Environment：环境，智能体外部的一切。
- Action：智能体可以采取的动作。
- Reward：智能体采取动作后环境的奖励反馈。

![intro1](./resources/intro1.png)

上图大脑就是智能体（Agent），地球是环境（Environment）。在每一个时刻$t$，Agent会根据观测到的环境的状态$O_t$来选择$A_t$，环境接受到这个动作后，会更新自己的状态，并反馈这个动作的价值$R_t$。

## 术语和数学符号

## 参考文献

- [强化学习的问题](https://www.cnblogs.com/steven-yang/p/6440755.html)



