using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShopCart.Dto;
using ShopCart.Entities;
using ShopCart.Services;

namespace ShopCart.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _usermanager;
        private readonly TokenServices _tokenservices;
        public AccountController(UserManager<User> userManager,TokenServices tokenServices)
        {
            _usermanager = userManager;
            _tokenservices = tokenServices;
        }

        [HttpPost("login")]

        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
            
            var user = await _usermanager.FindByEmailAsync(loginDto.Email);
            if (user == null || !await _usermanager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();
            return new UserDto{
                Email = user.Email,
                Token = await _tokenservices.GenerateToken(user)
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto){

            var user = new User{UserName = registerDto.Name, Email = registerDto.Email};
            

            var result = await _usermanager.CreateAsync(user, registerDto.Password);
            if(!result.Succeeded){
                foreach(var error in result.Errors){
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }
            await _usermanager.AddToRoleAsync(user, "Member");
            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser(){
           var user = await _usermanager.FindByNameAsync(User.Identity.Name);

            return new UserDto{
                Email = user.Email,
                Token = await _tokenservices.GenerateToken(user)
            };
        }
    }
}