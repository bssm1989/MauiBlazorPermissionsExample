using Microsoft.Extensions.DependencyInjection;
using Microsoft.Maui.Controls.Hosting;
using Microsoft.Maui.Hosting;

using Microsoft.AspNetCore.Components.WebView.Maui;
using MauiBlazorPermissionsExample.Models;
using MauiBlazorPermissionsExample.Services;


using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

using MatBlazor;
using Syncfusion.Blazor;
namespace MauiBlazorPermissionsExample;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("NzM2MTAyQDMyMzAyZTMzMmUzMGdCUXoyUVlGNTd3MmZidmRTc05aSkxkTU13L0g4bWhsMElYU3JqU2hpM1E9;NzM2MTAzQDMyMzAyZTMzMmUzMEpKQzNzUy9SbW9sbTB5MTQ1VmlnTHZCVVRueGtETTNHYkNTU00vODNyazA9\n");

        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .ConfigureFonts(fonts =>
            {
                fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
            });
     
        builder.Services.AddMatBlazor();
        builder.Services.AddMauiBlazorWebView();
#if DEBUG
        builder.Services.AddBlazorWebViewDeveloperTools();
#endif
        builder.Services.AddSingleton<IStudentService, StudentService>();

        builder.Services.AddSyncfusionBlazor(options => { options.IgnoreScriptIsolation = true; });


        return builder.Build();
    }
}
