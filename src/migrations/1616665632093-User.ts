import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1616665632093 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (1, 'charesnape0', 'cboden0@usnews.com', 'Zw4IWV', '2019-12-20T12:08:55Z', '2020-08-01T00:36:02Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (2, 'dtiddy1', 'midell1@tinyurl.com', 'pn9gZl', '2019-11-11T12:11:07Z', '2019-08-25T01:00:29Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (3, 'ndeeny2', 'bivanilov2@imageshack.us', 'cAV8luCYKn', '2019-04-12T22:51:26Z', '2020-12-12T07:53:06Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (4, 'smacgray3', 'grendell3@nps.gov', 'M39irgJbSr69', '2020-04-16T20:58:14Z', '2020-08-06T21:54:15Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (5, 'adosedale4', 'dcrippen4@xrea.com', 'qWTfrIWPFLM', '2019-09-04T09:14:18Z', '2019-09-24T09:50:51Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (6, 'iochiltree5', 'pcasone5@list-manage.com', 'SQuCF7uJbJDs', '2019-09-14T00:57:45Z', '2021-03-09T18:38:41Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (7, 'nkleinstern6', 'sdegoey6@sina.com.cn', 'b3kgh54s', '2020-12-02T18:23:04Z', '2019-09-05T05:35:28Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (8, 'ebennett7', 'cstiegars7@elpais.com', '1kVJnd', '2019-07-12T00:08:51Z', '2019-07-23T21:56:47Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (9, 'llathe8', 'tdiviney8@stumbleupon.com', '8k9ZqK2', '2019-04-27T02:03:01Z', '2019-12-15T18:31:13Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (10, 'mphilliskirk9', 'psimenet9@gizmodo.com', 'Yly7ErenpOa', '2019-12-24T05:39:40Z', '2020-10-05T10:46:50Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (11, 'kdeloucha', 'jbelliarda@si.edu', 'fkSYIG', '2019-07-22T04:50:14Z', '2020-09-24T14:36:34Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (12, 'mwalkingshawb', 'ihudsonb@parallels.com', 'h4GSACnrQb', '2019-11-21T18:08:53Z', '2019-05-30T23:50:30Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (13, 'lchallacec', 'rfitzgeraldc@ameblo.jp', 'W3BUCGJYM8', '2020-01-11T22:07:21Z', '2020-12-02T04:20:05Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (14, 'lgibbingsd', 'roxerd@tinyurl.com', 'gFwaXr', '2020-03-28T00:30:16Z', '2020-06-12T02:52:28Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (15, 'ccliffte', 'gfolbige@army.mil', 'jDYI7SMsL2Hg', '2019-10-14T09:37:05Z', '2019-11-15T04:59:27Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (16, 'irawlingsf', 'cbombf@unesco.org', 'eyxmnqrhITca', '2019-12-10T20:28:46Z', '2020-01-19T03:14:50Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (17, 'ffellinig', 'mpothergillg@canalblog.com', 'YzGiR9rnw7', '2020-11-10T11:47:54Z', '2020-05-18T01:08:49Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (18, 'bvenardh', 'lboatrighth@instagram.com', 'eToI2DxM', '2019-07-11T08:55:49Z', '2020-12-20T07:07:29Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (19, 'eglassi', 'fcorrisi@homestead.com', 'ChxleTct', '2020-03-21T22:54:04Z', '2019-05-23T07:21:43Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (20, 'kgrebertj', 'bfolkj@huffingtonpost.com', 'Ny2fWY8VTP', '2020-01-26T14:38:56Z', '2020-03-04T01:27:03Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (21, 'jaronk', 'ajudenk@myspace.com', 'mE24HzJemZm1', '2021-02-17T05:17:53Z', '2020-04-25T16:26:31Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (22, 'adodsl', 'ddewittl@walmart.com', '0aTQ3TyE7QVF', '2021-01-16T14:29:43Z', '2019-05-18T20:18:57Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (23, 'nrosettim', 'aemansonm@cnn.com', 'rps3Wesg86', '2020-04-04T00:43:51Z', '2019-12-19T12:13:48Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (24, 'vgowmann', 'gbrickdalen@slashdot.org', 'vo59J2C', '2019-10-19T03:26:59Z', '2019-07-27T09:31:10Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (25, 'dbealso', 'gsconceo@thetimes.co.uk', 'aEBekVSnsLYH', '2020-10-03T12:58:54Z', '2019-04-30T23:36:41Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (26, 'qharrowp', 'robradainp@php.net', 't9QIwtdmGF', '2020-05-18T11:50:17Z', '2021-01-11T20:17:59Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (27, 'lwhitelawq', 'khaliburtonq@wordpress.org', 'vW2emZVbncg', '2019-11-30T22:15:23Z', '2019-11-23T17:33:02Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (28, 'akenwinr', 'arobjohnsr@sourceforge.net', 'nI5sO4Io4y', '2020-10-05T17:11:22Z', '2020-06-16T15:29:38Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (29, 'spollacks', 'twhellanss@people.com.cn', 'SNaabvmzKyN', '2020-08-16T09:16:40Z', '2020-09-22T19:03:56Z');
		insert into "user" (id, username, email, password, "createdAt", "updatedAt") values (30, 'bnisbitht', 'ybroinlicht@cornell.edu', 'hlUxHLA', '2020-02-08T10:05:19Z', '2019-08-24T21:59:43Z');
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
