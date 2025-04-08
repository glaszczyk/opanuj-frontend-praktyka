import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import { expect, test, vi } from 'vitest'
import FriendList from '@/components/FriendList.vue'

test('list should display all provided friends', () => {
  const wrapper = render(FriendList, {
    props: { friends: [{ firstName: 'Bill', lastName: 'Gates', id: 1 }] },
  })

  const friendList = wrapper.queryAllByRole('listitem')
  const fistFriend = wrapper.getByText('Bill Gates')
  expect(friendList.length).toEqual(1)
  expect(fistFriend).toBeDefined()
  screen.debug(friendList)
})

test('list should be empty when friend removed', async () => {
  const wrapper = render(FriendList, {
    props: { friends: [{ firstName: 'Bill', lastName: 'Gates', id: 1 }] },
  })

  const friendList = wrapper.queryAllByRole('listitem')
  const fistFriend = wrapper.getByText('Bill Gates')
  expect(friendList.length).toEqual(1)
  expect(fistFriend).toBeDefined()

  const deleteButton = wrapper.getByText('x')
  await fireEvent.click(deleteButton)
  const updatedFriendList = wrapper.queryAllByRole('listitem')
  waitFor(() => expect(updatedFriendList.length).toEqual(0))

  screen.debug(friendList)
})
