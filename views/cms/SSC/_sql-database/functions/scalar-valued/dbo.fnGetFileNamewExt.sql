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