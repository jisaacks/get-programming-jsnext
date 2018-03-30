function* yieldAll(...values) {
  for (const val of values) {
    yield val
  }
}
