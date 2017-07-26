using Dapper;
using Examen.Modelos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace Examen.Repositorios.Credit
{
    public class CorporationRepositorio : Repositorio<Corporation>, ICorporationRepositorio
    {
        public CorporationRepositorio(string cadenaDeConexion) : base(cadenaDeConexion)
        {
        }

        public int NumeroRegistros()
        {
            using (var conexion = new SqlConnection(_cadenaDeConexion))
            {
                return conexion.ExecuteScalar<int>("SELECT Count(corp_no) FROM dbo.corporation");

            }

        }

        public IEnumerable<Corporation> BuscarPorPagina(int startRow, int endRow)
        {
            using (var connection = new SqlConnection(_cadenaDeConexion))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@startRow", startRow);
                parameters.Add("@endRow", endRow);


                return connection.Query<Corporation>("dbo.CorporationPagedList", parameters, commandType: System.Data.CommandType.StoredProcedure);

            }
        }
    }
}
