using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopCart.Dto
{
    public class RegisterDto : LoginDto
    {
        public string? Name {get; set;}
    }
}