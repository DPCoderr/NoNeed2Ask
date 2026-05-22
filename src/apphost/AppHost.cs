var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.NoNeed2Ask_Api>("backend");

builder.Build().Run();
