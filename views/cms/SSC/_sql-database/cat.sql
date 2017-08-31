if not exists (select * from sys.objects where object_id = object_id('[dbo].[MasterBOX]') and type = 'U')
create table [dbo].[MasterBOX]
(
    [Description] nvarchar(255) collate SQL_Latin1_General_CP1_CI_AS null,
    [H] float null,
    [L] float null,
    [Material] nvarchar(255) collate SQL_Latin1_General_CP1_CI_AS null,
    [W] float null,
)
go

if not exists (select * from sys.objects where object_id = object_id('[dbo].[MEMM]') and type = 'U')
create table [dbo].[MEMM]
(
    [FilePath] nvarchar(max) collate SQL_Latin1_General_CP1_CI_AS null,
    [LoadDate] nvarchar(max) collate SQL_Latin1_General_CP1_CI_AS null,
)
go

if not exists (select * from sys.objects where object_id = object_id('[dbo].[mmdata]') and type = 'U')
create table [dbo].[mmdata]
(
    [Directory] nvarchar(1000) collate SQL_Latin1_General_CP1_CI_AS null,
    [fileDate] datetime null,
    [FileName] nvarchar(1000) collate SQL_Latin1_General_CP1_CI_AS null,
    [fileNames] varchar(512) collate SQL_Latin1_General_CP1_CI_AS null,
    [FilePathwoRoot] nvarchar(4000) collate SQL_Latin1_General_CP1_CI_AS null,
    [fileSizes] varchar(18) collate SQL_Latin1_General_CP1_CI_AS null,
    [FullPath] nvarchar(1000) collate SQL_Latin1_General_CP1_CI_AS null,
    [UpFolder] nvarchar(260) collate SQL_Latin1_General_CP1_CI_AS null,
    [WhatType] varchar(6) collate SQL_Latin1_General_CP1_CI_AS not null,
)
go

