export function connectRealtime(onMessage){
  // Replace with ws://<host>/ws/realtime
  const dummy = { close(){}, send(){} };
  // No live simulation per your request; wire this to backend later.
  return dummy;
}
