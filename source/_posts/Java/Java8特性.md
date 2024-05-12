---
index_img: 'http://cdn.qiniu.liyansheng.top/typora/image-20230322231900301.png'
title: Java8的新特性与案例解析
author: 李延胜
tags:
  - java
categories:
  - java
abbrlink: 49921
---
### Java8的新特性

1. Lambda表达式：一种简洁、可读性高的函数式编程风格，可以更方便地编写代码。

2. Stream API：通过流式处理数据，可以更加高效地操作集合和数组。

3. 时间API：提供了新的时间和日期类，可以更加方便地处理时间和日期相关的操作。

4. 接口的默认方法和静态方法：接口中可以定义默认方法和静态方法，使得接口的使用更加方便。

5. 方法引用：可以使用已有的方法作为Lambda表达式的实现。

6. Optional类：可以更好地处理空值问题。

7. Nashorn引擎：一种基于JavaScript的引擎，可以在Java中使用JavaScript。

8. 并行流：通过并行处理流，可以更加高效地处理大量数据。

9. 新的注解：包括重复注解、类型注解等。

10. 其他改进：包括新的Base64编码和解码API、新的ConcurrentHashMap等。

### Lambda表达式

Lambda表达式是一种匿名函数，可以在Java中用来简化代码和提高可读性。以下是一些Lambda表达式的使用示例：

1. 使用Lambda表达式来实现一个简单的计算器：

```java
interface Calculator {
    int calculate(int a, int b);
}

Calculator add = (a, b) -> a + b;
Calculator subtract = (a, b) -> a - b;

int result1 = add.calculate(10, 5); // 15
int result2 = subtract.calculate(10, 5); // 5
```

2. 使用Lambda表达式来过滤集合中的元素：

```java
List<String> names = Arrays.asList("John", "Mary", "Peter", "David");

List<String> filteredNames = names.stream()
        .filter(name -> name.startsWith("J"))
        .collect(Collectors.toList());

System.out.println(filteredNames); // [John]
```

3. 使用Lambda表达式来处理异常：

```java
Runnable task = () -> {
    try {
        // 执行一些可能会抛出异常的代码
    } catch (Exception e) {
        // 处理异常
    }
};

new Thread(task).start();
```

4. 使用Lambda表达式来排序一个集合：

```java
List<Integer> numbers = Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5);

List<Integer> sortedNumbers = numbers.stream()
        .sorted((a, b) -> a.compareTo(b))
        .collect(Collectors.toList());

System.out.println(sortedNumbers); // [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
```

5. 使用Lambda表达式来创建一个线程：

```java
Runnable task = () -> {
    System.out.println("Hello, world!");
};

new Thread(task).start();
```

### Stream API

Stream API 是 Java 8 中引入的一种新的编程方式，它提供了一种简单、高效、灵活的处理集合数据的方式。下面是一些 Stream API 的使用示例：

1. 过滤

```java
List<String> names = Arrays.asList("Tom", "Jerry", "Alice", "Bob", "Jack");
List<String> result = names.stream().filter(name -> name.startsWith("J")).collect(Collectors.toList());
System.out.println(result); // 输出 [Jerry, Jack]
```

2. 映射

```java
List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> squares = nums.stream().map(num -> num * num).collect(Collectors.toList());
System.out.println(squares); // 输出 [1, 4, 9, 16, 25]
```

3. 排序

```java
List<String> names = Arrays.asList("Tom", "Jerry", "Alice", "Bob", "Jack");
List<String> result = names.stream().sorted().collect(Collectors.toList());
System.out.println(result); // 输出 [Alice, Bob, Jack, Jerry, Tom]
```

4. 统计

```java
List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
long count = nums.stream().count();
int sum = nums.stream().mapToInt(Integer::intValue).sum();
OptionalInt max = nums.stream().mapToInt(Integer::intValue).max();
System.out.println("count: " + count + ", sum: " + sum + ", max: " + max.getAsInt());
// 输出 count: 5, sum: 15, max: 5
```

5. 匹配

```java
List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
boolean allMatch = nums.stream().allMatch(num -> num > 0);
boolean anyMatch = nums.stream().anyMatch(num -> num > 3);
boolean noneMatch = nums.stream().noneMatch(num -> num > 5);
System.out.println("allMatch: " + allMatch + ", anyMatch: " + anyMatch + ", noneMatch: " + noneMatch);
// 输出 allMatch: true, anyMatch: true, noneMatch: true
```

6. 归约

```java
List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
int sum = nums.stream().reduce(0, (acc, num) -> acc + num);
Optional<Integer> product = nums.stream().reduce((acc, num) -> acc * num);
System.out.println("sum: " + sum + ", product: " + product.orElse(0));
// 输出 sum: 15, product: 120
```

以上代码展示了 Stream API 的一些常见用法，通过使用 Stream API，我们可以更加简洁、高效地处理集合数据。

### 时间API

Java 8引入了全新的时间API，提供了更加方便和易用的时间处理方式。以下是几个示例代码，展示了Java 8时间API的新改进：

1. LocalDate

