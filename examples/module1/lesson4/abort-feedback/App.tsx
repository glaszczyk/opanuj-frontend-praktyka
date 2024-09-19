import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

const API_URL = '/api/data/users?timeout=10000';

const App = () => {
  const [controller, setController] = useState<AbortController | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const fetchUsersData = (signal: AbortSignal) => {
    fetch(API_URL, { signal })
      .then((res) => res.json())
      .then(({ users }) => {
        setUsers(users);
        setIsButtonVisible(false);
      });
  };

  const withAbort = (fetchFn: Function) => {
    withDelay(5000, showButton);
    const newController = new AbortController();
    setController(newController);
    const signal = newController.signal;
    fetchFn(signal);
  }

  const withDelay = (ms: number, callback: Function) => setTimeout(() => callback()
    , ms);

  const showButton = () => setIsButtonVisible(true);

  const resetFetching = () => {
    console.log('reset fetching');
    if (controller) {
      setIsButtonVisible(false);
      controller.abort('Aborted by user');
      withAbort(fetchUsersData);
    }
  };

  useEffect(() => {
    withAbort(fetchUsersData);
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Users</h1>
        {isButtonVisible && <div className="flex flex-row items-center">
          <p className="mr-2">
            Sorry, there seems to be connectivity issues...
          </p>
          <button onClick={resetFetching}
                  className="text-blue-400 bg-blue-200 hover:text-blue-200 hover:bg-blue-400 rounded-md p-4">
            Try again
          </button>
        </div>}
      </div>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li
            className="bg-white p-4 rounded-md border border-gray-100"
            key={index}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
