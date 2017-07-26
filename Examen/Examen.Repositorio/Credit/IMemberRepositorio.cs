using Examen.Modelos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Examen.Repositorios.Credit
{
     public   interface IMemberRepositorio :IRepositorio<Member>
    {
        int NumeroRegistros();
        IEnumerable<Corporation> BuscarPorPagina(int startRow, int endRow);
    }
}
