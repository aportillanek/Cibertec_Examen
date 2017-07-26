using Dapper;
using Dapper.Contrib.Extensions;
using Examen.Modelos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace Examen.Repositorios.Credit
{
      public class UserRepositorio :IUserRepositorio
    {
        protected readonly string _connectionString;

        public UserRepositorio(string connectionString)
        {
            SqlMapperExtensions.TableNameMapper = (type) => { return $"[{type.Name}]"; };
            _connectionString = connectionString;
        }
        public User ValidarUser(string email, string password)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@email", email);
                parameters.Add("@password", password);

                return connection.QueryFirst<User>("dbo.ValidateUser",
                    parameters,
                    commandType: System.Data.CommandType.StoredProcedure


                    );
            }
        }
    }
}
