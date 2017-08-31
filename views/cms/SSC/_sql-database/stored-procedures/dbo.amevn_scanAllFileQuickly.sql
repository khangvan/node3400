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