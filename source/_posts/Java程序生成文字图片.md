title: Java程序生成文字图片
author: 李延胜
tags: [工具]
categories: []
index_img: ../img/StringPicture.png
description: "自动化来了，再也不用手动画了\U0001F4AA"
abbrlink: 974
date: 2024-04-23 21:24:00
---

> 文字图片还手画？接下来教你如何程序自动生成，只需传入字符串即可，效果很nice👇

## 1️⃣效果1

```java
package com.travel.util;

import javafx.application.Application;
import javafx.embed.swing.SwingFXUtils;
import javafx.scene.Group;
import javafx.scene.SnapshotParameters;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.image.WritableImage;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.stage.Stage;

import javax.imageio.ImageIO;
import java.io.File;
import java.io.IOException;

public class DirectionImage extends Application {

    private static final int WIDTH = 450;
    private static final int HEIGHT = 200;

    @Override
    public void start(Stage primaryStage) {
        // Input locations
        String location1 = "广州  ——>";
        String location2 = "上海";

        // Create a canvas
        Canvas canvas = new Canvas(WIDTH, HEIGHT);
        GraphicsContext gc = canvas.getGraphicsContext2D();

        gc.setFont(Font.font("宋体", FontWeight.BOLD, 45));

        // Draw text
        gc.setFill(Color.BLUE);
        gc.fillText(location1, 50, 100);
        gc.fillText(location2, 300, 100);

        // Save the canvas as an image
        saveAsImage(canvas);
    }

    private void saveAsImage(Canvas canvas) {
        WritableImage writableImage = new WritableImage(WIDTH, HEIGHT);
        canvas.snapshot(new SnapshotParameters(), writableImage);

        // Write the image to file
        File file = new File("output.png");
        try {
            ImageIO.write(SwingFXUtils.fromFXImage(writableImage, null), "png", file);
            System.out.println("Image saved as: " + file.getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Close the application
        System.exit(0);
    }

    public static void main(String[] args) {
        launch(args);
    }
}
```

![image-20240423211736939](http://liyansheng.top/typora/image-20240423211736939.png)

## 2️⃣效果2

添加随机背景偏淡颜色

```java
package com.travel.util;

import javafx.application.Application;
import javafx.embed.swing.SwingFXUtils;
import javafx.scene.Group;
import javafx.scene.SnapshotParameters;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.image.WritableImage;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.stage.Stage;

import javax.imageio.ImageIO;
import java.io.File;
import java.io.IOException;
import java.util.Random;

public class DirectionImage extends Application {

    private static final int WIDTH = 450;
    private static final int HEIGHT = 200;

    @Override
    public void start(Stage primaryStage) {
        // Input locations
        String location1 = "广州  ——>";
        String location2 = "上海";

        // Create a canvas
        Canvas canvas = new Canvas(WIDTH, HEIGHT);
        GraphicsContext gc = canvas.getGraphicsContext2D();

        // Fill canvas with a randomly light background color
        Random random = new Random();
        Color backgroundColor = Color.rgb(random.nextInt(150), random.nextInt(150), random.nextInt(150), 0.5);
        gc.setFill(backgroundColor);
        gc.fillRect(0, 0, WIDTH, HEIGHT);

        gc.setFont(Font.font("宋体", FontWeight.BOLD, 45));

        // Draw text
        gc.setFill(Color.BLUE);
        gc.fillText(location1, 50, 100);
        gc.fillText(location2, 300, 100);

        // Save the canvas as an image
        saveAsImage(canvas);
    }

    private void saveAsImage(Canvas canvas) {
        WritableImage writableImage = new WritableImage(WIDTH, HEIGHT);
        canvas.snapshot(new SnapshotParameters(), writableImage);

        // Write the image to file
        File file = new File("output.png");
        try {
            ImageIO.write(SwingFXUtils.fromFXImage(writableImage, null), "png", file);
            System.out.println("Image saved as: " + file.getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Close the application
        System.exit(0);
    }

    public static void main(String[] args) {
        launch(args);
    }
}
```



![image-20240423211853757](http://liyansheng.top/typora/image-20240423211853757.png)

## 🔑补充

> 字符串包含`表情包`也行的

![image-20240423212149342](http://liyansheng.top/typora/image-20240423212149342.png)