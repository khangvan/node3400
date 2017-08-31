if not exists (select * from sys.objects where object_id = object_id('[dbo].[MEMM]') and type = 'U')
create table [dbo].[MEMM]
(
    [FilePath] nvarchar(max) collate SQL_Latin1_General_CP1_CI_AS null,
    [LoadDate] nvarchar(max) collate SQL_Latin1_General_CP1_CI_AS null,
)