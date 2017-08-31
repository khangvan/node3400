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