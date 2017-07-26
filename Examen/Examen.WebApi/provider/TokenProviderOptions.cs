
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
using Microsoft.IdentityModel.Tokens;

namespace Examen.WebApi.provider
{
    public class TokenProviderOptions
    {
        public string Path { get; set; } = "/Token";
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public TimeSpan Expiration { get; set; } = TimeSpan.FromHours(8);
        public SigningCredentials SigningCredentials { get; set; }
    }
}
