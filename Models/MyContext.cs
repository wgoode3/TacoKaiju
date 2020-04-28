using Microsoft.EntityFrameworkCore;
 
namespace TacoKaiju.Models
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions options) : base(options) { }
        
        // this is the variable we will use to connect to the MySQL table, Lizards
        public DbSet<Taco> Tacos { get; set; }
    }
}