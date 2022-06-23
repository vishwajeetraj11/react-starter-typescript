/*
TYPE NARROWING
 in keyword */
function toNumber(val: number | string): number {
  if (typeof val === 'string') {
    return parseInt(val, 10);
  }
  return val;
}

/* in keyword*/

declare function getStandardSessionToken(name: string, ttl: number): string;
declare function getAdminSessionToken(
  name: string,
  accessLevel: string
): string;

type StandardUser = {
  name: string;
  sessionTTL: number;
};

type AdminUser = StandardUser & {
  isAdmin: true;
  access: 'read-admin' | 'write-admin';
};

function login(user: StandardUser | AdminUser) {
  // if(user.isAdmin) {
  /*
      This doesn't work in TS but in JS because user is union of StandardUser and AdminUser. 
      The only fields that those types have in common is what the share from StandardUser.
      and isAdmin doesn't exist in standard User.

      Instead this user does that ask typescript does this object has isAdmin in it.
       */
  // }
  if ('isAdmin' in user) {
    // Admin
    return getAdminSessionToken(user.name, user.access);
  } else {
    // Standard
    return getStandardSessionToken(user.name, user.sessionTTL);
  }

  /*
  This is a simple example of how we can use the in keyword to discriminate between parts of typescript union.
   */
}

// Type Predicates

/*
Its just a regular function but we can annotate its return type with a specific return type that informs the typescript compiler what type one of its arguments is.
*/

type User = StandardUser | AdminUser;

const users: User[] = [
  { name: 'jane', sessionTTL: 3 },
  { name: 'bob', sessionTTL: Infinity, isAdmin: true, access: 'read-admin' },
  { name: 'leah', sessionTTL: Infinity, isAdmin: true, access: 'write-admin' },
  { name: 'joe', sessionTTL: 5 },
];

// const standardUsers = users.filter(user => !('isAdmin' in user));

//    standardUsers: StandardUser[]
const standardUsers = users.filter((user): user is StandardUser => {
  /* 
  return type 
  user is StandardUser

  It implies

  - it will return boolean.
  - it tells the ts compiler that the user varuable here is a standard User.
  - instead of letting TS infer the types the way it usually happens we are actually telling this variable is of this type. [NEED TO BE CAREFUL WITH THAT.]

  */
  const filter = !('isAdmin' in user);
  if (filter) {
    // standard user
    // user
  } else {
    // admin user
    // user
  }
  return filter;
});

// Discriminated union

/*
It is a union type with a union type where each of the object within that union type have some field with a gaurantee different value. A value that would be unique to each one of the items in that union. 
*/

type StandardUser2 = {
  userType: 'standard';
  name: string;
  sessionTTL: number;
};

type AdminUser2 = {
  userType: 'admin';
  name: string;
  access: 'read-admin' | 'write-admin';
};

type User2 = StandardUser2 | AdminUser2;

function login2(user: User2) {
  switch (user.userType) {
    case 'standard':
      return getStandardSessionToken(user.name, user.sessionTTL);
    case 'admin':
      return getAdminSessionToken(user.name, user.access);
    // case "prospect":
    //     return null
    // default: will never reach here
    // user
  }
}
