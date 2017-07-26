
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Primitives;
using System.Security.Claims;

using Newtonsoft.Json;
using Examen.UnidadDeTrabajo;
using System.IdentityModel.Tokens.Jwt;

namespace Examen.WebApi.provider
{
    public class TokenProviderMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly TokenProviderOptions _options;
        private readonly IUnidadTrabajo _unidad;
        public TokenProviderMiddleware(RequestDelegate next, IOptions<TokenProviderOptions> options, IUnidadTrabajo unidad)
        {
            _next = next;
            _options = options.Value;
            _unidad = unidad;
        }
        public Task Invoke(HttpContext context)
        {


            if (!context.Request.Path.Equals(_options.Path, StringComparison.Ordinal))
            {

                return _next(context);
            }
            if (!context.Request.Method.Equals("POST") || !context.Request.HasFormContentType)
            {
                context.Response.StatusCode = 400;
                return context.Response.WriteAsync("Bad request");

            }
            return GenerateToken(context);
        }

        private async Task GenerateToken(HttpContext context)
        {
            var username = context.Request.Form["username"];
            var password = context.Request.Form["password"];
            var identity = await CheckIdentity(username, password);
            if (identity == null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Invalid username or password.");
                return;
            }
            var now = DateTime.UtcNow;
            var claims = new Claim[]
            {
                new Claim (JwtRegisteredClaimNames.Sub,username),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };

            var jwt = new JwtSecurityToken(
                   issuer: _options.Issuer,
                   audience: _options.Audience,
                   claims: claims,
                   notBefore: now,
                   expires: now.Add(_options.Expiration),
                   signingCredentials: _options.SigningCredentials);
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            var response = new
            {
                access_token = encodedJwt,
                expires_in = (int)_options.Expiration.TotalSeconds

            };
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));

        }

        private Task<ClaimsIdentity> CheckIdentity(StringValues username, StringValues password)
        {
            var user = _unidad.Users.ValidarUser(username, password);
            if (user != null)
            {
                return Task.FromResult(new ClaimsIdentity(new System.Security.Principal.GenericIdentity(username, "Token"), new Claim[] { }));
            }
            return Task.FromResult<ClaimsIdentity>(null);
        }
    }
}
