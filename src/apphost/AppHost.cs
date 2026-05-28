var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres")
    .WithDataVolume()
    .WithPgAdmin(pgadmin => pgadmin.WithHostPort(5050));

var database = postgres.AddDatabase("noneed2askdb");

builder.AddProject<Projects.NoNeed2Ask_Api>("backend")
    .WithReference(database)
    .WaitFor(database);

builder.Build().Run();
