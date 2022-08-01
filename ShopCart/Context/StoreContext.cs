using Microsoft.EntityFrameworkCore;
using ShopCart.Entities;

namespace ShopCart.Context
{
    public class StoreContext :DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
                
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets {get; set;}
    }
}
