if not exists (select * from sys.objects where object_id = object_id('[dbo].[MasterBOX]') and type = 'U')
create table [dbo].[MasterBOX]
(
    [Description] nvarchar(255) collate SQL_Latin1_General_CP1_CI_AS null,
    [H] float null,
    [L] float null,
    [Material] nvarchar(255) collate SQL_Latin1_General_CP1_CI_AS null,
    [W] float null,
)