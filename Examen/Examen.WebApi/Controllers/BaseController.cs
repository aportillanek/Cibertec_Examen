using Examen.UnidadDeTrabajo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Examen.WebApi.Controllers
{
    [Produces("application/json")]
   // [Authorize]
    public class BaseController : Controller
    {
        protected readonly IUnidadTrabajo _unidad;

        public BaseController(IUnidadTrabajo unidad)
        {

            _unidad = unidad;

        }
    }
}