if not exists (select * from sys.objects where object_id = object_id('[dbo].[MMYield]') and type = 'U')
create table [dbo].[MMYield]
(
    [Fam# Grp# Descr#] nvarchar(255) collate SQL_Latin1_General_CP1_CI_AS null,
    [Mat# Price] float null,
    [Material] nvarchar(255) collate SQL_Latin1_General_CP1_CI_AS null,
    [Material description] nvarchar(255) collate SQL_Latin1_General_CP1_CI_AS null,
    [Price unit] float null,
    [Product hierarchy] nvarchar(255) collate SQL_Latin1_General_CP1_CI_AS null,
    [Product hierarchy level 1] nvarchar(255) collate SQL_Latin1_General_CP1_CI_AS null,
)
go

if exists (select * from sys.objects where object_id = object_id('[dbo].[vMEMaster]') and type = 'V')
drop view [dbo].[vMEMaster]
go

CREATE VIEW dbo.vMEMaster
AS
SELECT        FileName AS DocumentNumber, FilePathwoRoot AS [View], UpFolder AS Family
FROM            dbo.mmdata
WHERE        (WhatType = 'file') AND (FileName LIKE '%[pP][dD][fF]')
go

if exists (select * from sys.objects where object_id = object_id('[dbo].[vMEMM]') and type = 'V')
drop view [dbo].[vMEMM]
go

CREATE VIEW dbo.vMEMM
AS
SELECT        FilePath, dbo.fnGetFileName(FilePath) AS FullFile, dbo.fnGetFileNamewExt(FilePath) AS FilewExt, dbo.fnGetExtensionFile(FilePath) AS Ext, LoadDate
FROM            dbo.MEMM
go

if exists (select * from sys.objects where object_id = object_id('[dbo].[vVNEmpData]') and type = 'V')
drop view [dbo].[vVNEmpData]
go

CREATE VIEW dbo.vVNEmpData
AS
SELECT        EmpID, EmpName, Department, WHPerWeek, Indirect, LoadDate
FROM            VNMACSRPT2.PMS.dbo.VNEmpData AS VNEmpData_1
go

if exists (select * from sys.objects where object_id = object_id('[dbo].[fnASCIIstring]') and type = 'FN')
drop function [dbo].[fnASCIIstring]
go

/* =============================================
select dbo.fnASCIIstring('ahihi')
 =============================================*/
CREATE FUNCTION fnASCIIstring
(
	@YourString varchar(500)='Hello World!'
)
RETURNS varchar(500)
AS
BEGIN
	--DECLARE @YourString   varchar(500)

--SELECT @YourString='Hello World!'

;WITH AllNumbers AS
(
    SELECT 1 AS Number
    UNION ALL
    SELECT Number+1
        FROM AllNumbers
        WHERE Number<LEN(@YourString)
)
SELECT @YourString =
       (SELECT
            ASCII(SUBSTRING(@YourString,Number,1))
            FROM AllNumbers
            ORDER BY Number
            FOR XML PATH(''), TYPE
       ).value('.','varchar(max)') --AS NewValue
       OPTION (MAXRECURSION 500) --<<needed if you have a string longer than 100

	

	  /* ;WITH AllNumbers1 AS
(
    SELECT 1 AS Number
    UNION ALL
    SELECT Number+1
        FROM AllNumbers
        WHERE Number<LEN(@YourString)
)
select  SUBSTRING(@YourString,Number,1),ASCII(SUBSTRING(@YourString,Number,1)),* FROM AllNumbers1*/


return @YourString;
END
go

if exists (select * from sys.objects where object_id = object_id('[dbo].[fnFilewoRoot]') and type = 'FN')
drop function [dbo].[fnFilewoRoot]
go

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION fnFilewoRoot
(
	-- Add the parameters for the function here
	@str nvarchar(max), @root nvarchar(max)
)
RETURNS nvarchar(max)
AS
BEGIN
	

	-- Return the result of the function
	RETURN reverse(left(reverse(@str),len(@root)-4))

END
go

if exists (select * from sys.objects where object_id = object_id('[dbo].[fnGetExtensionFile]') and type = 'FN')
drop function [dbo].[fnGetExtensionFile]
go

CREATE FUNCTION fnGetExtensionFile
(
    @str nvarchar(260)
)
RETURNS nvarchar(260)
AS
BEGIN
--declare @str varchar(20)='MyDoc.doc';
select @str= reverse(left(reverse(@str),charindex('.',reverse(@str))-1))
return @str;
end
go

if exists (select * from sys.objects where object_id = object_id('[dbo].[fnGetFileName]') and type = 'FN')
drop function [dbo].[fnGetFileName]
go

  CREATE FUNCTION fnGetFileName
(
    @fullpath nvarchar(260)
) 
RETURNS nvarchar(260)
AS
BEGIN
    IF(CHARINDEX('\', @fullpath) > 0)
       SELECT @fullpath = RIGHT(@fullpath, CHARINDEX('\', REVERSE(@fullpath)) -1)
	   
	  declare @ext varchar(20)--='MyDoc.doc';
select @ext= reverse(left(reverse(@fullpath),charindex('.',reverse(@fullpath))-1))
		
		select @fullpath = left(@fullpath, CHARINDEX('.', (@fullpath)) -1)
       RETURN @fullpath
END
go

if exists (select * from sys.objects where object_id = object_id('[dbo].[fnGetFileNamewExt]') and type = 'FN')
drop function [dbo].[fnGetFileNamewExt]
go

 CREATE FUNCTION fnGetFileNamewExt
(
    @fullpath nvarchar(260)
) 
RETURNS nvarchar(260)
AS
BEGIN
    IF(CHARINDEX('\', @fullpath) > 0)
       SELECT @fullpath = RIGHT(@fullpath, CHARINDEX('\', REVERSE(@fullpath)) -1)
	   
	
       RETURN @fullpath
END
go

if exists (select * from sys.objects where object_id = object_id('[dbo].[fnGetUpFolder]') and type = 'FN')
drop function [dbo].[fnGetUpFolder]
go

CREATE FUNCTION [dbo].[fnGetUpFolder]
(
    @str nvarchar(260)
)
RETURNS nvarchar(260)
AS
BEGIN
--declare @str varchar(20)='MyDoc.doc';
--select @str= reverse(left(reverse(@str),charindex('\',reverse(@str))-1))

declare @a varchar(200), @b varchar(200), @c varchar(200)
set @a = @str
set @b = right(@a, charindex('\', reverse(@a)) - 1)
set @c = replace(@a, '\' + @b, '')
select  @str = right(@c, charindex('\', reverse(@c)) - 1)
-- @b as filename

return @str;
end


/*
select dbo.[fnGetUpFolder]('c:\fsdasáa\123.doc')
*/
go

if exists (select * from sys.objects where object_id = object_id('[dbo].[vMEMaster]') and type = 'V')
drop view [dbo].[vMEMaster]
go

CREATE VIEW dbo.vMEMaster
AS
SELECT        FileName AS DocumentNumber, FilePathwoRoot AS [View], UpFolder AS Family
FROM            dbo.mmdata
WHERE        (WhatType = 'file') AND (FileName LIKE '%[pP][dD][fF]')
go

if exists (select * from sys.objects where object_id = object_id('[dbo].[vMEMM]') and type = 'V')
drop view [dbo].[vMEMM]
go

CREATE VIEW dbo.vMEMM
AS
SELECT        FilePath, dbo.fnGetFileName(FilePath) AS FullFile, dbo.fnGetFileNamewExt(FilePath) AS FilewExt, dbo.fnGetExtensionFile(FilePath) AS Ext, LoadDate
FROM            dbo.MEMM
go

if exists (select * from sys.objects where object_id = object_id('[dbo].[vVNEmpData]') and type = 'V')
drop view [dbo].[vVNEmpData]
go

CREATE VIEW dbo.vVNEmpData
AS
SELECT        EmpID, EmpName, Department, WHPerWeek, Indirect, LoadDate
FROM            VNMACSRPT2.PMS.dbo.VNEmpData AS VNEmpData_1
go

if exists (select * from sys.objects where object_id = object_id('[dbo].[ame_setfilltergroup]') and type = 'P')
drop procedure [dbo].[ame_setfilltergroup]
go

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ame_setfilltergroup] 
	@Part nchar(25),
	@Name nchar(100)
AS
BEGIN
	

--SET @Part ='852000590' 
--SET @Name='SAFETY RECOMMENDATIONS ADDENDUM'

declare @NameBAK    nchar(100)  
SET    @NameBAK= rtrim(@Name)
SET @name =@NameBAK

declare @T table(Class varchar(50))
DECLARE @searh varchar(30)


while len(@NameBAK) > 0
BEGIN
  insert into @T values(left(@NameBAK, charindex(' ', @NameBAK+' ')-1))
  set @NameBAK = stuff(@NameBAK, 1, charindex(' ', @NameBAK+' '), '')
end

while len(@Name) > 0
BEGIN
  insert into @T values(left(@Name, charindex(',', @Name+',')-1))
  set @Name = stuff(@Name, 1, charindex(',', @Name+','), '')
END




SELECT *    FROM @T 

DECLARE @test nchar(30)
set @test= left(rtrim(@part), charindex(',', rtrim(@part)+',')-2)+'%'
SELECT @test

select YT.Partnumber, YT.Eng, YT.Vn
from TranslationList as YT
where 
Partnumber LIKE  left(rtrim(@part), charindex(',', rtrim(@part)+',')-2)+'%'
 AND
 exists (
               select *
               from @T as T
               where ','+YT.Eng+',' like '%,'+rtrim(T.Class)+',%'
			   
             )
ORDER BY YT.Partnumber
END


/* 
exec [ame_setfilltergroup] '199484401', 'BRACKET,BACK,RIGGS'

select *
from TranslationList as YT
where 
 yt.Partnumber LIKE  (left('19948420', charindex(',', '19948420'+',')-1))+'%'

*/
go

if exists (select * from sys.objects where object_id = object_id('[dbo].[amevn_getAllFileData]') and type = 'P')
drop procedure [dbo].[amevn_getAllFileData]
go

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE amevn_getAllFileData
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
--parameter
declare @myPath nvarchar(4000) =  '\\vnmsrv300\Grpfiles\Document Control\Current Method sheet';

IF OBJECT_ID('tempdb..#DirectoryTree') IS NOT NULL
DROP TABLE #DirectoryTree;

CREATE TABLE #DirectoryTree (
   id int IDENTITY(1,1)
   ,subdirectory nvarchar(512)
   ,depth int
   ,isfile bit
   , ParentDirectory int
   ,flag tinyint default(0));

-- top level directory
INSERT #DirectoryTree (subdirectory,depth,isfile)
   VALUES (@myPath,0,0);
-- all the rest under top level
INSERT #DirectoryTree (subdirectory,depth,isfile)
   EXEC master.sys.xp_dirtree @myPath,0,1;


UPDATE #DirectoryTree
   SET ParentDirectory = (
      SELECT MAX(Id) FROM #DirectoryTree
      WHERE Depth = d.Depth - 1 AND Id < d.Id   )
FROM #DirectoryTree d;

-- SEE all with full paths
WITH dirs AS (
    SELECT
       Id,subdirectory,depth,isfile,ParentDirectory,flag
       , CAST (null AS NVARCHAR(MAX)) AS container
       , CAST([subdirectory] AS NVARCHAR(MAX)) AS dpath
       FROM #DirectoryTree
       WHERE ParentDirectory IS NULL 
    UNION ALL
    SELECT
       d.Id,d.subdirectory,d.depth,d.isfile,d.ParentDirectory,d.flag
       , dpath as container
       , dpath +'\'+d.[subdirectory]  
    FROM #DirectoryTree AS d
    INNER JOIN dirs ON  d.ParentDirectory = dirs.id
)
SELECT * FROM dirs 
-- Dir style ordering
ORDER BY container, isfile, subdirectory
END
go

if exists (select * from sys.objects where object_id = object_id('[dbo].[amevn_scanAllFileQuickly]') and type = 'P')
drop procedure [dbo].[amevn_scanAllFileQuickly]
go


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
--  [amevn_scanAllFileQuickly] '"\\vnmsrv300\Grpfiles\Document Control"',1
-- =============================================
CREATE PROCEDURE [dbo].[amevn_scanAllFileQuickly] @path NVARCHAR(260) = '"\\vnmsrv300\Grpfiles\Document Control"' --\Current Method sheet"'
	--@path nvarchar(260) = '"\\vnmsrv300\Grpfiles\Document Control\Instruction"'
	--
	,@force INT = 1
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	-- SELECT * FROM ##loaddate
	SET NOCOUNT ON;

	IF OBJECT_ID('tempdb..##loaddate') IS NOT NULL
		drop TABLE ##loaddate

		SELECT getdate() LoadDate
		INTO ##loaddate

		PRINT 'new data'

		IF OBJECT_ID('tempdb..#MyHead') IS NOT NULL
			/*Then it exists*/
			DROP TABLE #MyHead

		CREATE TABLE #MyHead (
			FullPath NVARCHAR(1000)
			,Directory AS SUBSTRING(FullPath, 1, LEN(FullPath) - CHARINDEX('\', REVERSE(FullPath)) + 1) PERSISTED
			,[FileName] AS RIGHT(FullPath, CHARINDEX('\', REVERSE(FullPath)) - 1) PERSISTED
			);

		DECLARE @cmd VARCHAR(250) = 'DIR ' + @path + ' /s /b';

		INSERT INTO #MyHead
		EXEC xp_CmdShell @cmd;

		--select *, dbo.fnASCIIstring([FileName]) CODEFILE from #MyHead
		-- '2017-08-24 08:14:07.990' get file datetime
		--set @PathName = @path
		IF OBJECT_ID('tempdb..#CommandShell') IS NOT NULL
			DROP TABLE #CommandShell

		CREATE TABLE #CommandShell (Line VARCHAR(512))

		--SET @CMD = 'DIR ' + @PathName + ' /TC' --file +date
		--test
		--SET @PathName ='"F:\1. Documentation\2017 Decision ME\"'
		--SET @PathName ='"D:\3. Software"'
		SET @CMD = 'DIR ' + @path + ' /s' -- tìm t?t c? các file

		PRINT @CMD -- test & debug
			-- DIR F:\data\download\microsoft /TC

		-- MSSQL insert exec - insert table from stored procedure execution
		INSERT INTO #CommandShell
		EXEC MASTER..xp_cmdshell @CMD

		--select * from #CommandShell
		-- Delete lines not containing filename
		DELETE
		FROM #CommandShell
		WHERE Line NOT LIKE '[0-9][0-9]/[0-9][0-9]/[0-9][0-9][0-9][0-9] %'
			OR Line LIKE '%<DIR>%'
			OR Line IS NULL

		IF OBJECT_ID('tempdb..#filedatesize') IS NOT NULL
			/*Then it exists*/
			DROP TABLE #filedatesize

		SELECT Rtrim(LTRIM(substring(Line, 39, Len(Line)))) AS fileNames
			--,  Line File_details 
			,CAST(LEFT(Line, 20) AS DATETIME) AS fileDate
			,Rtrim(LTRIM(substring(Line, 21, 18))) AS fileSizes
		INTO #filedatesize
		FROM #CommandShell
		ORDER BY fileDate DESC

		--select *, dbo.fnASCIIstring(fileNames) CODESIZE from #filedatesize
		IF OBJECT_ID('mmdata') IS NOT NULL
			/*Then it exists*/
			DROP TABLE mmdata;

		WITH prepmmdata
		AS (
			SELECT *
				,dbo.[fnGetUpFolder](FullPath) UpFolder
				,REPLACE(FullPath, REPLACE(@path, '"', ''), '') FilePathwoRoot
				,WhatType = CASE 
					WHEN #filedatesize.fileNames IS NULL
						THEN 'Folder'
					ELSE 'File'
					END
			FROM #myhead
			LEFT JOIN #filedatesize ON rtrim(#myhead.[FileName]) = rtrim(#filedatesize.fileNames)
			)
		SELECT *
		INTO mmdata
		FROM prepmmdata

	
		SELECT [FileName] DocumentNumber
			,FilePathwoRoot [View]/*, FullPath*/
			,UpFolder Family
			,fileDate ModifiedDate
			,fileSizes Size
		FROM mmdata
		WHERE whattype = 'file'
	END
	/*ELSE
	BEGIN
		DECLARE @info NVARCHAR(30);

		SELECT @info = LoadDate
		FROM ##loaddate

		PRINT 'reusing data' + @info;

		SELECT [FileName] DocumentNumber
			,FilePathwoRoot [View]/*, FullPath*/
			,UpFolder Family
			,fileDate ModifiedDate
			,fileSizes Size
		FROM mmdata
		WHERE whattype = 'file'

		RETURN
	END*/
go

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
go

