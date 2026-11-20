import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildPayload,
  validateEmail,
  validateEmails,
  validateMemberCount,
  validateTeamName,
} from './validation.ts';

test('accepts valid emails', () => {
  for (const e of [
    'a@b.co',
    'john.doe@college.edu.in',
    'first_last+tag@gmail.com',
    '  MiXeD@Example.COM  ',
    'x-y@sub-domain.example.org',
  ]) {
    assert.equal(validateEmail(e), undefined, e);
  }
});

test('rejects junk emails', () => {
  for (const e of [
    '',
    '   ',
    'plainaddress',
    '@no-local.com',
    'no-at.com',
    'a@b',
    'a@b.c',
    'a@@b.com',
    'a b@c.com',
    '.a@b.com',
    'a.@b.com',
    'a..b@c.com',
    'a@-b.com',
    'a@b-.com',
    'a@b..com',
    'a@b.com.',
    'a@b.c0m',
    '<script>@x.com',
    'a@b.com<script>',
    'a@b\n.com',
    "a'@b.com; drop table",
    'ä@b.com',
    `${'a'.repeat(250)}@b.com`,
  ]) {
    assert.ok(validateEmail(e), `should reject: ${JSON.stringify(e)}`);
  }
});

test('team name', () => {
  assert.equal(validateTeamName('Team 42_x'), undefined);
  assert.ok(validateTeamName(''));
  assert.ok(validateTeamName('<script>'));
  assert.ok(validateTeamName('a'.repeat(51)));
});

test('member count is 3, 4 or 5 only', () => {
  for (const n of [3, 4, 5]) assert.equal(validateMemberCount(n), undefined);
  for (const n of [0, 1, 2, 6, 3.5, NaN]) assert.ok(validateMemberCount(n), String(n));
  assert.equal(validateMemberCount(2), 'Team must have 3, 4 or 5 members');
});

test('duplicate emails flagged case-insensitively', () => {
  const errs = validateEmails(['riya@x.com', 'aman@x.com', ' RIYA@x.com ']);
  assert.equal(errs[0], undefined);
  assert.equal(errs[1], undefined);
  assert.match(errs[2]!, /member 1/);
});

test('buildPayload normalizes and refuses invalid input', () => {
  assert.deepEqual(buildPayload('  Code  Ninjas ', [' Riya@X.com ', 'a@b.co', 'c@d.in']), {
    teamName: 'Code Ninjas',
    emails: ['riya@x.com', 'a@b.co', 'c@d.in'],
  });
  assert.throws(() => buildPayload('Team', ['a@b.co', 'nope', 'c@d.in']));
  assert.throws(() => buildPayload('Team', ['a@b.co', 'c@d.in'])); // too few
  assert.throws(() => buildPayload('Team', ['a@b.co', 'A@b.co', 'c@d.in'])); // duplicate
  assert.throws(() => buildPayload('', ['a@b.co', 'b@b.co', 'c@d.in'])); // no team name
});
