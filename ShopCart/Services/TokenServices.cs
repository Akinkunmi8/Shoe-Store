using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using ShopCart.Entities;

namespace ShopCart.Services
{
    public class TokenServices
    {
        private readonly UserManager<User> _usermanager;
        private readonly IConfiguration _config;
        public TokenServices(UserManager<User> usermanager, IConfiguration config)
        {
            _usermanager = usermanager;
            _config = config;
        }
        public async Task<string> GenerateToken(User user){

            var claims = new List<Claim>{
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _usermanager.GetRolesAsync(user);
            foreach(var role in roles){
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes( "JWTSettings: TokenKey"));
            var creds = new SigningCredentials(Key, SecurityAlgorithms.HmacSha512);

            var tokenOptions = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }
    }
}