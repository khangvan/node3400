if not exists (select * from sys.objects where object_id = object_id('[dbo].[mmdata]') and type = 'U')
create table [dbo].[mmdata]
(
    [Directory] nvarchar(1000) collate SQL_Latin1_General_CP1_CI_AS null,
    [fileDate] datetime null,
    [FileName] nvarchar(1000) collate SQL_Latin1_General_CP1_CI_AS null,
    [fileNames] varchar(512) collate SQL_Latin1_General_CP1_CI_AS null,
    [FilePathwoRoot] nvarchar(4000) collate SQL_Latin1_General_CP1_CI_AS null,
    [fileSizes] varchar(18) collate SQL_Latin1_General_CP1_CI_AS null,
    [FullPath] nvarchar(1000) collate SQL_Latin1_General_CP1_CI_AS null,
    [UpFolder] nvarchar(260) collate SQL_Latin1_General_CP1_CI_AS null,
    [WhatType] varchar(6) collate SQL_Latin1_General_CP1_CI_AS not null,
)