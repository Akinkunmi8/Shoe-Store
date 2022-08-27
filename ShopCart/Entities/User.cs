using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ShopCart.Entities
{
    public class User : IdentityUser
    {
        [Remote("EmailExists", "Account", HttpMethod = "POST", ErrorMessage ="Email address already existed.")]
        public override string? Email {get; set;}
    }
}