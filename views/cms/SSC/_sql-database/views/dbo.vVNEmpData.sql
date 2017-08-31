if exists (select * from sys.objects where object_id = object_id('[dbo].[vVNEmpData]') and type = 'V')
drop view [dbo].[vVNEmpData]
go

CREATE VIEW dbo.vVNEmpData
AS
SELECT        EmpID, EmpName, Department, WHPerWeek, Indirect, LoadDate
FROM            VNMACSRPT2.PMS.dbo.VNEmpData AS VNEmpData_1