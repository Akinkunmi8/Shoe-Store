using ShopCart.Entities;

namespace ShopCart.Context
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Angular speedster Board 2000",
                    Description ="very strong durable",
                    Price = 2000,
                    PictureUrl = "/image/products/sb-ang1.png",
                    Brand = "Angular",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Green Angular Board 3000",
                    Description = "Black-size32",
                    Price = 15000,
                    PictureUrl = "/images/products/sb-ang2.png",
                    Brand = "Angular",
                    Type = "Boards",
                    QuantityInStock=100
                },
                new Product
                {
                    Name = "Core Board Speed Rush 3",
                    Description = " Durable and flexible",
                    Price = 18000,
                    PictureUrl = "/images/products/sb-core2.png",
                    Brand = "NetCore",
                    Type = "Boards",
                    QuantityInStock =100
                },
                new Product
                {
                    Name = "Net Core Super Board",
                    Description = "Elegant and Smart",
                    Price = 30000,
                    PictureUrl = "/images/products/sb-core2.png",
                    Brand = "NetCore",
                    Type = "Boards",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Core Blue Hat",
                    Description = "Sharp and cover",
                    Price = 1000,
                    PictureUrl = "/images/products/hat-core1.png",
                    Brand = "NetCore",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Green React Woolen Hat",
                    Description = " a green woolen",
                    Price = 8000,
                    PictureUrl = "images/products/hat-react1.png",
                    Brand = "React",
                    Type = "Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Purple React Woolen",
                    Description ="Purple and elastic",
                    Price = 1500,
                    PictureUrl = "/images/products/hat-react2.png",
                    Brand = "React",
                    Type ="Hats",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Blue Code Gloves",
                    Description = "blues and long",
                    Price = 1800,
                    PictureUrl = "images/products/glove-code1.png",
                    Brand = "Vs Code",
                    Type = "Gloves",
                    QuantityInStock=100
                },
                new Product
                {
                    Name = "Green Code Gloves",
                    Description = "green and brilliant",
                    Price = 1500,
                    PictureUrl = "/images/products/glove-code2.png",
                    Brand = "Vs Code",
                    Type = "Gloves",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Purple React Gloves",
                    Description = "purple and thin",
                    Price = 1600,
                    PictureUrl = "/images/products/glove-react1.png",
                    Brand = "React",
                    Type = "Gloves",
                    QuantityInStock = 100

                },
                new Product
                {
                    Name = "Redis Red boots",
                    Description = "red quality boot",
                    Price = 25000,
                    PictureUrl = "/images/products/boot-redis1.png",
                    Brand = "Redis",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Core Red Boots",
                    Description = "Quality Boot",
                    Price = 18999,
                    PictureUrl = "images/products/boot-core2.png",
                    Brand = "Redis",
                    Type = "Booots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Core Purple Boots",
                    Description = "purple durable",
                    Price = 19999,
                    PictureUrl = "/images/products/boot-core1.png",
                    Brand = "NetCore",
                    Type = "Boots",
                    QuantityInStock=100
                },
                new Product
                {
                    Name = "Angular Purple Boots",
                    Description = "Elastic Purple",
                    Price = 15000,
                    PictureUrl = "/images/products/boot-ang2.png",
                    Brand = "Angular",
                    Type = "Boots",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Angular Blue Boots",
                    Description = "Deep blue boot",
                    Price = 18000,
                    PictureUrl = "/images/products/boot-ang1.png",
                    Brand = "Angular",
                    Type = "Boots",
                    QuantityInStock = 100
                }

            };
            foreach (var product in products)
            {
                context.Products.Add(product);
            }
            context.SaveChanges();
        }
    }
}
