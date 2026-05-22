var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres");
var database = postgres.AddDatabase("noneed2askdb");

builder.AddProject<Projects.NoNeed2Ask_Api>("backend")
    .WithReference(database);

builder.Build().Run();
