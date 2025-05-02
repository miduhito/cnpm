use cnpm;
CREATE TABLE category (
    categoryID VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
CREATE TABLE product (
    productID VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    img TEXT,
    categoryID VARCHAR(50),
    quantity INT NOT NULL,

    FOREIGN KEY (categoryID) REFERENCES category(categoryID)
);
CREATE TABLE option (
    optionID VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);
CREATE TABLE product_option (
    productID VARCHAR(50),
    optionID VARCHAR(50),

    PRIMARY KEY (productID, optionID),
    FOREIGN KEY (productID) REFERENCES product(productID),
    FOREIGN KEY (optionID) REFERENCES option(optionID)
);
CREATE TABLE receipt (
    ID VARCHAR(50) PRIMARY KEY,
    createdDate DATETIME NOT NULL,
    customerName VARCHAR(100),
    paymentMethod ENUM('CASH', 'CARD', 'MOMO', 'ZALO_PAY') NOT NULL,
    totalPrice DECIMAL(10,2) NOT NULL
);
CREATE TABLE orders (
    ID VARCHAR(50) PRIMARY KEY,
    createdDate DATETIME NOT NULL,
    customerName VARCHAR(100),
    paymentMethod ENUM('CASH', 'CARD', 'MOMO', 'ZALO_PAY') NOT NULL,
    orderStatus ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED') NOT NULL,
    totalPrice DECIMAL(10,2) NOT NULL
);
CREATE TABLE cart (
    cartID VARCHAR(50) PRIMARY KEY
);
CREATE TABLE cart_item (
    cartItemID INT AUTO_INCREMENT PRIMARY KEY,
    cartID VARCHAR(50),
    quantity INT NOT NULL,

    FOREIGN KEY (cartID) REFERENCES cart(cartID)
);
CREATE TABLE cart_item_product (
    cartItemID INT,
    productID VARCHAR(50),

    PRIMARY KEY (cartItemID, productID),
    FOREIGN KEY (cartItemID) REFERENCES cart_item(cartItemID),
    FOREIGN KEY (productID) REFERENCES product(productID)
);
CREATE TABLE cart_item_option (
    cartItemID INT,
    optionID VARCHAR(50),

    PRIMARY KEY (cartItemID, optionID),
    FOREIGN KEY (cartItemID) REFERENCES cart_item(cartItemID),
    FOREIGN KEY (optionID) REFERENCES option(optionID)
);
-- CartItem gắn với receipt
ALTER TABLE cart_item ADD COLUMN receiptID VARCHAR(50), ADD FOREIGN KEY (receiptID) REFERENCES receipt(ID);

-- CartItem gắn với order
ALTER TABLE cart_item ADD COLUMN orderID VARCHAR(50), ADD FOREIGN KEY (orderID) REFERENCES orders(ID);

-- Lưu đơn giá tại thời điểm mua
ALTER TABLE cart_item ADD COLUMN unitPrice DECIMAL(10,2);
INSERT INTO category (categoryID, name) VALUES
('cate1', 'Burger'),
('cate2', 'Drink');
INSERT INTO product (productID, name, price, description, img, categoryID, quantity) VALUES
('prod1', 'Cheese Burger', 5.99, 'Burger with melted cheese', 'cheeseburger.jpg', 'cate1', 100),
('prod2', 'Beef Burger', 6.99, 'Juicy beef patty', 'beefburger.jpg', 'cate1', 80),
('prod3', 'Coca Cola', 1.50, 'Refreshing drink', 'coke.jpg', 'cate2', 200);
INSERT INTO option (optionID, name, price) VALUES
('opt1', 'Extra Cheese', 1.00),
('opt2', 'Large Size', 2.50),
('opt3', 'No Ice', 0.00);
INSERT INTO product_option (productID, optionID) VALUES
('prod1', 'opt1'),
('prod1', 'opt2'),
('prod2', 'opt2'),
('prod3', 'opt3');
INSERT INTO orders (ID, createdDate, customerName, paymentMethod, orderStatus, totalPrice) VALUES
('order001', NOW(), 'Nguyễn Văn A', 'CASH', 'PENDING', 13.98);
INSERT INTO receipt (ID, createdDate, customerName, paymentMethod, totalPrice) VALUES
('receipt001', NOW(), 'Trần Thị B', 'CARD', 15.50);

