create_table_drive = """
create table if not exists drive (

    id int auto_increment primary key,
    drive_name VARCHAR(25) NOT NULL,
    drive_status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"""

insert_into_drive = """
    insert into drive (drive_name, drive_status) values (%s, %s);
"""

update_table_drive_status = """
update drive set drive_status = {drive_status} where drive_name = {drive_name};
"""

delete_drive = """
delete from drive where drive_name = {drive_name};
"""
select_drive = """
select * from drive;
"""

create_table_recruitment = """
create table if not exists {table_name} (
    id varchar(6) primary key,
    name varchar(15) not null,
    email varchar(25) not null unique,
    resume_link varchar(2048) not null
);
"""



insert_into_recruitment = """
insert into {table_name} (id, name, email, resume_link) values (%s, %s, %s, %s);
"""