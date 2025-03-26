import AddFriend from '@/components/AddFriend.vue'
import { expect, test } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'

test('should emit data when add button pressed', async () => {
  const { emitted } = render(AddFriend)
  const firstName = screen.getByLabelText('First Name:')
  const lastName = screen.getByLabelText('Last Name:')
  const submit = screen.getByText('Add Friend')

  await fireEvent.update(firstName, 'John')
  await fireEvent.update(lastName, 'Doe')
  await fireEvent.click(submit)

  expect(emitted()['add-friend']).toBeTruthy()
  expect(emitted()['add-friend'][0]).toEqual([
    { firstName: 'John', lastName: 'Doe', id: expect.any(Number) },
  ])
})
