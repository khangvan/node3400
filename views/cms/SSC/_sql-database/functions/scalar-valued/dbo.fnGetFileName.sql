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