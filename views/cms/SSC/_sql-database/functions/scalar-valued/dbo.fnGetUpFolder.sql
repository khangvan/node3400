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