let SweetData = require('../lib');
let should = require('should');

describe('sql', () => {

  it('should exist', () => {
    should.exist(SweetData.sql);
  });

  it('should format sql', () => {
    const expected = "SELECT ca.proj_id AS proj_id,\n   ca.ca_name AS proj_name,\n   ca.ca_date_start AS proj_start,\n   ca.ca_date_end AS proj_end,\n   \n  (SELECT COUNT(*)\n  FROM rotations r\n  WHERE r.proj_id = proj_id\n    AND r.r_status = 'R'\n  GROUP BY  r.proj_id) r_count, \n  (SELECT count(*)\n  FROM rotations r\n  WHERE r.proj_id = proj_id\n    AND r.channel_id = 24) r_rtb_count\nFROM projs ca, clients c, proj_auth caa\nWHERE ca.client_id = 12345\n  AND ca.client_id = c.client_id\n  AND ca_type = 'zzz'\n  AND c.agency_id = 0\n  AND ca.client_id = NVL( caa.client_id, ca.client_id)\n  AND proj_id = NVL( caa.proj_id, proj_id)\n  AND caa.contact_id = 7890";

    const text = "select ca.proj_id as proj_id, ca.ca_name as proj_name, ca.ca_date_start as proj_start, ca.ca_date_end AS proj_end,\n(select COUNT(*)  from rotations r \nwhere r.proj_id = proj_id and r.r_status = 'R' \ngroup by r.proj_id) r_count, \n(select count(*) from rotations r \nwhere r.proj_id = proj_id and r.channel_id = 24) r_rtb_count \nfrom projs ca, clients c, proj_auth caa \nwhere ca.client_id = 12345 and ca.client_id = c.client_id and ca_type = 'zzz' \nand c.agency_id = 0 and ca.client_id = NVL( caa.client_id, ca.client_id) \nand proj_id = NVL( caa.proj_id, proj_id) and caa.contact_id = 7890";

    const actual = SweetData.sql(text);

    actual.should.equal(expected);
  });
});
