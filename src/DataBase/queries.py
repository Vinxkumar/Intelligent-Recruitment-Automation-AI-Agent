create_table_drive = """
create table if not exists drive (

    id int auto_increment primary key,
    drive_name varchar2(25) not null,
    drive_status boolean not null default true,
    created_at = timestamp default current_timestamp
)
"""

insert_into_drive = """
    insert into drive (drive_name, drive_status) values (%s, %s)
"""

alter_table_drive_status = """
alter table drive 
"""

create_table_recruitment = """
create table if not exists {table_name} (
    id varchar(6) primary key,
    name varchar(15) not null,
    email varchar(25) not null unique,
    resume_link varchar(2048) not null
)
"""

insert_into_recruitment = """
insert into {table_name} (id, name, email, resume_link) values (%s, %s, %s, %s)
"""