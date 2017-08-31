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