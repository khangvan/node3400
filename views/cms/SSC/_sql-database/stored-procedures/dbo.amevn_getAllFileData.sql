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