General Instruction:

1. Project base: https://www.udemy.com/build-an-app-with-aspnet-core-and-angular-from-scratch/
2. Clone or download the zip folder.
3. The downloaded folder contain node_module folder, which saves you from doing the npm installations.
4. To run, make sure you have the database by running dotnet ef migrations add "initialMysql" followed by dotnet ef database update in
   the SIMS-API directory. Change the directory to the folder location and type ng serve at SIMS-SPA directory.
   Run dotnet run at SIMS.API directory.
5. Proceed to web browser, and type in localhost:4200 and you should see the home page of SIMS. 

Before you run:

1. Software requirement: dotnet ver 2.2, Node.js (11.2.0), Visual studio code (vs code) 1.29.1 (not necesssary), 
   Angular 6/7 (npm install -g @angular/cli@7.0.6), postman (not necessary), db browser sqlite, 
2. Some of the npm installations for reference: 
   npm install font-awesome --save
   npm install -save survey-angular
   npm install -save surveyjs-widgets
   npm install -save surveyjs-editor
   npm install --save ag-grid-community ag-grid-angular
   npm install --save @angular/flex-layout @angular/cdk
   npm i ng2-file-upload --save
   npm install @angular/material --save
   npm install ngx-material-timepicker --save
   npm install ng2-dnd --save
   npm install luxon --save
   npm install html2canvas --save
   npm install @angular/animations --save
   npm install hammerjs --save

to create new project:
=> mkdir SisApp
=> cd SisApp
=> dotnet new webapi -o SisApp.API -n SisApp.API
=> ng new SisApp-SPA

3. database entity framework update:
   install sqliteodbc_w64.exe from setup folder
   dotnet ef migrations add "initialMysql"
   dotnet ef database update

4. to run dotnet api => dotnet run
    notes: need to SET ASPNETCORE_ENVIRONMENT=Production if in mysql 

5. to run angular => ng serve 

In-depth

6. steps to create new component in angular package:
   appmodule.ts => make a backup copy of import section
   add new component to route.ts
   edit mainpage to call this new component (optional)

7. steps to create new controller and data in c# api:
   Models => create new .cs file
   Data   => update DataContext.cs
   dotnet ef migrations add "create newtable tablename"
   dotnet ef database update
   Data => create new <tablename>Repository file
   Data => create new I<tablename>Repository file
   startup.cs => sevices.addscoped I<tablename>Repository (copy from other template)
   controllers => add new .cs files <tablename>Controller  (copy from other template)
   
8. dotnet add package System.Data.Odbc --version 4.5.0

9. dotnet add package Novell.Directory.Ldap.NETStandard

10. At the dotnet api folder level, install the EPPlus.Core package by issue the command
   dotnet add package EPPlus.Core