LocalDate是一个表示日期的类，可以用于存储和操作年、月、日等信息。以下是一个示例代码，展示了如何使用LocalDate来获取当前日期：

```java
LocalDate today = LocalDate.now();
System.out.println("Today's date: " + today);
```

2. LocalTime

LocalTime是一个表示时间的类，可以用于存储和操作小时、分钟、秒等信息。以下是一个示例代码，展示了如何使用LocalTime来获取当前时间：

```java
LocalTime now = LocalTime.now();
System.out.println("Current time: " + now);
```

3. LocalDateTime

LocalDateTime是一个同时表示日期和时间的类，可以用于存储和操作年、月、日、小时、分钟、秒等信息。以下是一个示例代码，展示了如何使用LocalDateTime来获取当前日期和时间：

```java
LocalDateTime dateTime = LocalDateTime.now();
System.out.println("Current date and time: " + dateTime);
```

4. Instant

Instant是一个表示时间戳的类，可以用于存储和操作以1970年1月1日为起点的秒数。以下是一个示例代码，展示了如何使用Instant来获取当前时间戳：

```java
Instant timestamp = Instant.now();
System.out.println("Current timestamp: " + timestamp);
```

5. Duration

Duration是一个表示时间间隔的类，可以用于计算两个时间点之间的差值。以下是一个示例代码，展示了如何使用Duration来计算两个时间点的差值：

```java
LocalDateTime dateTime1 = LocalDateTime.of(2021, 1, 1, 0, 0, 0);
LocalDateTime dateTime2 = LocalDateTime.now();
Duration duration = Duration.between(dateTime1, dateTime2);
System.out.println("Duration between " + dateTime1 + " and " + dateTime2 + ": " + duration);
```

6. Period

Period是一个表示日期间隔的类，可以用于计算两个日期之间的差值。以下是一个示例代码，展示了如何使用Period来计算两个日期的差值：

```java
LocalDate date1 = LocalDate.of(2021, 1, 1);
LocalDate date2 = LocalDate.now();
Period period = Period.between(date1, date2);
System.out.println("Period between " + date1 + " and " + date2 + ": " + period);
```

以上是几个Java 8时间API的示例代码，展示了新的时间处理方式和更加方便的时间计算。

### 接口的默认方法和静态方法

Java 8 引入了接口的默认方法和静态方法，这是为了方便在接口中添加新的功能而不破坏现有的实现类。

默认方法：

默认方法是指在接口中定义的具有默认实现的方法。默认方法使用 default 关键字修饰，可以被实现类继承或重写，也可以通过接口名直接调用。

例如：

```java
public interface MyInterface {
    default void myMethod() {
        System.out.println("Hello, world!");
    }
}

public class MyClass implements MyInterface {
    // 可以继承默认方法
}

public class Test {
    public static void main(String[] args) {
        MyInterface myObj = new MyClass();
        myObj.myMethod(); // 输出：Hello, world!
    }
}
```

静态方法：

静态方法是指在接口中定义的使用 static 关键字修饰的方法。静态方法只能通过接口名直接调用，不能被实现类继承或重写。

例如：

```java
public interface MyInterface {
    static void myStaticMethod() {
        System.out.println("This is a static method!");
    }
}

public class Test {
    public static void main(String[] args) {
        MyInterface.myStaticMethod(); // 输出：This is a static method!
    }
}
```

### 方法引用

Java 8 引入了方法引用，它是一种更简洁的 Lambda 表达式语法，用于简化 Lambda 表达式的书写。方法引用是指在 Lambda 表达式中直接引用已有方法的方式。

方法引用使用双冒号(::)语法来引用方法，它可以引用静态方法、实例方法和构造方法。

1. 静态方法引用

静态方法引用可以直接使用类名来引用静态方法，语法格式为：类名::静态方法名。

例如，假设有一个静态方法 printMessage()，我们可以使用方法引用的方式将它传递给一个函数式接口：

```java
public class MethodReferenceExample {

    public static void printMessage() {
        System.out.println("Hello, world!");
    }

    public static void main(String[] args) {
        Runnable runnable = MethodReferenceExample::printMessage;
        Thread thread = new Thread(runnable);
        thread.start();
    }
}
```

2. 实例方法引用

实例方法引用使用对象名或类名来引用实例方法，语法格式为：对象名::实例方法名 或 类名::实例方法名。

例如，假设有一个类 Person，它有一个实例方法 getName()，我们可以使用方法引用的方式将它传递给一个函数式接口：

```java
public class MethodReferenceExample {

    public static void main(String[] args) {
        List<Person> people = Arrays.asList(new Person("Alice"), new Person("Bob"), new Person("Charlie"));

        // 使用 Lambda 表达式
        people.forEach(person -> System.out.println(person.getName()));

        // 使用方法引用
        people.forEach(Person::getName);
    }
}

class Person {
    private String name;

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
```

3. 构造方法引用

构造方法引用使用类名来引用构造方法，语法格式为：类名::new。

例如，假设有一个类 Person，我们可以使用方法引用的方式创建它的实例：

