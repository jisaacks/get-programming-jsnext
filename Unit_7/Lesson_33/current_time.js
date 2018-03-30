// You can use zen-observable as a polyfil

const currentTime$ = new Observable(observer => {
  const interval = setInterval(() => {
    const currentTime = new Date();
    observer.next(currentTime);
  }, 1000);

  return () => clearInterval(interval);
});

const currentTimeSubscription = currentTime$.subscribe({
  next(currentTime) {
    // show current time
  }
});

currentTime$.map(data => `${date.getHours()}:${date.getMinutes()}`).distinct();

// currentTimeSubscription.unsubscribe();
