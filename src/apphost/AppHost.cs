var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres")
    .WithDataVolume()
    .WithPgAdmin();

var database = postgres.AddDatabase("noneed2askdb");

builder.AddProject<Projects.NoNeed2Ask_Api>("backend")
    .WithReference(database)
    .WaitFor(database);

builder.Build().Run();