```java
public class MethodReferenceExample {

    public static void main(String[] args) {
        // 使用 Lambda 表达式
        Supplier<Person> supplier1 = () -> new Person();

        // 使用方法引用
        Supplier<Person> supplier2 = Person::new;
    }
}

class Person {
    public Person() {
    }
}
```

### Optional类

Optional类是Java 8中引入的一个新类，用于解决空指针异常问题。它是一个容器对象，可以包含一个非空值或者为空。

以下是一个使用Optional类的简单例子：

```java
import java.util.Optional;

public class OptionalExample {

    public static void main(String[] args) {
        
        // 创建一个包含非空值的Optional对象
        Optional<String> optional1 = Optional.of("Hello World");
        
        // 创建一个为空的Optional对象
        Optional<String> optional2 = Optional.empty();
        
        // 输出Optional对象的值
        System.out.println(optional1.get()); // Hello World
        
        // 如果Optional对象为空，则抛出NoSuchElementException异常
        System.out.println(optional2.get()); // 抛出NoSuchElementException异常
        
        // 判断Optional对象是否有值
        System.out.println(optional1.isPresent()); // true
        System.out.println(optional2.isPresent()); // false
        
        // 如果Optional对象为空，则返回指定的默认值
        System.out.println(optional2.orElse("Default Value")); // Default Value
        
        // 如果Optional对象为空，则执行指定的操作
        optional2.ifPresent(value -> System.out.println("Value is present"));
    }
}
```

在上面的例子中，我们创建了两个Optional对象，一个包含非空值，一个为空。我们使用get()方法获取包含在Optional对象中的值，但是如果Optional对象为空，则会抛出NoSuchElementException异常。因此，我们可以使用isPresent()方法判断Optional对象是否为空，或者使用orElse()方法返回一个默认值。如果我们想要在Optional对象不为空的情况下执行某些操作，可以使用ifPresent()方法。

### Nashorn引擎

Nashorn是Java 8中引入的一种新的JavaScript引擎，它是基于Java虚拟机实现的，可以将JavaScript代码直接编译成Java字节码运行。下面是一个简单的Nashorn引擎示例：

```java
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class NashornExample {
    public static void main(String[] args) throws ScriptException {
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("nashorn");

        String script = "var message = 'Hello, World!';" +
                        "print(message);";

        engine.eval(script);
    }
}
```

这个示例代码中，我们使用了Java 8中提供的javax.script包，创建了一个ScriptEngineManager对象来获取Nashorn引擎实例。然后，我们将一个简单的JavaScript代码作为字符串传递给引擎的eval()方法，该方法会将JavaScript代码编译成Java字节码并执行。

在这个示例中，我们定义了一个JavaScript变量message，并将其赋值为字符串“Hello, World!”，然后通过print()函数将其输出到控制台。当我们运行这个Java程序时，它会输出以下内容：

```
Hello, World!
```

这表明Nashorn引擎成功地执行了我们的JavaScript代码。除了简单的输出语句，Nashorn还支持更复杂的JavaScript功能，例如函数定义、对象和数组操作等。

### 并行流

假设我们有一个列表，其中包含 100 个元素。我们想要对这些元素进行操作，以获得一个新的列表。在使用传统的串行流时，我们可以这样做：

```java
List<Integer> myList = new ArrayList<>();
for (int i = 0; i < 100; i++) {
    myList.add(i);
}

List<Integer> newList = myList.stream()
    .map(num -> num * 2)
    .collect(Collectors.toList());
```

这将返回一个包含 100 个元素的新列表，其中每个元素都是原始列表中对应元素的两倍。但是，如果我们想要更快地执行此操作，我们可以使用 Java 8 中的并行流。这可以通过在流上调用 `parallel()` 方法来实现：

```java
List<Integer> myList = new ArrayList<>();
for (int i = 0; i < 100; i++) {
    myList.add(i);
}

List<Integer> newList = myList.parallelStream()
    .map(num -> num * 2)
    .collect(Collectors.toList());
```

在这个例子中，我们使用了 `parallelStream()` 方法来将列表转换为一个并行流。这样，当我们调用 `map()` 方法时，每个元素都会在不同的线程上进行操作，从而加快了处理速度。最后，我们使用 `collect()` 方法将结果收集到一个新的列表中。

需要注意的是，并行流并不总是比串行流更快，因为它需要更多的系统资源来管理线程。因此，在使用并行流时，应该进行基准测试，以确保它确实能够提高程序的性能。

### 新的注解

1. @FunctionalInterface：用于标记一个接口是函数式接口，即只包含一个抽象方法的接口。

2. @Repeatable：用于标记一个注解可以重复使用，即可以在同一个元素上使用多次。

3. @SafeVarargs：用于标记一个方法使用了可变参数，并且不会对参数数组中的元素进行修改操作。

4. @SuppressWarnings：用于抑制编译器对某些代码的警告信息。

5. @Deprecated：用于标记一个方法或类已经过时，不建议使用。

6. @Override：用于标记一个方法是覆盖父类的方法。

7. @Documented：用于标记一个注解可以被包含在 JavaDoc 文档中。

8. @Retention：用于指定注解的生命周期，包括 SOURCE、CLASS 和 RUNTIME 三种生命周期。