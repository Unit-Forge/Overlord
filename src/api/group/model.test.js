import { Group } from '.'

let group

beforeEach(async () => {
  group = await Group.create({ name: 'test', description: 'test', image: 'test', leader: 'test', assignments: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = group.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(group.id)
    expect(view.name).toBe(group.name)
    expect(view.description).toBe(group.description)
    expect(view.image).toBe(group.image)
    expect(view.leader).toBe(group.leader)
    expect(view.assignments).toBe(group.assignments)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = group.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(group.id)
    expect(view.name).toBe(group.name)
    expect(view.description).toBe(group.description)
    expect(view.image).toBe(group.image)
    expect(view.leader).toBe(group.leader)
    expect(view.assignments).toBe(group.assignments)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
