using Examen.Modelos;
using Examen.Repositorios;
using Examen.Repositorios.Credit;

namespace Examen.UnidadDeTrabajo
{
    public interface IUnidadTrabajo
    {
        ICorporationRepositorio Corporations { get; }
        IMemberRepositorio Members { get; }
    }
}
