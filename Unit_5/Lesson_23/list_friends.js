function* listFriends(friends) {
  const [first, second, ...others] = friends
  if (first) yield first
  if (second) yield second
  if (others.length === 1) yield others[0]
  if (others.length > 1) yield `${others.length} others`
}

const friends = ['JD', 'Christina', 'Talan', 'Jonathan']

const friendsList = [ ...listFriends(friends) ]

const liked = `${sentenceJoin(friendsList)} liked this.`
