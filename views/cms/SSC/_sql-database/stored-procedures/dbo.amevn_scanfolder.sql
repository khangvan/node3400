if exists (select * from sys.objects where object_id = object_id('[dbo].[amevn_scanfolder]') and type = 'P')
drop procedure [dbo].[amevn_scanfolder]
go

CREATE PROCEDURE [dbo].[amevn_scanfolder] 
@path nvarchar(max) = '"\\vnmsrv300\Grpfiles\Document Control\Current Method sheet"'
AS 
BEGIN
DECLARE  @PathName       VARCHAR(256) ,
         @CMD            VARCHAR(512) 
 
 set @PathName = @path

IF OBJECT_ID('tempdb..#CommandShell') IS NOT NULL
    DROP TABLE #CommandShell

CREATE TABLE #CommandShell ( Line VARCHAR(512)) 
 
   --SET @CMD = 'DIR ' + @PathName + ' /TC' --file +date
    --test
    --SET @PathName ='"F:\1. Documentation\2017 Decision ME\"'

   --SET @PathName ='"D:\3. Software"'
    SET @CMD = 'DIR ' + @PathName + ' /s'  -- tìm t?t c? các file

 
 
   PRINT @CMD -- test & debug
   -- DIR F:\data\download\microsoft /TC
 
   -- MSSQL insert exec - insert table from stored procedure execution
   INSERT INTO #CommandShell 
   EXEC MASTER..xp_cmdshell   @CMD 
   --select * from #CommandShell
   -- Delete lines not containing filename
   DELETE 
   FROM   #CommandShell 
   WHERE  Line NOT LIKE '[0-9][0-9]/[0-9][0-9]/[0-9][0-9][0-9][0-9] %' 
   OR Line LIKE '%<DIR>%'
   OR Line is null

SELECT 
  Rtrim(LTRIM(substring(Line,39,Len(Line)))) as file_Names 
  --,  Line File_details 
   ,CAST(LEFT(Line,20) as DATETIME)AS file_date
   ,Rtrim(LTRIM(substring(Line,21,18))) as file_size
     
from #CommandShell 
  ORDER BY file_date DESC

  end