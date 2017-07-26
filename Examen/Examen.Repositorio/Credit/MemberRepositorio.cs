using Dapper;
using Examen.Modelos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace Examen.Repositorios.Credit
{
    public class MemberRepositorio : Repositorio<Member>, IMemberRepositorio
    {
        public MemberRepositorio(string cadenaDeConexion) : base(cadenaDeConexion)
        {
        }

        public int NumeroRegistros()
        {
            using (var conexion = new SqlConnection(_cadenaDeConexion))
            {
                return conexion.ExecuteScalar<int>("SELECT Count(member_no) FROM dbo.member");

            }

        }

        public IEnumerable<Corporation> BuscarPorPagina(int startRow, int endRow)
        {
            using (var connection = new SqlConnection(_cadenaDeConexion))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@startRow", startRow);
                parameters.Add("@endRow", endRow);


                return connection.Query<Corporation>("dbo.MemberPagedList", parameters, commandType: System.Data.CommandType.StoredProcedure);

            }
        }
    }
}
