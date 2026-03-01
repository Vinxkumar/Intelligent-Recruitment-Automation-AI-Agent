

#? Query to create user table, insert user, and select user by username
create_table_user = """
create table if not exists user (
    id int auto_increment primary key,
    name varchar(15) not null,
    username varchar(25) not null unique,
    password varchar(25) not null
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
select * from drive order by created_at DESC;
"""
select_status = """
select drive_status from drive where drive_name = %s;
"""

#? Query to create, insert, update, delete, and select recruitment details 
create_table_recruitment = """
create table if not exists {table_name}_Candidates (
    id varchar(35) primary key,
    name varchar(25) not null,
    lname varchar(25) not null,
    phone varchar(15) not null unique,
    email varchar(25) not null unique,
    dob date not null,
    address varchar(255) not null,
    pincode int(6) not null,
    gender varchar(6) not null,
    resume_link varchar(2048) not null
);
"""
insert_into_recruitment = """
insert into {table_name}_Candidates (id, name, lname, phone, email, dob, address, pincode, gender, resume_link) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
"""

select_recruitment = """
    select id, name, lname, phone, email, resume_link from {table_name}_Candidates;
"""

check_Drive_status = """
select drive_status from drive where drive_name = %s;
"""