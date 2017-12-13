let SweetData = require('../lib');
let should = require('should');

describe('sqlmin', () => {

  it('should exist', () => {
    should.exist(SweetData.sqlmin);
  });

  it('should minify sql', () => {
    const expected = "select ca.proj_id as proj_id, ca.ca_name as proj_name, ca.ca_date_start as proj_start, ca.ca_date_end AS proj_end,(select COUNT(*) from rotations r where r.proj_id = proj_id and r.r_status = 'R' group by r.proj_id) r_count, (select count(*) from rotations r where r.proj_id = proj_id and r.channel_id = 24) r_rtb_count from projs ca, clients c, proj_auth caa where ca.client_id = 12345 and ca.client_id = c.client_id and ca_type = 'zzz' and c.agency_id = 0 and ca.client_id = NVL( caa.client_id, ca.client_id) and proj_id = NVL( caa.proj_id, proj_id) and caa.contact_id = 7890";

    const text = "select ca.proj_id as proj_id, ca.ca_name as proj_name, ca.ca_date_start as proj_start, ca.ca_date_end AS proj_end,\n(select COUNT(*)  from rotations r \nwhere r.proj_id = proj_id and r.r_status = 'R' \ngroup by r.proj_id) r_count, \n(select count(*) from rotations r \nwhere r.proj_id = proj_id and r.channel_id = 24) r_rtb_count \nfrom projs ca, clients c, proj_auth caa \nwhere ca.client_id = 12345 and ca.client_id = c.client_id and ca_type = 'zzz' \nand c.agency_id = 0 and ca.client_id = NVL( caa.client_id, ca.client_id) \nand proj_id = NVL( caa.proj_id, proj_id) and caa.contact_id = 7890";

    const actual = SweetData.sqlmin(text);

    actual.should.equal(expected);
  });
});
