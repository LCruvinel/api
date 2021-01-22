use users;
create table userbooks (userid int, bookid int);
alter table users.userbooks add foreign key B_book_id(bookid) references library.books(id);
alter table users.userbooks add primary key(userid,bookid);