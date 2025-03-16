function filterUsers(users: User[]): User[] {
  const viewerRole = localStorage.getItem('userRole');

  const allowedUsers = users.filter((user) => {
    if (viewerRole === 'admin') {
      return true;
    }

    return user.role === 'user';
  });

  return allowedUsers;
}

const displayUser = (user: User) => {
  if (user.role === 'admin') {
    `<li>'(Admin)' Name: ${user.name}, Age: ${user.age}</li>`;
  }

  return `<li>Name: ${user.name}, Age: ${user.age}</li>`;
};

export function renderItems(container: HTMLElement, users: User[]): void {
  const allowedUsers = filterUsers(users);

  container.innerHTML = `
    <ul>
      ${allowedUsers.map(displayUser).join('')}
    </ul>
  `;
}
