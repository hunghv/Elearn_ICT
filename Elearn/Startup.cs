﻿using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Elearn.Startup))]

namespace Elearn
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
