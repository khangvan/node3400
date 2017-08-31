if exists (select * from sys.objects where object_id = object_id('[dbo].[vMEMM]') and type = 'V')
drop view [dbo].[vMEMM]
go

CREATE VIEW dbo.vMEMM
AS
SELECT        FilePath, dbo.fnGetFileName(FilePath) AS FullFile, dbo.fnGetFileNamewExt(FilePath) AS FilewExt, dbo.fnGetExtensionFile(FilePath) AS Ext, LoadDate
FROM            dbo.MEMM