using Examen.Modelos;
using Examen.Repositorios;
using Examen.Repositorios.Credit;
using System;
using System.Collections.Generic;
using System.Text;

namespace Examen.UnidadDeTrabajo
{
    public class UnidadTrabajo : IUnidadTrabajo
    {

        public UnidadTrabajo(string cadenaConexion)
        {
            Corporations = new CorporationRepositorio(cadenaConexion);
            Members = new MemberRepositorio(cadenaConexion);
            Users = new UserRepositorio(cadenaConexion);
        }
                
        public ICorporationRepositorio Corporations { get; private set; }
        public IMemberRepositorio Members { get; private set; }
        public IUserRepositorio Users { get; private set; }
    }
}
