using Examen.Modelos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Examen.Repositorios.Credit
{
      public  interface IUserRepositorio
    {
        User ValidarUser(string email, string password);
    }
}
