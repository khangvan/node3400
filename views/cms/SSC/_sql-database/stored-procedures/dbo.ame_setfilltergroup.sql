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