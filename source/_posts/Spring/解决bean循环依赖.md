---
title: 论SpringBean循环依赖的解决
author: 李延胜
index_img: 'http://liyansheng.top/typora/image-20230321175431570.png'
tags:
  - spring
categories:
  - 后端
date: 2023-03-21 17:48:00
---
## 什么是循环依赖？

> 循环依赖是指两个或多个 bean 之间相互依赖，形成了一个闭环。这种情况下，Spring 容器无法确定先创建哪个 bean，因为每个 bean 的创建都需要依赖另一个 bean，导致无法完成依赖注入。如下：

假设有两个 bean，分别是 A 和 B，它们相互引用。

```java
public class A {
    private B b;

    public A(B b) {
        this.b = b;
    }
}

public class B {
    private A a;

    public B(A a) {
        this.a = a;
    }
}
```

在上面的代码中，A 类的构造函数需要一个 B 类型的参数，而 B 类的构造函数需要一个 A 类型的参数。这样，在 Spring 容器启动时，由于循环依赖的存在，容器无法完成依赖注入，会抛出 BeanCurrentlyInCreationException 异常。

## 解决方法

### 1.构造函数注入

可以**将其中一个类的构造函数改为使用 @Autowired 注解**：

```java
public class A {
    private B b;

    @Autowired
    public A(B b) {
        this.b = b;
    }
}

public class B {
    private A a;

    public B() {}

    @Autowired
    public void setA(A a) {
        this.a = a;
    }
}
```

在上面的代码中，A 类的构造函数依旧需要一个 B 类型的参数，但是 B 类的构造函数被去掉了，同时在 B 类的 setA 方法上使用了 @Autowired 注解，该方法将在容器创建 B 类实例后自动调用。这样就可以避免循环依赖的问题。

### 2.settter注入

Setter方法注入是一种依赖注入的方式，通过调用目标对象的setter方法，将依赖对象传递给目标对象。

举个例子，假设我们有一个ShoppingCart类，它依赖于一个DiscountStrategy接口的实现：

```java
public interface DiscountStrategy {
    public double applyDiscount(double price);
}

public class ShoppingCart {
    private DiscountStrategy discountStrategy;
    
    public void setDiscountStrategy(DiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }
    
    public double checkout(double totalPrice) {
        double discountedPrice = discountStrategy.applyDiscount(totalPrice);
        // perform checkout logic
        return discountedPrice;
    }
}
```

在上面的代码中，ShoppingCart类拥有一个名为discountStrategy的属性，它的类型是DiscountStrategy接口。这意味着ShoppingCart类需要依赖于一个实现了DiscountStrategy接口的对象才能正常工作。

通过定义setDiscountStrategy()方法，我们可以让外部对象将DiscountStrategy的实现注入到ShoppingCart对象中。例如：

```java
DiscountStrategy christmasDiscount = new ChristmasDiscount();
ShoppingCart cart = new ShoppingCart();
cart.setDiscountStrategy(christmasDiscount);

double totalPrice = 100.0;
double discountedPrice = cart.checkout(totalPrice);
System.out.println("Total price: " + totalPrice + ", discounted price: " + discountedPrice);
```

在上面的代码中，我们创建了一个ChristmasDiscount对象，并将其注入到ShoppingCart对象中。然后我们调用checkout()方法，得到应用折扣后的价格，并输出到控制台上。

### 3.使用@Lazy注解

为了解决这个问题，我们可以使用@Lazy注解将其中一个类延迟到第一次被使用时才进行实例化。如下所示：

```java
public class A {
    @Autowired
    @Lazy
    private B b;

    public A() {
    }
}

public class B {
    @Autowired
    private A a;

    public B() {
    }
}
```

在上面的代码中，我们将类A中依赖于类B的属性b使用@Lazy注解进行标注，表示将其延迟初始化。这样，在类A被实例化时，依赖于类B的属性b**并不会立即被初始化，只有在第一次访问该属性时**，才会实例化类B。

### 4.使用 `@Autowired(required=false)` 注解

可以使用 `@Autowired(required=false)` 注解解决循环依赖问题。如：

```java
// ServiceA.java
@Service
public class ServiceA {

    @Autowired(required=false)
    private ServiceB serviceB;
}

// ServiceB.java
@Service
public class ServiceB {

    @Autowired(required=false)
    private ServiceA serviceA;
}
```

在上述例子中，`ServiceA` 和 `ServiceB` 之间存在循环依赖关系，但是由于 `@Autowired(required=false)` 注解的存在，即使 `ServiceA` 在实例化过程中需要 `ServiceB` 的实例，但是它不会强制要求 `ServiceB` 已经完成实例化。这样，就避免了循环依赖的问题。

**需要注意的是**，使用 `@Autowired(required=false)` 注解可能会导致空指针异常。因此，在使用时应当仔细考虑。

综上所述，使用构造函数注入或者 setter 方法注入，或者使用@Lazy 注解是解决循环依赖问题比较常见的方式。