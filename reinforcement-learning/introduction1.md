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

### 强化学习(Reinforcement Learning)的历史

其发展有两条主线：

- 起源于动物学习心理学的试错法(trial-and-error)
- 优化控制(optimal control) - 评估方法(value function)，动态编程(dynamic programming)，差分计算(temporal difference)

## 术语和数学符号

### 基本概念

- $s$：一个表示环境状态(state)的数据。
- $S$：环境中所有可能状态(state)的集合。
- $a$：一个智能体可以做的动作(action)。
- $A$：智能体可以做的所有动作的集合。
- $A(s)$：智能体在状态s下，可以做的所有动作的集合。
- $r$：智能体在一次行动后，获得的奖赏(reward)。
- $R$：本体可以获得的所有奖赏集合。
- $S_t$：第t步的状态(state)，t从0开始。
- $A_t$ - 第t步的行动(action)，t从0开始。
- $R_t$ - 第t步的奖赏(reward)，t从1开始。
- $G_t$ - 第t步的长期回报，t从0开始。

可以计算$G_t$等于：$G_t=R_t+\gamma R_{t+1}+\gamma^2R_{t+2}+..., \ 0 \le \gamma \le 1$，可以看出，当$\gamma=0$时，只考虑当前的奖赏。当$\gamma=1$时，未来的奖赏没有损失。**强化学习的目标1：追求最大回报**。

### 策略（Policy）

- $\pi$：策略(policy)，策略规定了状态$s$时，应该选择的行动$a$，$\pi=[\pi(s_1),...,\pi(s_n)]$，**强化学习的目标2：找到最优策略**。
- $\pi(s)$ ： 策略$\pi$决定在状态$s$下，应该选择的行动。
- $\pi_*$：最优策略(optimal policy)。
- $\pi(a|s)$： **随机策略**$\pi$在状态$s$下，选择的行动$a$的概率。
- $r(s,a)$：在状态$s$下，选择行动$a$的奖赏。
- $p(s′|s,a)$：状态$s$、行动$a$的前提下，变成状态$s’$的概率。
- $v_{\pi}(s)$：状态价值。使用策略$\pi$，状态$s$的长期奖赏$G_t$。
- $q_{\pi}(s,a)$ ：行动价值。使用策略$\pi$，状态$s$下选择行动$a$的长期奖赏$G_t$。
- $v_∗(s)$ ： 最佳状态价值。
- $q_∗(s,a)$： 最佳行动价值。
- $V(s)$： $v_{\pi}(s)$的集合。
- $Q(s,a)$ ： $q_{\pi}(s,a)$的集合。

我们可以按照下式计算状态价值$v_{\pi}(s)$与行动价值$q_{\pi}(s,a)$：

> $v_{\pi}(s)=\sum_a \pi(a|s)(R_s^a+\gamma\sum_{s'}p(s'|s,a)v_{\pi}(s'))$
>
> $q_{\pi}(s, a)=R_s^a+\gamma\sum_{s'}p(s'|s,a)\sum_{a'}\pi(a'|s')q_{\pi}(s', a')$
>
> $q_{\pi}(s, a)=R_s^a+\gamma\sum_{s'}p(s'|s,a)v(s')$

根据状态价值$v_{\pi}(s)$与行动价值$q_{\pi}(s,a)$，我们可以计算最优$\pi(s)$：

> $\pi(s)=argmax_a v_{\pi}(s'|s, a)$，其选择的动作可以让下一个状态拥有最大价值的动作
>
> $\pi(s)=argmax_a q_{\pi}(s, a)$，其选择的动作是当前状态可以获得最大奖励的动作

**强化学习的目标3：找到最优价值函数$v_∗(s)$或者$q_∗(s,a)$**。

## 参考文献

- [强化学习的问题](https://www.cnblogs.com/steven-yang/p/6440755.html)
- [强化学习读书笔记 - 00 - 术语和数学符号](http://www.cnblogs.com/steven-yang/p/6481772.html)



