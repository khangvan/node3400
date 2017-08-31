if exists (select * from sys.objects where object_id = object_id('[dbo].[vMEMaster]') and type = 'V')
drop view [dbo].[vMEMaster]
go

CREATE VIEW dbo.vMEMaster
AS
SELECT        FileName AS DocumentNumber, FilePathwoRoot AS [View], UpFolder AS Family
FROM            dbo.mmdata
WHERE        (WhatType = 'file') AND (FileName LIKE '%[pP][dD][fF]')