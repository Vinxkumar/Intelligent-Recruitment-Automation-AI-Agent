

#? Query to create user table, insert user, and select user by username
create_table_user = """
create table if not exists user (
    id int auto_increment primary key,
    name varchar(15) not null,
    username varchar(25) not null unique,
    password varchar(255) not null
);
"""
insert_into_user = """
insert into user (name, username, password) values (%s, %s, %s);
"""
select_table_user = """
select * from user where username = %s;
"""


#? Query to create, insert, update, delete, and select drive details
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
update drive set drive_status = %s where drive_name = %s;
"""
delete_drive = """
delete from drive where drive_name = {drive_name};
"""
select_drive = """
select * from drive order by created_at DESC limit 7;
"""


#? Query to create, insert, update, delete, and select recruitment details 
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