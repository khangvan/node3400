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