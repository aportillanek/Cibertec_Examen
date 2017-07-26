using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examen.UnidadDeTrabajo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Examen.Modelos;

namespace Examen.WebApi.Controllers
{

    [Route("corporation")]
    public class CorporationController : BaseController
    {
        public CorporationController(IUnidadTrabajo unidad) : base(unidad)
        {
        }

        [HttpGet]
        [Route("list/{page}/{pageNumber}")]
        public IActionResult GetListPaged(int page, int pageNumber)
        {
            int startRow = ((page - 1) * pageNumber) + 1;
            int endRow = page * pageNumber;

            return Ok(_unidad.Corporations.BuscarPorPagina(startRow, endRow));
        }

        [HttpGet]
        [Route("count")]
        public IActionResult GetNumber()
        {


            return Ok(_unidad.Corporations.NumeroRegistros());
        }

        [HttpGet]
        [Route("")]
        public IActionResult  GetList()
        {
            return Ok(_unidad.Corporations.ListarTodo());

        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id)
        {
            if (id <= 0) return BadRequest();
            return Ok(_unidad.Corporations.TraerPorId(id));

        }
        [HttpPost]
        public IActionResult Post([FromBody]Corporation corporation)
        {
            var id = _unidad.Corporations.Insertar(corporation);
            return Ok(new
            {
                id = id
            });
        }
        [HttpPut]
        public IActionResult Put([FromBody]Corporation corporation)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!_unidad.Corporations.Actualizar(corporation)) return BadRequest("Incorrect id");
            return Ok(new { status = true });
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0) return BadRequest();
            var result = _unidad.Corporations.Eliminar(new Corporation { Corp_No = id });
            return Ok(new { delete = true });
        }
    }
}