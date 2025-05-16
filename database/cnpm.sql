-- Xóa cơ sở dữ liệu nếu đã tồn tại (sao lưu trước nếu cần)
DROP DATABASE IF EXISTS `cnpm`;

-- Tạo cơ sở dữ liệu mới
CREATE DATABASE `cnpm` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `cnpm`;

-- Tạo bảng category
CREATE TABLE `category` (
    `CategoryID` INT AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tạo bảng product
CREATE TABLE `product` (
    `productID` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `description` TEXT NULL,
    `img` TEXT NULL,
    `quantity` INT NOT NULL,
    `categoryID` INT NOT NULL,
    PRIMARY KEY (`productID`),
    FOREIGN KEY (`categoryID`) REFERENCES `category` (`CategoryID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tạo bảng option
CREATE TABLE `option` (
    `optionID` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `productID` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`optionID`),
    FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tạo bảng product_option (quan hệ Many-to-Many giữa product và option)
CREATE TABLE `product_option` (
    `productID` VARCHAR(50) NOT NULL,
    `optionID` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`productID`, `optionID`),
    FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON DELETE CASCADE,
    FOREIGN KEY (`optionID`) REFERENCES `option` (`optionID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tạo bảng cart
CREATE TABLE `cart` (
    `cartID` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`cartID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tạo bảng cart_item
CREATE TABLE `cart_item` (
    `cartItemID` INT AUTO_INCREMENT,
    `quantity` INT NOT NULL,
    `unitPrice` DECIMAL(10,2) NOT NULL,
    `cartCartID` VARCHAR(50) NOT NULL,
    `productProductID` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`cartItemID`),
    FOREIGN KEY (`cartCartID`) REFERENCES `cart` (`cartID`) ON DELETE CASCADE,
    FOREIGN KEY (`productProductID`) REFERENCES `product` (`productID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tạo bảng cart_item_option (lưu tùy chọn cho mỗi cart_item)
CREATE TABLE `cart_item_option` (
    `id` INT AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `optionID` VARCHAR(50) NOT NULL,
    `cartItemCartItemID` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`optionID`) REFERENCES `option` (`optionID`) ON DELETE CASCADE,
    FOREIGN KEY (`cartItemCartItemID`) REFERENCES `cart_item` (`cartItemID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tạo bảng order (đơn hàng)
CREATE TABLE `order` (
    `orderID` VARCHAR(50) NOT NULL,
    `cartID` VARCHAR(50) NOT NULL,
    `totalPrice` DECIMAL(10,2) NOT NULL,
    `orderDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`orderID`),
    FOREIGN KEY (`cartID`) REFERENCES `cart` (`cartID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tạo bảng invoice (hóa đơn)
CREATE TABLE `invoice` (
    `invoiceID` VARCHAR(50) NOT NULL,
    `orderID` VARCHAR(50) NOT NULL,
    `totalAmount` DECIMAL(10,2) NOT NULL,
    `issueDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`invoiceID`),
    FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tạo bảng feedback (phản hồi)
CREATE TABLE `feedback` (
    `feedbackID` INT AUTO_INCREMENT,
    `orderID` VARCHAR(50) NOT NULL,
    `comment` TEXT NOT NULL,
    `rating` INT NOT NULL CHECK (`rating` BETWEEN 1 AND 5),
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`feedbackID`),
    FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Thêm dữ liệu mẫu

-- Dữ liệu cho bảng category
INSERT INTO `category` (`name`) VALUES ('Burgers');
INSERT INTO `category` (`name`) VALUES ('Drinks');
INSERT INTO `category` (`name`) VALUES ('Desserts');

-- Dữ liệu cho bảng product
INSERT INTO `product` (`productID`, `name`, `price`, `description`, `img`, `quantity`, `categoryID`)
VALUES ('prod1', 'Beef Burger', 6.99, 'Juicy beef patty with lettuce and tomato', 'https://placehold.co/200x150?text=Burger', 50, 1);
INSERT INTO `product` (`productID`, `name`, `price`, `description`, `img`, `quantity`, `categoryID`)
VALUES ('prod2', 'Cola', 1.99, 'Refreshing cola drink', 'https://placehold.co/200x150?text=Cola', 100, 2);
INSERT INTO `product` (`productID`, `name`, `price`, `description`, `img`, `quantity`, `categoryID`)
VALUES ('prod3', 'Ice Cream', 2.49, 'Vanilla ice cream', 'https://placehold.co/200x150?text=IceCream', 30, 3);

-- Dữ liệu cho bảng option
INSERT INTO `option` (`optionID`, `name`, `price`, `productID`)
VALUES ('opt1', 'Large Size', 2.50, 'prod1');
INSERT INTO `option` (`optionID`, `name`, `price`, `productID`)
VALUES ('opt2', 'Add Cheese', 1.00, 'prod1');
INSERT INTO `option` (`optionID`, `name`, `price`, `productID`)
VALUES ('opt3', 'Extra Ice', 0.50, 'prod2');

-- Dữ liệu cho bảng product_option
INSERT INTO `product_option` (`productID`, `optionID`) VALUES ('prod1', 'opt1');
INSERT INTO `product_option` (`productID`, `optionID`) VALUES ('prod1', 'opt2');
INSERT INTO `product_option` (`productID`, `optionID`) VALUES ('prod2', 'opt3');

-- Dữ liệu cho bảng cart
INSERT INTO `cart` (`cartID`) VALUES ('1747387056559');
INSERT INTO `cart` (`cartID`) VALUES ('1747387056560');

-- Dữ liệu cho bảng cart_item
INSERT INTO `cart_item` (`quantity`, `unitPrice`, `cartCartID`, `productProductID`)
VALUES (2, 6.99, '1747387056559', 'prod1');
INSERT INTO `cart_item` (`quantity`, `unitPrice`, `cartCartID`, `productProductID`)
VALUES (1, 1.99, '1747387056559', 'prod2');

-- Dữ liệu cho bảng cart_item_option
INSERT INTO `cart_item_option` (`name`, `price`, `optionID`, `cartItemCartItemID`)
VALUES ('Large Size', 2.50, 'opt1', 1);
INSERT INTO `cart_item_option` (`name`, `price`, `optionID`, `cartItemCartItemID`)
VALUES ('Add Cheese', 1.00, 'opt2', 1);

-- Dữ liệu cho bảng order
INSERT INTO `order` (`orderID`, `cartID`, `totalPrice`, `orderDate`)
VALUES ('order1', '1747387056559', 16.48, '2025-05-16 16:25:00');

-- Dữ liệu cho bảng invoice
INSERT INTO `invoice` (`invoiceID`, `orderID`, `totalAmount`, `issueDate`)
VALUES ('inv1', 'order1', 16.48, '2025-05-16 16:25:00');

-- Dữ liệu cho bảng feedback
INSERT INTO `feedback` (`orderID`, `comment`, `rating`, `createdAt`)
VALUES ('order1', 'Great service!', 5, '2025-05-16 16:30:00');