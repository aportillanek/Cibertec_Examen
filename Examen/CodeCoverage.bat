@echo off
SET testPath=C:\CibertecWebAdvanced-patron_repositorio\Cibertec.Web.Tests
SET targetargs="test -f netcoreapp1.1 -c Release %testPath%\Cibertec.Web.Tests.csproj"

opencover.console.exe -target:"dotnet.exe" -targetargs:%targetargs% -mergeoutput -hideskipped:File -output:coverage.xml -oldStyle -filter:"+[Cibertec.*]* -[Cibertec.Repositories.Tests*]* -[Cibertec.Web.Tests*]*" -searchdirs:"%testPath%\bin\Release\netcoreapp1.1" -register:user

reportgenerator.exe -reports:coverage.xml -targetdir:coverage -verbosity:Error