if not exists (select * from sys.objects where object_id = object_id('[dbo].[MMYield]') and type = 'U')
create table [dbo].[MMYield]
(
    [Fam# Grp# Descr#] nvarchar(255) collate SQL_Latin1_General_CP1_CI_AS null,
    [Mat# Price] float null,
    [Material] nvarchar(255) collate SQL_Latin1_General_CP1_CI_AS null,
    [Material description] nvarchar(255) collate SQL_Latin1_General_CP1_CI_AS null,
    [Price unit] float null,
    [Product hierarchy] nvarchar(255) collate SQL_Latin1_General_CP1_CI_AS null,
    [Product hierarchy level 1] nvarchar(255) collate SQL_Latin1_General_CP1_CI_AS null,
)